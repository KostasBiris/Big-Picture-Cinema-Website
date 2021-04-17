import React from 'react';
import main from '../static/main.css';
import logo from '../static/finlogo.png';
import vid from '../static/vid.mp4';
import cinema from '../static/cinema.jpg';
import ManagerBanner from '../components/ManagerBanner';
import {login} from "../auth";
import { Redirect } from "react-router";

var publicIP = require('public-ip')

class ManagerLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: 0, password: '', email: '', IP: null };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.Login = this.Login.bind(this);
        // this.validate = this.validate.bind(this);
        // this.assertAuth = this.assertAuth.bind(this);
        // this.getClientIP = this.getClientIP.bind(this);
        // this.getClientIP();
    }

    // getClientIP = () => {
    //     (async () => {
    //         this.setState({ IP: await publicIP.v4() })
    //     })();
    // }

    // validate = (email, password) => {

    //     //Validate the email through regex.
    //     function validateEmail(email) {
    //         //https://stackoverflow.com/questions/52188192/what-is-the-simplest-and-shortest-way-for-validating-an-email-in-react
    //         const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //         return regexp.test(email);
    //     }
    //     //Validate the password through length check.
    //     function validate(password) {
    //         if (password.length >= 8) {
    //             return true;
    //         }
    //         return false;
    //     }
    //     console.log('email' + validateEmail(email));

    //     //Use && for returning True IFF both are true.
    //     return validateEmail(email) && validate(password);
    // }


    handleLogin = (e) => {
        e.preventDefault();
        this.Login();
        // console.log(this.state);
        // if (!this.validate(this.state.email, this.state.password)) {
        //     alert("Please enter a valid username and password and ID.");
        //     console.log(this.state);
        //     //We reset the state for security reasons.
        //     //this.setState({ email: '', password: '' });
        // } else {
        //     //If validation passes, attempt to login.
        //     this.login();
        // }
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handleIDChange = (e) => {
        this.setState({ id: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    Login = () => {
        fetch('/manager_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: this.state })
        })
            .then(response => response.json()).then(token => {
                if (token.access_token) {
                    login(token) // store login key in local database 
                    this.setState({logged: this.props.auth[0]});
                    if(this.props.auth[0] == true)
                        this.props.history.push('/overall_analytics', this.state)
                    else
                        return <Redirect to='/mlogin' />
                }
                else
                    console.log("Please type in correct username/password");
            })
            // .then(data => {
            //     this.setState({ response: data.response })
            // }).then(() => console.log(this.state)).then(() => this.assertAuth());
    };

    // assertAuth = () => {
    //     console.log(this.state.response);
    //     if (this.state.response === "OK") {
    //         this.setState({ email: '', password: '' });
    //         console.log('LOGIN: SUCCESS');
    //         this.props.history.push('/overall_analytics', { auth: true});
    //     }
    //     if (this.state.response === "BAD") {
    //         alert('LOGIN: FAILED');
    //         this.setState({ email: '', password: '', response: '' });
    //     }
    // }






    render() {
        return (

            <body>
                <head>
                    <link rel="stylesheet" type="text/css" href={main} />
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                </head>
                <img src={cinema} style={{ width: '100%', height: '100vh' }} />
                <div className="register">
                    <form className="modalContent">
                        <div className="containerStart">
                            <img src={logo} style={{ display: 'block', margin: 'auto', width: '13rem', height: '10rem' }} />
                            <input onChange={this.handleEmailChange} value={this.state.email} className="registerDetails" type="text" name="email" id="email" placeholder="E-mail address" style={{ color: 'black' }} required />
                            <br />
                            <input onChange={this.handleIDChange} value={this.state.id} className="registerDetails" type="text" name="identification" id="id" placeholder="Manager ID" style={{ color: 'black' }} required />
                            <br />
                            <input onChange={this.handlePasswordChange} value={this.state.password} className="registerDetails" type="password" name="password" id="password" placeholder="Password" style={{ color: 'black' }} required />
                            <br />
                            <input onClick={this.handleLogin} className="loginButton" type="submit" value="LOG IN" style={{ color: 'black', position: 'relative' }} />
                        </div>
                    </form>
                </div>
            </body>
        );
    }






}
export default ManagerLogin;