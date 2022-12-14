import main from "../static/main.css"
import React from "react";
import { Link } from "react-router-dom";
global.jQuery = require('jquery');
require('bootstrap');


class EMenu extends React.Component{
    componentDidMount() {
      window.addEventListener('load', this.stepUp);
      
  }  
  render() {
    return (
    <React.Fragment>
        <head>
        <link rel="stylesheet" type="text/css" href={main} />
        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </head>
        <body id="grad1">
            <fieldset style={{paddingTop:'50px',paddingRight:'20px'}} />
            <div className="container text-center">
                <Link to={'/ebook'}><button className="tab_background employee_buttons mr-6" >BOOK TICKETS</button></Link>
                <Link to={'/emain/view_movies'}><button className="tab_background employee_buttons mr-3">VIEW MOVIES</button></Link>
                <Link to={'/register'}><button className="tab_background employee_buttons mr-3" >REGISTER USER</button></Link>
            </div>
        <br/>
        <br/>
        <br/>
        </body>
        </React.Fragment>
      );
  }
  
  }
  export default EMenu;