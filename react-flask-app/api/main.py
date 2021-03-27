from flask import Flask, render_template, request, redirect, jsonify,Markup
from db import Database
import socket
import time
from flask_cors import CORS, cross_origin
import os
import json
import stripe
from threading import Thread
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
    return dic


def serialize_daily_analytics(res):

    return {
        'id':res[0],
        'movie_id':res[1],
        'movie_name':res[2],
        'date': res[3],
        'income': res[4],
        'num_tickets':res[5]
    }

def serialize_all_daily_analytics(res):
    dic = {}

    for i in range(len(res)):
        dic[i] = serialize_daily_analytics(res[i])
    return dic


def serialize_overall_analytics(res):

    return {
        'id':res[0],
        'movie_id':res[1],
        'movie_name':res[2],
        'income': res[3],
        'num_tickets':res[4]
    }

def serialize_all_overall_analytics(res):
    dic = {}

    for i in range(len(res)):
        dic[i] = serialize_overall_analytics(res[i])
    return dic




@app.route('/allmovies', methods=['POST'])
def allmovies():
    db = Database('cinema.db')
    data = db.fetch()[0]
    return {'response': serialize_all_movies(data)}


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
    print(name)
    movie = db.find_movie(name)
    print(movie)
    if not movie: pass
    return serialize_movie(movie)

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




#===============================================================================================================================
@app.route('/analytics')
def analytics():
    return render_template('manager_analytics.html')



cinemaLabels = [
    'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5',
    'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10',
    'Week 11', 'Week 12', 'Week 13', 'Week 14', 'Week 15',
]

cinemaValues = [
    1967.67, 1290.89, 879.75, 1349.19,
    2328.91, 2504.28, 2873.83, 4764.87,
    4349.29, 1258.30, 707, 1800, 1500,
    1577.5, 1247
]


# Adding the same values as overall movies for now to just have mock graphs for now. 
@app.route('/weekly_movie_analytics')
def weekly_movie_analytics():
    bar_labels=labels
    bar_values=values
    return render_template('weekly_movie_analytics.html', title='Best Performing Movies this week', max=17000, labels=bar_labels, values=bar_values)

@app.route('/weekly_cinema_analytics')
def weekly_cinema_analytics():
    bar_labels=cinemaLabels
    bar_values=cinemaValues
    return render_template('weekly_cinema_analytics.html', title='Weekly sales in the cinema', max=17000, labels=bar_labels, values=bar_values)



#===============================================================================================================================


labels = [
    'Captain America', 'Spiderman', 'Thor', 'Black Widow',
    'Iron Man', 'Hulk', 'Ant Man', 'Loki',
    'Hawkeye', 'Falcon', 'Wasp', 'Winter Soldier'
]

values = [
    967.67, 1190.89, 1079.75, 1349.19,
    2328.91, 2504.28, 2873.83, 4764.87,
    4349.29, 6458.30, 9907, 8000
]

colors = [
    "#F7464A", "#46BFBD", "#FDB45C", "#FEDCBA",
    "#ABCDEF", "#DDDDDD", "#ABCABC", "#4169E1",
    "#C71585", "#FF4500", "#FEDCBA", "#46BFBD"]

@app.route('/overall_analytics')
def overall_analytics():
    db = Database('cinema.db')
    data = db.fetch()[0]
    return {'overall_analytics': serialize_all_overall_analytics(data)}


'''   
@app.route('/overall_analytics')
def overall_analytics():
    return render_template('overall_analytics.html')
'''
#================================================================================================================================

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
    if not rq:
        del db
        return jsonify({'response': 'error'})
    data = db.fetch_customer(rq[4])
    return jsonify({'response':serialize_user(data)})


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
    email = data['email']
    password = data['password']
    ip = data['IP']
    print(email, password, ip)
    res, id_ = db.validate_customer(email, password)
    if res:
        db.add_session(ip, time.time(), 1, id_, 'NULL', 'NULL')
        del db
        return jsonify({'response': 'OK'})
    del db
    return jsonify({'response' : 'BAD'})
    
    

@app.route('/account')

def account():
    return "<h1> STUB ACCOUNT PAGE</h1>"

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


@app.route('/upcoming',methods=['POST'])
def upcoming():
    db = Database('cinema.db')
    movies, screenings = db.get_upcoming()
    return jsonify({'movies': serialize_all_movies(movies), 'screenings': serialize_all_screenings(screenings)})

def isupcoming(movieid):
    db = Database('cinema.db')
    movies = db.get_upcoming()[0]
    movie = db.quick_get_movie(movieid)
    print(movies, movie)
    return movie in movies



@app.route('/get_screens', methods=['POST'])
def get_the_screens():

    db = Database('cinema.db')
    return jsonift({'screens' : serialize_all_screens(db.fetch()[1])})






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
