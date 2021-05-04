import React from 'react';
import main from '../static/main.css';
import finlogo from '../static/finlogo.png';
import usericon from '../static/usericon.png';
import poster8 from '../static/poster8.jpg';
import BookTicketsPage from './BookTicketsPage';


class EmployeeBook extends React.Component{

render () {
    return(
    <body id = "grad1">
        <head>
        <link rel="stylesheet" type="text/css" href={main} />
        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
        <meta className="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </head>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#"><img src={finlogo} style={{top:'1px',width:'rem',height:'8rem'}}/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0">
            <button className="tab_background mr-3">LOG OUT</button>
            <input className="mr-3" type="image" style={{width:"2rem",height:"2rem"}} src={usericon}/>
            <input className="form-control mr-sm-2 search_bar" type="search" placeholder="Search here.." aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <br/>
      <br/>    
<div className="container text-center">
        <button className="tab_background text mr-3 btn-lg">BOOK TICKETS</button>
        <button className="tab_background text mr-3 btn-lg">VIEW MOVIES</button>
        <button className="tab_background text mr-3 btn-lg" >REGISTER CUSTOMER</button>
        <button className="tab_background text mr-9 btn-lg">HELP</button>
</div>
  <br/>
  <BookTicketsPage />
</body>
    );
}
}
export default EmployeeBook;