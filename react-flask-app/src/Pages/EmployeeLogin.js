import React from 'react';
import main from '../static/main.css';
import logo from '../static/finlogo.png';
import cinema from '../static/cinema.jpg';
/*body {
    background-image: url("../static/cinema.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }*/

class EmployeeLogin extends React.Component{

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
    			<input className="registerDetails" type="text" name="identification" id="id" placeholder="Employee ID" style={{color:'black'}} required/>
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
export default EmployeeLogin;