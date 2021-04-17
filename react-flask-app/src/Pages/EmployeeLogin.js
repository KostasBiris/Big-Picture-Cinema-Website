import React from 'react';
import main from '../static/main.css';
import logo from '../static/finlogo.png';
import cinema from '../static/cinema.jpg';
import {login} from "../auth";
import { Redirect } from "react-router";


var publicIP = require('public-ip')
/*body {
    background-image: url("../static/cinema.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }*/

class EmployeeLogin extends React.Component{
    constructor(props) {
        super(props);
        this.state = { id: 0, password: '', IP: null };
        this.handleLogin = this.handleLogin.bind(this);
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

    // validate = (password) => {

    //     //Validate the password through length check.
    //     function validate(password) {
    //         if (password.length >= 8) {
    //             return true;
    //         }
    //         return false;
    //     }

    //     //Use && for returning True IFF both are true.
    //     return validate(password);
    // }


    handleLogin = (e) => {
        e.preventDefault();
        this.Login();
        // console.log(this.state);
        // if (!this.validate(this.state.password)) {
        //     alert("Please enter a valid username and password and ID.");
        //     console.log(this.state);
        //     //We reset the state for security reasons.
        //     //this.setState({ email: '', password: '' });
        // } else {
        //     //If validation passes, attempt to login.
        //     this.login();
        // }
    }


    handleIDChange = (e) => {
        this.setState({ id: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    Login = () => {
        fetch('/employee_login', {
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
                        this.props.history.push('/emain', this.state)
                    else
                        return <Redirect to='/elogin' />
                }
                else
                    console.log("Please type in correct username/password");
            })
    };

    // assertAuth = () => {
    //     console.log(this.state.response);
    //     if (this.state.response === "OK") {
    //         this.setState({ email: '', password: '' });
    //         console.log('LOGIN: SUCCESS');
    //         //this.props.history.push('/employee', { auth: true, IP: this.state.IP });
    //     }
    //     if (this.state.response === "BAD") {
    //         alert('LOGIN: FAILED');
    //         this.setState({ id: 0, password: '', response: '' });
    //     }
    // }



render(){
    return(
        <body>
        <head>
        <link rel="stylesheet" type="text/css" href={main}/>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </head>
        <img src={cinema} style={{width:'100%', height:'100vh' }}/>
    <div className="register">
        <form className="modalContent">
            <div className="containerStart">
            <img src={logo} style={{display: 'block', margin: 'auto', width:'13rem', height: '10rem'}}/>
    			<input value={this.state.id} onChange={this.handleIDChange} className="registerDetails" type="text" name="identification" id="id" placeholder="Employee ID" style={{color:'black'}} required/>
    			<br/>
    			<input value={this.state.password} onChange={this.handlePasswordChange} className="registerDetails" type="password" name="password" id="password" placeholder="Password" style={{color:'black'}} required/>
    			<br/>
    			<input  onClick={this.handleLogin}className="loginButton" type="submit" value="LOG IN" style={{color:'black', position:'relative'}} />
            </div>
  			</form>
    </div>
        </body>
    );
}
   





}
export default EmployeeLogin;