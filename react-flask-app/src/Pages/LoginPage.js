import React from 'react';
import main from '../static/main.css';
import logo from '../static/finlogo.png';
import vid from '../static/vid.mp4';
// import UseAuth from "../auth/index"
import { Redirect } from "react-router";
import {withHooksHOC} from "../auth/withHooksHOC";
import {login} from "../auth";

var publicIP = require('public-ip')

//Component for the login page.
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        //By default, the state is such that the user is unauthorised, the email and password are blank.
        this.state = { email: '', password: '', IP: '' ,response: undefined, auth: false, logged:''}
        //Bind our methods.
        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.Login = this.Login.bind(this);
        
        this.setState({logged: this.props.auth[0]}); // is the user logged?
    }
    //Method for handling login atttempt.
    //Called when the login button is pressed.
    handleLogin = (e) => {
        e.preventDefault();
        this.Login();
    }

    Login = () => {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: this.state })})
            .then(response => response.json()).then(token => {
                if (token.access_token) {
                    login(token) // store login key in local database 
                    // this.assertAuth(token.access_token);
                    this.setState({logged: this.props.auth[0]});
                    if(this.props.auth[0] == true)
                        this.props.history.push('/home', this.state)
                    else
                        return <Redirect to='/login' />
                }
                else
                    console.log("Please type in correct username/password");
            })
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
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            </head>
            <video playsInline autoPlay muted loop>
                <source src={vid} type="video/mp4"/>
            </video>

            <div className="register">
                {!this.state.logged? <form className="modalContent">
                    <div className="containerStart">
                        <img src={logo} style={{display: 'block', margin: 'auto', width:'13rem', height: '10rem'}}/>
                        <input onChange={this.handleEmailChange} value={this.state.email} className="registerDetails"  type="text" name="email" id="email" placeholder="E-mail address"  required/>
                        <br/>
                        <input onChange={this.handlePasswordChange} value={this.state.password} className="registerDetails"  type="password" name="password" id="password" placeholder="Password" required/>
                        <br/>
                        <label>
                            <input type="checkbox" checked="checked" name="remember" style={{marginBottom:'15px'}}/> Remember me
                        </label>
                        <input onClick={this.handleLogin} className="loginButton" type="submit" value="LOG IN" style={{color: 'white', position: 'relative'}} />
                        <p style={{textAlign: 'center', color:'dodgerblue'}}>Don't have an account? <a href="/register">Sign Up</a>.</p>
                    </div>
                </form>: 
                <></>
                
                }
            </div>
        </body>
        );
    }
}



export default withHooksHOC(LoginPage);