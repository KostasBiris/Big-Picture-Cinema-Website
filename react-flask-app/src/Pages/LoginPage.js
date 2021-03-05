import React from 'react';
import main from '../static/main.css';
import logo from '../static/finlogo.png'


function login() {


    return 0;
}


class LoginPage extends React.Component{
    render() {
        return (
            <body>
            <head>
                <link rel="stylesheet" type="text/css" href={main}/>
            </head>
            <body className="register">
                <img  src={logo} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '32rem', height: '22rem'}}/>
                <form className="modal-content">
                    <div className="container">
                        <input className="register_details"  type="text" name="email" id="email" placeholder="E-mail address" style={{color:'black'}} required/>
                        <br/>
                        <input className="register_details"  type="password" name="password" id="password" placeholder="Password"style={{color:'black'}}required/>
                        <br/>
                        <input className="login_button" type="submit" value="LOG IN"  onClick={login()} style={{color:'white',position: 'relative'}}/>
                        <p style={{textAlign: 'center'}}>Don't have an account? <a href="#" style={{color:'dodgerblue'}}>Sign Up</a></p>
                    </div>
                </form>
        </body>
        </body>
        );
    }
}



export default LoginPage;