import React from 'react';
import main from '../static/main.css';
import finlogo from '../static/finlogo.png';
import usericon from '../static/usericon.png';
import poster8 from '../static/poster8.jpg';



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
  <div className="header_text" style={{paddingLeft:'300px'}}>
    <h1 style={{position:'center', left:'25px', color: '#4e5b60', fontWeight: 'bolder'}}>CHOOSE A MOVIE: </h1>
  </div>
  <br/>
  <br/>
  <br/>
  <fieldset>
    <div className="container_new" style={{paddingLeft:'500px'}}>
      <div className="hover01 column">
        <input type="radio" name="movies" className="sr-only" id="1"/>
        <label for="1">
          <figure><img className="image_box" src={poster8} className="new_movies"
              style={{position: 'relative'}} /></figure>
        </label>
        <input type="radio" name="movies" className="sr-only" id="2"/>
        <label for="2">
          <figure><img className="image_box" src={poster8} className="new_movies"
              style={{position: 'relative'}} /></figure>
        </label>
        <input type="radio" name="movies" className="sr-only" id="3"/>
        <label for="3">
          <figure><img className="image_box" src={poster8} className="new_movies"
              style={{position: 'relative'}} /></figure>
        </label>
        <input type="radio" name="movies" className="sr-only" id="4"/>
        <label for="4">
          <figure><img className="image_box" src={poster8} className="new_movies"
              style={{position: 'relative'}} /></figure>
        </label>
        <input type="radio" name="movies" className="sr-only" id="5"/>
        <label for="5">
          <figure><img className="image_box" src={poster8} className="new_movies"
              style={{position: 'relative'}} /></figure>
        </label>
        <input type="radio" name="movies" className="sr-only" id="6"/>
        <label for="6">
          <figure><img className="image_box" src={poster8} className="new_movies"
              style={{position: 'relative'}} /></figure>
        </label>
        <input type="radio" name="movies" className="sr-only" id="7"/>
        <label for="7">
          <figure><img className="image_box" src={poster8} className="new_movies"
              style={{position: 'relative'}} /></figure>
        </label>
      </div>
    </div>
  </fieldset>
  <br/>
  <br/>
  <br/>
  <br/>
  <fieldset>
    <div className="container-fluid px-0 px-sm-4 mx-auto">
      <div className="row justify-content-center mx-0">
        <div className="col-lg-10">
          <div className="card border-0">
            <div className="card-header" style={{backgroundColor:'#4e5b60'}}>
              <div className="mx-0 mb-0 row justify-content-sm-center justify-content-start px-1">
                <h1 className="header_text" style={{backgroundColor:'#4e5b60'}}>CHOOSE A DATE: </h1>
              </div>
            </div>
            <div className="card-body p-3 p-sm-5">
              <div className="row text-center mx-0">
                <div className="col-md-2 col-4 my-1 px-2">
                  <div className="mx-0 mb-0 row justify-content-sm-center justify-content-sm-center px-1"> <input
                      type="date"/><span className="fa fa-calendar"/></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
  <br/>
  <br/>
  <fieldset>
    <div className="container-fluid px-0 px-sm-4 mx-auto">
      <div className="row justify-content-center mx-0">
        <div className="col-lg-10">
          <div className="card border-0">
            <div className="card-header" style={{backgroundColor:'#4e5b60'}}>
              <div className="mx-0 mb-0 row justify-content-sm-center justify-content-start px-1">
                <h1 className="header_text" style={{backgroundColor:'#4e5b60'}}>CHOOSE A TIME: </h1>
              </div>
            </div>
            <div className="card-body p-3 p-sm-5">
              <div className="row text-center mx-0">
                <div className="col-md-2 col-4 my-1 px-2 tab_background rounded-pill">
                  <input type="radio" id="1" className="tab_background rounded-pill"/><label for="1">11:00AM</label>
                </div>
                <div className="col-md-2 col-4 my-1 px-2 tab_background rounded-pill">
                  <input type="radio" id="2" className="tab_background rounded-pill"/><label for="2">13:30PM</label>
                </div>
                <div className="col-md-2 col-4 my-1 px-2 tab_background rounded-pill">
                  <input type="radio" id="3" className="tab_background rounded-pill"/><label for="3">16:00PM</label>
                </div>
                <div className="col-md-2 col-4 my-1 px-2 tab_background rounded-pill">
                  <input type="radio" id="4" className="tab_background rounded-pill"/><label for="4">19:00PM</label>
                </div>
                <div className="col-md-2 col-4 my-1 px-2 tab_background rounded-pill">
                  <input type="radio" id="5" className="tab_background rounded-pill"/><label for="5">21:30PM</label>
                </div>
                <div className="col-md-2 col-4 my-1 px-2 tab_background rounded-pill">
                  <input type="radio" id="6" className="tab_background rounded-pill"/><label for="6">23:45PM</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
  <br/>
  <br/>
  <fieldset>
    <div className="container-fluid px-0 px-sm-4 mx-auto">
      <div className="row justify-content-center mx-0">
        <div className="col-lg-10">
          <div className="card border-0">
            <div className="card-header" style={{backgroundColor:'#4e5b60'}}>
              <div className="mx-0 mb-0 row justify-content-sm-center justify-content-start px-1">
                <h1 className="header_text" style={{backgroundColor:'#4e5b60'}}>CHOOSE A SCREEN: </h1>
              </div>
            </div>
            <div className="card-body p-3 p-sm-5">
              <div className="row text-center mx-0">
                <div className="col-md-2 col-4 my-1 px-2 tab_background rounded-pill">
                  <input type="radio" id="1" name="radioscreen" className="tab_background rounded-pill"/><label for="1">
                    SILVER SCREEN 1</label>
                </div>
                <div className="col-md-2 col-4 my-1 px-2 tab_background rounded-pill">
                  <input type="radio" id="2" name="radioscreen" className="tab_background rounded-pill"/><label for="2">
                    SILVER SCREEN 2</label>
                </div>
                <div className="col-md-2 col-4 my-1 px-2 tab_background rounded-pill">
                  <input type="radio" id="3" name="radioscreen" className="tab_background rounded pill"/><label for="3">
                    SILVER SCREEN 3</label>
                </div>
                <div className="col-md-2 col-4 my-1 px-2 tab_background rounded-pill">
                  <input type="radio" id="4" name="radioscreen" className="tab_background rounded-pill"/><label for="4"> VMAX
                    SCREEN</label>
                </div>
                <div className="col-md-2 col-4 my-1 px-2 tab_background rounded-pill">
                  <input type="radio" id="5" name="radioscreen" className="tab_background rounded-pill"/><label for="5">
                    GOLDEN SCREEN</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </fieldset> 
  <br/>
  

  <nav>
    <div className="container text-center">
        <button className="tab_background text mr-3 btn-lg">{'<'}</button>
        <button className="tab_background text mr-3 btn-lg">MOVIE</button>
        <button className="tab_background text mr-3 btn-lg">SEATS</button>
        <button className="tab_background text mr-9 btn-lg">CHECKOUT</button>
        <button className="tab_background text mr-3 btn-lg" style={{marginLeft:'12px'}}>{'>'}</button>
    </div>
    </nav>
    <br/>
    <footer className="bg-light text-center">
        <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            All rights reserved. © 2021 Copyright:
            <a className="text-dark">The Big Picture</a>
        </div>
    </footer> 

</body>
    );
}
}
export default EmployeeBook;