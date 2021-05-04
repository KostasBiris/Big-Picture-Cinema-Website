import React from 'react'
import main from '../static/main.css';
import poster8 from '../static/poster8.jpg'
import SeachIMDB from '../components/SearchIMDB';
import Banner from '../components/Banner';
import Select from 'react-select';
import moment from 'react-moment';
import { relativeTimeThreshold } from 'moment';
global.jQuery = require('jquery');
require('bootstrap');


let interval;
class BookTickets extends React.Component {
    constructor(props) {
        console.log("inside book tickets.")
        super(props);
        console.log(this.props);
        if (this.props.location) {
            console.log(this.props.location.state);
        }
        this.state = {
            dateChosen: '',
            movieChosen: [],   // stores the movie chosen by the user
            movieTimes: [],
            movieScreens: [],
            timeChosen: '',
            screenChosen: '',
            screenings: [],
            movies: [],
            stepped : false
        };
        this.handleDate = this.handleDate.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleMovie = this.handleMovie.bind(this);
        this.handleScreen = this.handleScreen.bind(this);
        this.getMovieTimes = this.getMovieTimes.bind(this);
        this.getMovieScreens = this.getMovieScreens.bind(this);
        this.goToSeatMap = this.goToSeatMap.bind(this);
        this.seekData = this.seekData.bind(this);
        this.reformatd = this.reformatd.bind(this);
        this.movieOnScreen = this.movieOnScreen.bind(this);
    }

    componentDidCatch(TypeError){}


    //Method that fetches the upcoming screenings and their movies.
    seekData = async () => {
        await fetch('/upcoming', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(response => response.json()).then(data => {
            this.setState({ screenings: Object.values(data.screenings), movies: Object.values(data.movies) })
            console.log(data)
        })

        if (this.props.location) {
            if (this.props.location.state) {
                this.setState({movieChosen : this.props.location.state.returnedData.internalid});
            }
        }



    }

    componentDidMount = () =>{
        window.addEventListener('load', this.seekData);
        this.seekData();
    }
    componentWillUnmount = () => {
        window.removeEventListener('load', this.seekData)
    }






    //Dirty function for date reformatting.
    reformatd = (inp) => {
        let dArr = inp.split("-");
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0];

    }


    handleDate = (e) => {
        //Again, func for date reformatting.
        function formatd(inp) {


            let dArr = inp.split("-");  // ex input "2010-01-18"
            return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"

        }


        if (e.target.value)
            this.setState({ dateChosen: formatd(e.target.value) });
    }

    //Method for handling change in the time.
    handleTime = (data) => {
        // e.preventDefault();
        this.setState({ timeChosen: data });
        let date = this.state.dateChosen;
        let movieid = parseInt(this.state.movieChosen);
        let screenid = parseInt(this.state.screenChosen);
        let time = data;
        let screening;
        //Find the associated screening.
        if (this.state.screenings.length > 0) {
            this.state.screenings.forEach(function (entry) {
                if (entry.date === date) {
                    if (entry.movieid === movieid) {

                        if (entry.screenid === screenid) {
                            // console.log(entry.time, time);
                            if (entry.time === data.value) {
                                screening = entry;
                            }
                        }
                    }
                }

            })
        }
        this.setState({ screening: screening });

    }
    
    //Method for handling the movie changing.
    handleMovie = (e) => {
        // e.preventDefault();
        if (e.target.id)
            this.setState({ movieChosen: e.target.id });
    }

    //Method for handling the screen changing.
    handleScreen = (e) => {
        //e.preventDefault();
        this.setState({ screenChosen: e.target.value, timeChosen: '' });

        //console.log(this.state);
    }

    // filters out the times of the movieChosen and these are used to be rendered.
    getMovieTimes = () => {
        // getting the data before going into if statement or 'this' wont be recognised
        let movieChosen = parseInt(this.state.movieChosen)
        let date_chosen_day = this.state.dateChosen.split("-")[0]
        let times = [];
        let screenid = parseInt(this.state.screenChosen);
        //Find the correct times
        if (this.state.screenings.length > 0) {
            this.state.screenings.forEach(function (entry) {
                // get the day for each of the entries
                let movie_date_day = entry.date.split("-")[0]

                if (parseInt(movie_date_day) == parseInt(date_chosen_day)) {
                    if (entry.movieid == movieChosen) {
                        if (entry.screenid == screenid) {
                            times.push(entry.time)
                        }
                    }
                }
            })
            console.log(times)
        }




        const options = times.map(v => ({
            label: v,
            value: v
        }));
        return (
            <div style={{ width: this.state.timeChosen ? '100px' : '1000px' }}>
                <Select onChange={this.handleTime} value={this.state.timeChosen} options={options} placeholder="time" name="times" />
            </div>
        )

    }




    // filers out the screens where the movie is played.
    getMovieScreens = (movieID) => {
        let screens = [];
        this.state.screenings.forEach(function (entry) {
            if (entry == movieID)
                screens.push(entry.screenid)
        })
        // this.setState({movieScreens : screens})

        {
            screens.map((screen, index) => {
                return (
                    <div onClick={this.handleScreen} screenValue={screen} className="col-md-2 col-4 my-1 px-2 time-input">
                        {screen == 4 ? <label for={index}> VMAX SCREEN</label> :
                            screen == 5 ? <label for={index}> GOLDEN SCREEN </label> :
                                <label for={index}> SILVER SCREEN {screen}</label>
                        }
                        <input type="radio" id={index} className="cell py-1"></input>
                    </div>
                )
            })
        }
    }

    //Method for pushing to the history stack the corresponding employee/customer seatmap
    goToSeatMap = () => {
        console.log(this.props)
        if (this.props.isEmployee)
            this.props.history.push('/eas', this.state);
        else
            this.props.history.push('/as', this.state);
    }


    //Checks if a movie is screening on a specific screen
    movieOnScreen = (screenid) => {
        let movieid = parseInt(this.state.movieChosen);
        let ok = false;
        let dateday = parseInt(this.state.dateChosen.split('-')[0])
        let datemonth = parseInt(this.state.dateChosen.split('-')[1])
        let dateyear = parseInt(this.state.dateChosen.split('-')[2])
        this.state.screenings.forEach(function (entry) {
            if (entry.movieid == movieid) {
                console.log(dateday, datemonth, dateyear, parseInt(entry.date.split('-')[0]), parseInt(dateday && entry.date.split('-')[1]),)
                if (entry.screenid == screenid) {
                    if (parseInt(entry.date.split('-')[0]) === dateday && parseInt(entry.date.split('-')[1]) === datemonth && parseInt(entry.date.split('-')[2]) === dateyear) {
                        ok = true;
                    }
                }
            }

        })
        return ok;
    }



    render() {
        console.log(this.state);


        return (
            <React.Fragment>
                <head>
                    <link rel="stylesheet" type="text/css" href={main} />

                </head>
                <body id="grad1">
                    <br />

                    <div className="header_text">
                        <h1 style={{ position: 'absolute', left: '25px', color: '#4e5b60', fontWeight: 'bolder' }}>CHOOSE A MOVIE: </h1>
                    </div>
                    <br />
                    <br />
                    <br />
                    <fieldset>
                        <div className="container_new">
                            <div className="hover01 column">
                                {
                                    this.state.movies.length > 0 ?
                                        this.state.movies.map((movie, index) => {
                                            return (
                                                <>
                                                    
                                                    <input type="radio" name="gender" className="sr-only" id={index} checked = {parseInt(this.state.movieChosen) === parseInt(movie.internalid)} />
                                                    <label for={index}>
                                                        <figure><img id={movie.internalid} onClick={this.handleMovie} className="image_box"
                                                            src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} 
                                                            style={{ position: 'relative' }} />
                                                        </figure>
                                                    </label>
                                                </>
                                            )
                                        })
                                        : <p>No results found.</p>
                                }
                            </div>
                        </div>
                    </fieldset>
                    <br />
                    <br />
                    <fieldset>
                        <div className="container-fluid px-0 px-sm-4 mx-auto">
                            <div className="row justify-content-center mx-0">
                                <div className="col-lg-10">
                                    <div className="card border-0">
                                        <div className="card-header" style={{ backgroundColor: "#4e5b60" }}>
                                            <div className="mx-0 mb-0 row justify-content-sm-center justify-content-start px-1">
                                                <h1 className="header_text" style={{ color: "antiqueWhite" }}>CHOOSE DATE:</h1>
                                            </div>
                                        </div>
                                        <div className="justify-content-sm-center px-sm-4 card-body">
                                            <div className="row text-center">
                                                <div className="col-md-2 col-4 my-1 px-2">
                                                    <div className="mx-0 mb-0 row justify-content-sm-center justify-content-center px-1">
                                                        <input type="date" onChange={this.handleDate} value={this.reformatd(this.state.dateChosen)} disabled={this.state.movieChosen.length === 0 ? "disabled" : ""} />
                                                        <span className="fa fa-calendar"></span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <br />
                    <br />
                    <fieldset>




                        <div className="container-fluid px-0 px-sm-4 mx-auto">
                            <div className="row justify-content-center mx-0">
                                <div className="col-lg-10">
                                    <div className="card border-0">
                                        <div className="card-header" style={{ backgroundColor: "#4e5b60" }}>
                                            <div className="mx-0 mb-0 row justify-content-sm-center justify-content-start px-1">
                                                <h1 className="header_text" style={{ color: "antiqueWhite" }}>CHOOSE SCREEN:</h1>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row text-center mx-0">
                                                {
                                                    this.state.movieScreens ? this.getMovieScreens(this.state.movieScreens) :
                                                        <p> Choose a movie to see the screening times </p>
                                                }
                                                {
                                                    this.state.dateChosen ?
                                                        <div className="row text-center mx-0">
                                                            {
                                                                this.movieOnScreen(1) ?
                                                                    // <div className="col-md-2 col-4 my-1 px-2 tab_background rounded-pill" >
                                                                    //     <label for="1">SILVER SCREEN 1</label>
                                                                    //     <input type="radio" id="1" className="tab_background rounded-pill" name="screen" value="1" onClick={this.handleScreen}/>
                                                                    // </div>
                                                                    <div className=".col-md-2 .col-4 .my-1 .px-2 buttons_remove" >
                                                                    <input type="radio" id="1" className="buttons_remove" name="screen" value="1" onClick={this.handleScreen}/>
                                                                    <label style={{padding:'5px'}} for="1">SILVER SCREEN 1</label>
                                                                    
                                                                    </div>
                                                                    :
                                                                    <></>

                                                            }
                                                            {
                                                                this.movieOnScreen(2) ?
                                                                    
                                                                    <div className=".col-md-2 .col-4 .my-1 .px-2 buttons_remove">
                                                                        
                                                                        <input type="radio" id="2" className="buttons_remove" name="screen" value="2" onClick={this.handleScreen}></input>
                                                                        <label style={{padding:'5px'}} for="2">SILVER SCREEN 2</label>
                                                                    </div> 

                                                                    :
                                                                    <></>
                                                            }
                                                            {
                                                                this.movieOnScreen(3) ?
                                                                    <div className=".col-md-2 .col-4 .my-1 .px-2 buttons_remove">
                                                                        
                                                                        <input type="radio" id="3" className="buttons_remove" name="screen" value="3" onClick={this.handleScreen}></input>
                                                                        <label style={{padding:'5px'}} for="3">SILVER SCREEN 3</label>
                                                                    </div>
                                                                    :
                                                                    <></>
                                                            }
                                                            {
                                                                this.movieOnScreen(4) ?
                                                                    <div className=".col-md-2 .col-4 .my-1 .px-2 buttons_remove">
                                                                        
                                                                        <input type="radio" id="4" className="buttons_remove" name="screen" value="4" onClick={this.handleScreen}></input>
                                                                        <label style={{padding:'5px'}} for="4">VMAX SCREEN</label>
                                                                    </div>

                                                                    :
                                                                    <></>
                                                            }
                                                            {
                                                                this.movieOnScreen(5) ?

                                                                    <div className=".col-md-2 .col-4 .my-1 .px-2 buttons_remove">
                                                                        
                                                                        <input type="radio" id="5" className="buttons-remove" name="screen" value="5" onClick={this.handleScreen}></input>
                                                                        <label style={{padding:'5px'}} for="5">GOLDEN SCREEN</label>
                                                                    </div>
                                                                    :
                                                                    <></>
                                                            }
                                                        </div> : <p>Choose a date to see the screens.</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <br />
                    <br />
                    <fieldset>
                        <div className="container-fluid px-0 px-sm-4 mx-auto">
                            <div className="row justify-content-center mx-0">
                                <div className="col-lg-10">
                                    <div className="card border-0">
                                        <div className="card-header" style={{ backgroundColor: "#4e5b60" }}>
                                            <div className="mx-0 mx-b row justify-content-sm-center justify-content-start px-1">
                                                <h1 className="header_text" style={{ color: "antiqueWhite" }}>CHOOSE A TIME: </h1>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row text-center">
                                                <div className="card-body">
                                                    <div className="row text-center">
                                                        {
                                                            this.state.screenChosen !== "" ? this.getMovieTimes() :
                                                                <p> Choose a screen to see the screening times </p>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <br />
                    <br />

                    <nav>
                        <div className="container text-center">
                            
                            <button className="tab_background text mr-3 btn-lg">MOVIE</button>
                            <button className="tab_background text mr-3 btn-lg" onClick={this.goToSeatMap}>SEATS</button>
                            <button className="tab_background text mr-9 btn-lg">CHECKOUT</button>
                           
                        </div>
                    </nav>
                    <br />
                    <br />
                    <br />
                    {/* <footer className="bg-light text-center">
    <div class="text-center p-3" style={{ backgroundcolor: 'rgba(0, 0, 0, 0.2)' }}>
        All rights reserved. © 2021 Copyright:
    <a className="text-dark" >The Big Picture</a>
    </div>
    </footer> */}
                    
                </body>
            </React.Fragment >
        )
    }
}

export default BookTickets;


