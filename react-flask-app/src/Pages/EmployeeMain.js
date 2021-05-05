import React from 'react';
import main from '../static/main.css';
import finlogo from '../static/finlogo.png';
import usericon from '../static/usericon.png';
import EmployeeBanner from '../components/EmployeeBanner';
import { Link } from "react-router-dom";



class EmployeeMain extends React.Component{

render (){
    return(
      <React.Fragment>
      <head>
      <link rel="stylesheet" type="text/css" href={main} />
      <link rel="icon" href="data:;base64,iVBORw0KGgo" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body id="grad1" style={{height:"100%", minHeight: "100vh"}}>
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
export default EmployeeMain;