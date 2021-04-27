import main from "../static/main.css"
import React from "react";
import { Link } from "react-router-dom";
global.jQuery = require('jquery');
require('bootstrap');


class EMenu extends React.Component{
    componentDidMount() {
      window.addEventListener('load', this.stepUp);
      
    //   const _jquery = document.createElement("script");
    //   _jquery.src = "https://code.jquery.com/jquery-3.2.1.slim.min.js";
    //   _jquery.async = true;
    //   _jquery.integrity = "sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN";
    //   _jquery.crossOrigin = "anonymous";
    //   document.body.appendChild(_jquery);
  
    //   const _popper = document.createElement("script");
    //   _popper.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js";
    //   _popper.async = true;
    //   _popper.integrity = "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q";
    //   _popper.crossOrigin = "anonymous";
    //   document.body.appendChild(_popper);
  
    //   const _bootstrap = document.createElement("script");
    //   _bootstrap.src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
    //   _bootstrap.async = true;
    //   _bootstrap.integrity ="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl";
    //   _bootstrap.crossOrigin ="anonymous";
    //   document.body.appendChild(_bootstrap);
    
  
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
                <Link to={'/ebook'}><button className="tab_background text mr-3 btn-lg">BOOK TICKETS</button></Link>
                <Link to={'/emain/view_movies'}><button className="tab_background text mr-3 btn-lg">VIEW MOVIES</button></Link>
                <Link to={'/register'}><button className="tab_background text mr-3 btn-lg" >REGISTER CUSTOMER</button></Link>
                <button className="tab_background text mr-9 btn-lg">HELP</button>
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