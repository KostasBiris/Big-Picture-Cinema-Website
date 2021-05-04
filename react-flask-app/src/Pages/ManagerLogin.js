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
        this.state = { id: '', password: '', email: '', IP: null };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.Login = this.Login.bind(this);
    }

    //Method for handling login attempt.
    handleLogin = (e) => {
        e.preventDefault();
        this.Login();
    }

    //Methods for handling changes in the forms.
    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handleIDChange = (e) => {
        this.setState({ id: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }
    //Method for making the fetch call to the flask server in order to authenticate.
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
    };







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