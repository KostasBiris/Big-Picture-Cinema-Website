import React from 'react'
import main from '../static/main.css';
import poster8 from '../static/poster8.jpg'
import CustomerHomePage from '../Pages/CustomerHomePage';


class BookTickets extends React.Component{
    constructor(props) {
        super(props);
        // this.getAllMoviesData = this.getAllMoviesData.bind(this);

        
    }

  
  
    render () {
      return (
        <React.Fragment>
            <head>
                    <link rel="stylesheet" type="text/css" href={main} />
                    <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

<script
  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>
            </head>
            <CustomerHomePage props={this.props}/>
            <div className="header_text">
            <h1 style={{position:'absolute', left:'25px', color: '#4e5b60'}}>CHOOSE A MOVIE: </h1>
            </div>
            <br />
            <br />
            <br />
            <fieldset>
                <div className="container_new">
                    <div className="hover01 column">
                        <input type="radio" name="gender" className="sr-only" id="1" />
                        <label for="1">
                            <figure><img className="image_box" src={{poster8}} className="new_movies" style={{position: 'relative'}} /></figure>
                        </label>
                        <input type="radio" name="gender" className="sr-only" id="2" />
                        <label for="2">
                            <figure><img className="image_box" src={{poster8}} className="new_movies" style={{position: 'relative'}} /></figure>
                        </label>
                        <input type="radio" name="gender" className="sr-only" id="3" />
                        <label for="3">
                            <figure><img className="image_box" src={{poster8}} className="new_movies" style={{position: 'relative'}} /></figure>
                        </label>
                        <input type="radio" name="gender" className="sr-only" id="4" />
                        <label for="4">
                            <figure><img className="image_box" src={{poster8}} className="new_movies" style={{position: 'relative'}} /></figure>
                        </label>
                        <input type="radio" name="gender" className="sr-only" id="5" />
                        <label for="5">
                            <figure><img className="image_box" src={{poster8}} className="new_movies" style={{position: 'relative'}} /></figure>
                        </label>
                        <input type="radio" name="gender" className="sr-only" id="6" />
                        <label for="6">
                            <figure><img className="image_box" src={{poster8}} className="new_movies" style={{position: 'relative'}} /></figure>
                        </label>
                        <input type="radio" name="gender" className="sr-only" id="7" />
                        <label for="7">
                            <figure><img className="image_box" src={{poster8}} className="new_movies" style={{position: 'relative'}} /></figure>
                        </label>
                    </div>
                </div>
            </fieldset>
            <br />
            <br />
            {/* <div className="header_text">
                <h1 style={{position:'absolute', left:'25px', color: '#4e5b60'}}>CHOOSE DATE AND TIME: </h1>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <fieldset>
            <div className="container-fluid px-0 px-sm-4 mx-auto">
                <div className="row justify-content-center mx-0">
                    <div className="col-lg-10">
                        <div className="card border-0">
                                <div className="card-header bg-dark">
                                    <div className="mx-0 mb-0 row justify-content-sm-center justify-content-start px-1"> 
                                        <input type="date" />
                                            <span className="fa fa-calendar"></span>
                                        </div>
                                </div>
                                <div className="card-body p-3 p-sm-5">
                                    <div className="row text-center mx-0">
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <label for="1">11:00AM</label>
                                            <input type="radio" id ="1" className="cell py-1"></input>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <input type="radio" id ="2" className="cell py-1"></input>
                                            <label for="2">13:30PM</label>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <input type="radio" id ="3"className="cell py-1"></input>
                                            <label for="3">16:00PM</label>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <input type="radio" id ="4" className="cell py-1"></input>
                                            <label for="4">19:00PM</label>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <input type="radio" id ="5" className="cell py-1"></input>
                                            <label for="5">21:30AM</label>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <input type="radio" id ="6" className="cell py-1"></input>
                                            <label for="6">23:45PM</label>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            </fieldset> */}
            {/* <script>
                {$(document).ready(function(){
                    $('.datepicker').datepicker({
                        format: 'dd-mm-yyyy',
                        autoclose: true,
                        startDate: '0d' 
                    });
                    $('.cell').click(function(){
                        $('.cell').removeClass('select');
                        $(this).addClass('select');
                    });
                    });}
            </script> */}
            {/* <br />
            <br />
            <div className="header_text">
                <h1 style={{position:'absolute', left:'25px', color: '#4e5b60'}}>CHOOSE SCREEN: </h1>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <fieldset>
            <div className="container-fluid px-0 px-sm-4 mx-auto">
                <div className="row justify-content-center mx-0">
                    <div className="col-lg-10">
                        <div className="card border-0">
                                <div className="card-header bg-dark">
                                </div>
                                <div className="card-body p-3 p-sm-5">
                                    <div className="row text-center mx-0">
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <input type="radio" id ="1" className="cell py-1"><label for="1">SILVER SCREEN 1</label></input>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <input type="radio" id ="2" className="cell py-1"><label for="2">SILVER SCREEN 2</label></input>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <input type="radio" id ="3"className="cell py-1"><label for="3">SILVER SCREEN 3</label></input>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <input type="radio" id ="4" className="cell py-1"><label for="4">VMAX SCREEN</label></input>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <input type="radio" id ="5" className="cell py-1"><label for="5">GOLDEN SCREEN</label></input>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            </fieldset> */}
            {/* <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script> */}
            
        </React.Fragment>
      )
    }
}
  
export default BookTickets
  