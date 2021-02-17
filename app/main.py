from flask import Flask
from flask import render_template
from flask import request
from flask import redirect

from db import Database

app = Flask(__name__)

@app.route('/')
def mainpage():
    return render_template('customers_main_interface.html')

@app.route('/', methods=['POST'])
def mainpage_():
    #For now, we just search the database based on the entry, and render html showing the results.
    #We need to dynamic html generation.
    db = Database('cinema.db')
    query = request.form['query']
    return "<h1 style='color:blue'>" + str(db.search(query, 'movies')) + "</h1>"


if __name__ == '__main__':

    app.run(debug=False, host='localhost', port=4000)


