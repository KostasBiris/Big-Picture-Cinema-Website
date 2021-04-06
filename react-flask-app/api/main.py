from flask import Flask, render_template, request, redirect, jsonify,Markup, send_file
from db import Database
import socket
import time
from flask_cors import CORS, cross_origin
import os
import json
import stripe
from threading import Thread
import datetime
import base64
app = Flask(__name__)
CORS(app)

stripe.api_key = "sk_test_51ISQ7OC2YcxFx25Ty8LGkfEVQczFPRVHPyDqa6WJRtwNXNUST7GJbzEpWdWFWBZftAMgeM1U8LVfDrwb8R768K0800R2icalhU"

@app.route('/')
def mainpage():
    return render_template('customers_main_interface.html')

@app.route('/manage')
def managepage():
    return render_template('business_main_interface.html')

def serialize_screen(res):
    return {
        'id': res[0],
        'capacity': res[1],
        'seatmap' : res[2]
    }


def serialize_all_screens(res):
    dic = {}
    for i in range(len(res)):
        dic[i] = serialize_screen(res[i])
    return dic



def serialize_movie(res):

    return {
        'internalid': res[0],
        'original_title':res[1],
        'blurb':res[2],
        'certificate':res[3],
        'director':res[4],
        'leadactors':res[6],
        'release_date':res[7],
        'writers':res[5],
        'id' : res[8],
        'poster_path' : res[9],
        'runtime' : res[10],
        'youtube_key': res[11],
        'genres': res[12],
        'isupcoming' : isupcoming(res[0])
    }

def serialize_user(res):


    return {
        'id': res[0],
        'forename': res[1],
        'surname': res[2],
        'email': res[3],
        'phone': res[4],
        'dob' : res[6]
    }


def serialize_all_movies(res):

    dic = {}
    
    for i in range(len(res)):
        dic[i] =serialize_movie(res[i])
    return dic

def serialize_screening(res):

    return {
        'id':res[0],
        'date':res[1],
        'time':res[2],
        'screenid': res[3],
        'movieid': res[4],
        'seatmap':res[5].tolist()
    }

def serialize_all_screenings(res):
    dic = {}

    for i in range(len(res)):
        dic[i] = serialize_screening(res[i])
    print(dic)
    return dic


def serialize_ticket(res):
    try:
        return {
            'id' : res[0],
            'bookingid' : res[1],
            'movie_id' : res[2],
            'customer_id' : res[3],
            'price' : res[4],
            'forename': res[5],
            'surname': res[6],
            'email':res[7],
            'numVIP':res[9],
            'numChild':res[10],
            'numElder':res[11],
            'numDefault':res[12],
            'date' : res[13],
            'movieName' : Database('cinema.db').quick_get_movie(res[0])[1]
        }
    except TypeError:
        return None

def serialize_all_tickets(res):
    dic ={}
    for i in range(len(res)):
        if serialize_ticket(res[i]):
            dic[i] = serialize_ticket(res[i])
            print(dic[i])
    return dic



@app.route('/searchdates', methods = ['POST'])
def searchdates():
    date = request.json['data']
    db = Database('cinema.db') 
    movies, screenings = db.searchdates(date)
    print(movies)
    return jsonify({'screenings' : serialize_all_screenings(screenings), 'movies': serialize_all_movies(movies)})

@app.route('/allmovies', methods=['POST'])
def allmovies():
    db = Database('cinema.db')
    data = db.fetch()[0]
    return {'response': serialize_all_movies(data)}

@app.route('/tickets', methods=['POST'])
def tk():
    db = Database('cinema.db')
    data = db.fetch()[5]
    return {'response': serialize_all_tickets(data)}


@app.route('/makebooking', methods=['POST'])
def makebooking():
    db = Database('cinema.db')
    data = request.json['data']
    data = data['state']
    print(data)
    should_send_ticket = data['isEmployee']
    screening = data['screening']
    screeningid = screening['id']
    movieid = screening['movieid']
    seats = data['seatsSelected']
    screen = screening['screenid']
    date = screening['date']
    time = screening['time']

    seatstostore = ''
    for seat in seats:
        seatstostore += str(seat['row']) + str(seat['col']) + ','
    seatstostore = seatstostore[:-1]
    bookingid = db.add_booking(screeningid, 'NULL', seatstostore)
    firstname = data['firstname']
    lastname = data['lastname']
    email = data['email']
    movie = data['movie']
    orderPart = data['orderPart']
    prices = {'1': 7.5, '2': 5.5, '3': 6.5, '4': 10.0}
    total = 0
    for part in orderPart:
        total+=prices[part]
    qr = db.qr_code_generator(bookingid, screeningid)
    path = ""
    if not should_send_ticket:
        path = 'B' + str(bookingid) + 'M' + str(movieid) + 'S' + str(screeningid) + firstname[0] + lastname[0] + '.pdf'
        db.ticket_to_pdf(path, bookingid, firstname, lastname, movie, seatstostore, orderPart, screen, screeningid, total, qr, date, time)
        db.add_ticket(bookingid, movieid, total, firstname, lastname, email, path, qr, orderPart.count('4'), orderPart.count('2'), orderPart.count('3'), orderPart.count('1'))
        db.email_ticket(firstname, lastname, email, path)
    else:
        path = 'B' + str(bookingid) + 'M' + str(movieid) + 'S' + str(screeningid) + '.pdf'
        db.ticket_to_pdf(path, bookingid, "", "", movie, seatstostore, orderPart, screen, screeningid, total, qr, date, time)
        db.add_ticket(bookingid, movieid, total, "", "", email, path, qr, orderPart.count('4'), orderPart.count('2'), orderPart.count('3'), orderPart.count('1'))    
    
    

    if should_send_ticket:
        return send_file('../'+path, 'application/pdf', as_attachment=True, attachment_filename=path)
        #return jsonify({'response': 'OK'})
    else:
        return jsonify({'response': 'OK'})


@app.route('/getmoviename/<id>', methods=['POST'])
def getmoviename(id):
    db = Database('cinema.db')
    result = db.quick_get_movie(int(id))
    return jsonify({'response' : result[1]})

@app.route('/getticket/<email>', methods=['POST'])
def getticket(email):
    db = Database('cinema.db')
    print(db.get_customer_tickets_by_email(email))
    return jsonify({'response': serialize_all_tickets(db.get_customer_tickets_by_email(email))})

@app.route('/getpdf/<id>', methods=['POST'])
def getpdf(id):
    db = Database('cinema.db')
    ticket = db.quick_get_ticket(id)[0]
    return send_file('../'+ticket,'application/pdf', as_attachment=True, attachment_filename=ticket)





"""
@app.route('/movie/<name>', methods = ['POST'])
def view_movie(name):
    name = name.replace("_", " ")
    db = Database('cinema.db')
    movie = db.search_movies(name)
    if not movie: pass
    return serialize_all_movies(movie)
"""

@app.route('/movie/<name>/page', methods= ['POST'])
def _view_movie(name):
    name = name.replace("_", " ")
    name = name.lower()
    db = Database('cinema.db')
    movie = db.find_movie(name)
    if not movie: pass
    return serialize_movie(movie)

@app.route('/movie/search/', methods = ['POST'])
def list_movies():
    movie_name = request.json['data']
    
    added_movies = []
    db = Database('cinema.db')
    found_movies = []
    movies = serialize_all_movies(db.fetch()[0])
    print(movies)
    for movie in movies:
        for word in movie_name.split('_'):
            if word in movies[movie]['original_title'].lower():
                if not movies[movie]['original_title'] in added_movies:
                    found_movies.append(movies[movie])
                    added_movies.append(movies[movie]['original_title'])
    print("the found movies are {}".format(found_movies))
    return {'movies': found_movies}


@app.route('/caws')
def moviepage():
    return render_template('movie_template.html')


@app.route('/primelogin')
def managerlogin():
    return render_template('manager_login.html')

@app.route('/screen')
def screen():
    return render_template('screen.html')

@app.route('/adminbooking')
def booking():
    return render_template('employee_main_interface.html')

@app.route('/employee_checkout')
def employee_checkout():
    return render_template('employee_checkout.html')

@app.route('/employee_book_tickets')
def employee_book_tickets():
    return render_template('employee_book_tickets.html')

@app.route('/book-tickets')
def booktickets():
    return render_template('book_tickets.html')


@app.route('/primelogin', methods =['POST'])
def _managerlogin():
    db = Database('cinema.db')
    email = request.form['email']
    pwd = request.form['password']
    _id = request.form['identification']
    print(email, pwd, _id)
    del db
    return render_template('business_main_interface.html')

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

@app.route('/search')
def search():
    return render_template('search.html')


@app.route('/payment_info')
def payment_info():

    data = request['data']
    customerid = data['id']
    holder_name = data['name']
    postcode = data['postcode']
    card_number = data['card_number']
    expiration_date = data['expiration_date']

    db = Database('cinema.db')
    db.add_payment(str(datetime.today().strftime("%d-%m-%Y")), customerid, holder_name, postcode, card_number, expiration_date)
    return jsonify({'response':'OK'})



@app.route('/screens_description')
def screens_description():
    return render_template('screens_description.html')

@app.route('/register')
def customer_register():
    return render_template('customer_register.html')

@app.route('/login')
def customer_login():
    return render_template('customer_login.html')

@app.route('/', methods=['POST'])
def _mainpage():
    #For now, we just search the database based on the entry, and render html showing the results.
    #We need to dynamic html generation.
    db = Database('cinema.db')
    query = request.form['query']
    dat = str(db.search(query, 'movies'))
    del db
    return "<h1 style='color:blue'>" + dat + "</h1>"


@app.route('/insession/<ip>', methods=['POST'])
def insession(ip):
    db = Database('cinema.db')
    rq = db.ip_in_session(ip)
    #data = db.fetch_customer(rq[4])
    if not rq:
        del db
        return jsonify({'response': 'error'})
    try:

        data = db.fetch_customer(rq[4])

        return jsonify({'response':serialize_user(data)})

    except TypeError:
        return jsonify({'response': 'error'})



@app.route('/logout/<ip>', methods = ['POST'])
def logout(ip):
    db = Database('cinema.db')
    db.logout(ip)
    return jsonify({'response': 'OK'})


@app.route('/register', methods=['POST'])
def _register():

    data = request.json['data']
    db = Database('cinema.db')
    db.add_customer(data['forename'], data['surname'], data['email'],
    data['phonenumber'],  data['password'],
    data['dob'])
    del db
    return jsonify({'result': 'OK'})


@app.route('/booklogin')
def employeelogin():
    return render_template('employee_login.html')


@app.route('/login', methods = ['POST'])
def _login():
    db = Database('cinema.db')
    data = request.json['data']
    print(data)
    email = data['email']
    password = data['password']
    ip = data['IP']
    res, id_ = db.validate_customer(email, password)
    if res:
        db.add_session(ip, time.time(), 1, id_, 'NULL', 'NULL')
       # del db
        return jsonify({'response': 'OK'})
    del db
    return jsonify({'response' : 'BAD'})
    
@app.route('/manager_login',methods=['POST'])
def manager_login():
    db = Database('cinema.db')
    data = request.json['data']
    email = data['email']
    password = data['password']
    ip = data['IP']
    id = data['id']
    res, id_ = db.validate_manager(email, password,id)
    if res:
        db.add_session(ip, time.time(), 3, 'NULL', 'NULL', id_)
       # del db
        return jsonify({'response': 'OK'})
    del db
    return jsonify({'response' : 'BAD'})

@app.route('/employee_login',methods=['POST'])
def employee_login():
    db = Database('cinema.db')
    data = request.json['data']
    id = data['id']
    password = data['password']
    ip = data['IP']
    res, id_ = db.validate_employee(password,id)
    if res:
        db.add_session(ip, time.time(), 2, 'NULL', id_, 'NULL')
        return jsonify({'response': 'OK'})
    del db
    return jsonify({'response' : 'BAD'})

@app.route('/account')

def account():
    return render_template('account.html')

def calculate_order_amount(items):
    return 100

@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
            currency='gbp'
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403    

@app.route('/add', methods=['POST'])
def add():
    db = Database('cinema.db')
    data = request.json['data']
    title = data['title']
    blurb = data['blurb']
    certificate = data['certificate']
    director = data['directors']
    writers = data['writers']
    leadactors = data['actors']
    release = data['release_date']
    omdbid = data['omdbid']
    poster_path = data['poster_path']
    runtime = data['runtime']
    youtube_key = data['youtube_key']
    genres = data['genres']
    print(title, blurb, certificate, director, writers, leadactors, release, omdbid, poster_path, runtime, youtube_key, genres)

    db.add_movie(title, blurb, certificate, ' '.join(director), ' '.join(writers), ' '.join(leadactors[:len(leadactors)//10]), release, omdbid, poster_path,
    runtime, youtube_key, ' '.join(str(genres)))
    return jsonify({'response': 'OK'})


@app.route('/omdb/<id>', methods=['POST'])
def omdb(id):

    if Database('cinema.db').omdbid(id):
        print(Database('cinema.db').omdbid(id))
        return jsonify({'response': 'IN'})
    
    return jsonify({'response': 'NOT'})


@app.route('/addascreening', methods=['POST'])
def a_s():

    db = Database('cinema.db')
    data = request.json['data']
    date = data['date']
    time = data['time']
    screen_id = data['screen']
    movie_id = data['movie_id']

    print(date, time, screen_id, movie_id)
    db.add_screening(date,time,screen_id, movie_id)
    return jsonify({'response': 'OK'})

@app.route('/allscreenings', methods=['POST'])
def all_screenings():
    return jsonify({'response' : serialize_all_screenings(Database('cinema.db').fetch()[2])})

@app.route('/upcoming',methods=['POST'])
def upcoming():
    db = Database('cinema.db')
    movies, screenings = db.get_upcoming()
    return jsonify({'movies': serialize_all_movies(movies), 'screenings': serialize_all_screenings(screenings)})

def isupcoming(movieid):
    db = Database('cinema.db')
    movies = db.get_upcoming()[0]
    movie = db.quick_get_movie(movieid)
    # print(movies, movie)
    return movie in movies



@app.route('/get_screens', methods=['POST'])
def get_the_screens():

    db = Database('cinema.db')
    return jsonify({'screens' : serialize_all_screens(db.fetch()[1])})


@app.route('/gettickets/<id>')
def get_tickets(customer_id):
    db = Database('cinema.db')
    tickets = db.get_customer_tickets(customer_id)
    return jsonify({'response': serialize_all_tickets(tickets)})


def spinner():
    db = Database('cinema.db')
    print('hi!')
    while True:
        db.clear_sessions()
        #pass
if __name__ == '__main__':
    #thread = Thread(target=spinner, args=())
    #thread.daemon = True
    #thread.start()
    thread = Thread(target=spinner, args=())
    thread.daemon = True
    thread.start()
    app.run(debug=False, host='localhost', port='5000', threaded=True)
