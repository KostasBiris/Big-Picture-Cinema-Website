from flask import Flask, render_template, request, redirect, jsonify
from db import Database
import socket
import time
from flask_cors import CORS, cross_origin
import os
import json
import stripe
app = Flask(__name__)
CORS(app)

stripe.api_key = "sk_test_51ISQ7OC2YcxFx25Ty8LGkfEVQczFPRVHPyDqa6WJRtwNXNUST7GJbzEpWdWFWBZftAMgeM1U8LVfDrwb8R768K0800R2icalhU"

@app.route('/')
def mainpage():
    return render_template('customers_main_interface.html')

@app.route('/manage')
def managepage():
    return render_template('business_main_interface.html')

def serialize_movie(res):

    return {
        'id': res[0],
        'name':res[1],
        'blurb':res[2],
        'certificate':res[3],
        'director':res[4],
        'leadactors':res[5],
        'releasedate':res[6]
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


@app.route('/movie/<name>', methods = ['POST'])
def view_movie(name):
    name = name.replace("_", " ")
    db = Database('cinema.db')
    movie = db.search_movies(name)
    if not movie: pass
    return serialize_all_movies(movie)
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

@app.route('/booking')
def booking():
    return render_template('employee_main_interface.html')

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


@app.route('/insession/<ip>', methods=['POST'])
def insession(ip):
    db = Database('cinema.db')
    rq = db.ip_in_session(ip)
    if not rq:
        del db
        return jsonify({'response': 'error'})
    data = db.fetch_customer(rq[5])
    return jsonify({'response':serialize_user(data)})

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
    res, id = db.validate_customer(email, password)
    if res:
        db.add_session(ip, time.time(), 'NULL', 1, id, 'NULL', 'NULL')
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

if __name__ == '__main__':
    app.run(debug=False, host='localhost', port='4000', threaded=True)


