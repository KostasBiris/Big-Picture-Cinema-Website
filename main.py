from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
app = Flask(__name__)

@app.route('/')
def mainpage():
    return render_template('customers_main_interface.html')

if __name__ == '__main__':
    app.run(debug=False, host='localhost', port=4000)