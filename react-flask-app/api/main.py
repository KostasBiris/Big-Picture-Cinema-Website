from flask import Flask, render_template, request, redirect, jsonify
from db import Database
import socket

app = Flask(__name__)




@app.route('/')
def mainpage():
    return render_template('customers_main_interface.html')

@app.route('/manage')
def managepage():
    return render_template('business_main_interface.html')

def serialize(res):

    return {
        'id': res[0],
        'name':res[1],
        'blurb':res[2],
        'certificate':res[3],
        'director':res[4],
        'leadactors':res[5],
        'releasedate':res[6]
    }

def serialize_all(res):

    dic = {}
    
    for i in range(len(res)):
        dic[i] =serialize(res[i])
    return dic


@app.route('/movie/<name>', methods = ['POST'])
def view_movie(name):
    name = name.replace("_", " ")
    db = Database('cinema.db')
    movie = db.search_movies(name)
    if not movie: pass
    return serialize_all(movie)
@app.route('/movie/<name>/page', methods= ['POST'])
def _view_movie(name):
    name = name.replace("_", " ")
    name = name.lower()
    db = Database('cinema.db')
    print(name)
    movie = db.find_movie(name)
    print(movie)
    if not movie: pass
    return serialize(movie)

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

@app.route('/login')
def login():
    return render_template('customer_login.html')

@app.route('/login', methods = ['POST'])
def _login():
    db = Database('cinema.db')
    email = request.form['email']
    pwd = request.form['password']
    print(email, pwd)
    del db
    return render_template('customer_main_interface.html')

@app.route('/account')

def account():
    return "<h1> STUB ACCOUNT PAGE</h1>"

if __name__ == '__main__':
    app.run(debug=False, host='localhost', port='5000', threaded=True)


