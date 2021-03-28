import React from 'react';
import main from '../static/main.css';
import logo from '../static/finlogo.png';
import vid from '../static/vid.mp4';
import cinema from '../static/cinema.jpg';
import ManagerBanner from '../components/ManagerBanner'; 
var publicIP = require('public-ip')

class ManagerLogin extends React.Component{

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
                    <input className="registerDetails" type="text" name="email" id="email" placeholder="E-mail address" style={{color:'black'}} required/>
                    <br/>
                    <input className="registerDetails" type="text" name="identification" id="id" placeholder="Manager ID" style={{color:'black'}} required/>
                    <br/>
                    <input className="registerDetails" type="password" name="password" id="password" placeholder="Password" style={{color:'black'}} required/>
                    <br/>
                    <input  className="loginButton" type="submit" value="LOG IN" style={{color:'black', position:'relative'}} />
                </div>
                  </form>
        </div>
            </body>
        );
    }
   





}
export default ManagerLogin;