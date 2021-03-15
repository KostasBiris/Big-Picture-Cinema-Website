import React from 'react';
import main from '../static/main.css';
import logo from '../static/finlogo.png'


var publicIP = require('public-ip')

//Component for the login page.
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        //By default, the state is such that the user is unauthorised, the email and password are blank.
        this.state = { email: '', password: '', IP: '' ,response: undefined, auth: false}
        //Bind our methods.
        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.validate = this.validate.bind(this);
        this.login = this.login.bind(this);
        this.assertAuth = this.assertAuth.bind(this);
        this.getClientIP = this.getClientIP.bind(this);
        this.getClientIP();
    }

    getClientIP = () => {
        (async () => {
            this.setState({ IP: await publicIP.v4() })
        })();
    }

    //Method for validating the email and password.
    validate = (email, password) => {

        //Validate the email through regex.
        function validateEmail(email) {
            //https://stackoverflow.com/questions/52188192/what-is-the-simplest-and-shortest-way-for-validating-an-email-in-react
            const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regexp.test(email);
        }
        //Validate the password through length check.
        function validate(password) {
            if (password.length >= 8) {
                return true;
            }
            return false;

        }
        //Use && for returning True IFF both are true.
        return validateEmail(email) && validate(password);
    }

    //Method for handling login atttempt.
    //Called when the login button is pressed.
    handleLogin = (e) => {
        e.preventDefault();
        //If validation failes, alert the user.
        if (!this.validate(this.state.email, this.state.password)) {
            alert("Please enter a valid username and password.");
            //We reset the state for security reasons.
            //this.setState({ email: '', password: '' });
        } else {
            //If validation passes, attempt to login.
            this.login();
        }
    }


    login = () => {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: this.state })})
            .then(response => response.json()).then(data => {
                this.setState({ response : data.response})
               }).then(() => console.log(this.state)).then(() => this.assertAuth());
    };

    assertAuth = () => {
        console.log(this.state.response);
        if (this.state.response === "OK") {
            this.setState({ email: '', password: '' });
            console.log('LOGIN: SUCCESS');
            this.props.history.push('/home', {auth: true, IP: this.state.IP});
        }
        if (this.state.response === "BAD") {
            alert('LOGIN: FAILED');
            this.setState({email: '', password:  '', response: '' });
        }
    }





    //Method for handling a change in the email field.
    handleEmailChange = (e) => {
        //Update the state to match the value of the field.
        this.setState({ email: e.target.value });
    }

    //Method for handling a change in the password field.
    handlePasswordChange = (e) => {
        //Update the state to match the value of the field.
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <body>
                <head>
                    <link rel="stylesheet" type="text/css" href={main} />
                </head>
                <body className="register">
                    <img src={logo} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '32rem', height: '22rem' }} />
                    <form className="modal-content">
                        <div className="container">
                            <input onChange={this.handleEmailChange} value={this.state.email} className="register_details" type="text" name="email" id="email" placeholder="E-mail address" style={{ color: 'black' }} required />
                            <br />
                            <input onChange={this.handlePasswordChange} value={this.state.password} className="register_details" type="password" name="password" id="password" placeholder="Password" style={{ color: 'black' }} required />
                            <br />
                            <input onClick={this.handleLogin} className="login_button" type="submit" value="LOG IN" onClick={this.handleLogin} style={{ color: 'white', position: 'relative' }} />
                            <p style={{ textAlign: 'center' }}>Don't have an account? <a href="/register" style={{ color: 'dodgerblue' }}>Sign Up</a></p>
                        </div>
                    </form>
                </body>
            </body>
        );
    }
}



export default LoginPage;