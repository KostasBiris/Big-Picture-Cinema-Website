from flask import Flask, render_template, request, redirect

from db import Database

import socket

app = Flask(__name__)





@app.route('/')
def mainpage():
    return render_template('customers_main_interface.html')

@app.route('/', methods=['POST'])
def _mainpage():
    #For now, we just search the database based on the entry, and render html showing the results.
    #We need to dynamic html generation.
    db = Database('cinema.db')
    query = request.form['query']
    dat = str(db.search(query, 'movies'))
    del db
    return "<h1 style='color:blue'>" + dat + "</h1>"

@app.route('/register')
def register():
    return render_template('customer_register.html')

@app.route('/register', methods=['POST'])
def _register():

    db = Database('cinema.db')
    
    first_name = request.form['first_name']
    surname = request.form['last_name']
    phone_number = request.form['phone_number']
    email = request.form['email']
    password = request.form['password']
    dob = request.form['birthday']
    db.add_customer(first_name, surname, phone_number, email, password, dob)
    del db
    return render_template('customers_main_interface.html')


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
    return render_template('customer_login.html')
 

@app.route('/account')

def account():
    return "<h1> STUB ACCOUNT PAGE</h1>"



if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port='5000', threaded=True)

