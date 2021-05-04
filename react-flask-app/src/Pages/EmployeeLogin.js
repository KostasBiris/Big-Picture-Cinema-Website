import React from 'react';
import main from '../static/main.css';
import logo from '../static/finlogo.png';
import cinema from '../static/cinema.jpg';
import {login} from "../auth";
import { Redirect } from "react-router";


var publicIP = require('public-ip')


class EmployeeLogin extends React.Component{
    constructor(props) {
        super(props);
        this.state = { id: 0, password: '', IP: null };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.Login = this.Login.bind(this);

    }
    

    //Method for handling login.
    handleLogin = (e) => {
        e.preventDefault();
        this.Login();

    }

    //Method for handling the ID changing.
    handleIDChange = (e) => {
        this.setState({ id: e.target.value });
    }
    //Method for handling the password changing.
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }


    //Call the fetch to the api in order to authenticate and login.
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