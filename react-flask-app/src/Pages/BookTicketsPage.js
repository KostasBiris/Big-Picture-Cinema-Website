import React from 'react'
import main from '../static/main.css';
import poster8 from '../static/poster8.jpg'
import SeachIMDB from '../components/SearchIMDB';
import Banner from '../components/Banner';

let interval;
class BookTickets extends React.Component{
    constructor(props) {
        super(props);
        this.state = {dateChosen: '',
                      moviesPlaying: [], // stores array of movies currently playing
                      moviesPosters: [], // stores array of posters of movies currently playing
                      movieChosen: [],   // stores the movie chosen by the user
                      movieTimes: [],
                      movieScreens: [],
                      timeChosen: '',
                      screenChosen: '',
                      screenings: [],
                      movies: []
                    };
        this.handleDate = this.handleDate.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleMovie = this.handleMovie.bind(this);
        this.handleScreen = this.handleScreen.bind(this);
        this.displayMovies = this.displayMovies.bind(this);
        this.getMovieTimes = this.getMovieTimes.bind(this);
        this.getMovieScreens = this.getMovieScreens.bind(this);
        this.goNextPage = this.goNextPage.bind(this);
        this.seekData = this.seekData.bind(this);
        
    }

    seekData = () => {
        fetch('/upcoming', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(response => response.json()).then(data=> this.setState({screenings: data.screenings, movies: data.movies}))
    }

    componentDidMount() {
        window.addEventListener('load', this.seekData);
    }
    componentWillUnmount() {
        window.removeEventListener('load', this.seekData)
    }



    handleDate = (e) => {
        e.preventDefault();
        if (e.target.value)
            this.setState({dateChosen : e.target.value});
    }

    handleTime = (e) => {
        e.preventDefault();
        if (e.target.timeValue)
            this.setState({timeChosen: e.target.timeValue});
    }

    handleMovie = (e) => {
        // e.preventDefault();
        if (e.target.id)
            this.setState({movieChosen: e.target.id});
    }

    handleScreen = (e) => {
        e.preventDefault();
        if (e.target.screenValue)
            this.setState({timeChosen: e.target.screenValue});
    }

    // fetch movies from db that are currently playing and render them. This function will work when we fetch our db
    displayMovies = (data) => {
        this.setState({moviesPlaying : data})
        let moviesPosters = [];

        if (this.state.moviesPlaying.results){
            this.state.moviesPlaying.results.forEach(function(entry){
                moviesPosters.push(entry.poster_path);
            })

            this.setState({moviesPosters : moviesPosters});
            // console.log(this.state.moviesPosters);
        }
    }

    // filters out the times of the movieChosen and these are used to be rendered. This function will work when we fetch our db
    getMovieTimes = (movie) => {
        let times = [];
        this.state.moviesPlaying.results.forEach(function(entry){
            times.push(entry.screening_times)
        })
        this.setState({movieTimes : times})
        
        { this.state.movieTimes.map( ( time, index ) => {
            return (
                <div onClick={this.handleTime} className="col-md-2 col-4 my-1 px-2 time-input">
                <label for={index} timeValue={time} > {time}AM </label>
                <input type="radio" id ={index} className="cell py-1"></input>
                </div>
                )
            })
        }
    }

    // filers out the screens where the movie is played. This function will work when we fetch our db
    getMovieScreens = (movie) => {
        let screens = [];
        this.state.moviesPlaying.results.forEach(function(entry){
            screens.push(entry.screen)
        })
        this.setState({movieScreens : screens})
        
        { this.state.movieScreens.map( ( screen, index ) => {
            return (
                <div onClick={this.handleScreen} screenValue={screen} className="col-md-2 col-4 my-1 px-2 time-input">
                    <label for={index}> {screen} </label>
                    <input type="radio" id ={index} className="cell py-1"></input>
                </div>
                )
            })
        }
    }

    goNextPage = () => {
        let go = ''
        if (this.state.screenChosen && this.state.dateChosen && this.state.movieChosen && this.state.timeChosen){   // quick validation before next page
            go = this.props.history.location.pathname + this.screenChosen; // get the current url and add the next direction
            console.log(go);
            this.props.history.push(go, this.state);
        }
        else
            alert('one of the fields in your booking is empty! Please fill every field to continue to the next page.')
    }

  
  
    render () {
        console.log(this.state.screenings, this.state.movies);
      return (
        <React.Fragment>
            <head>
                    <link rel="stylesheet" type="text/css" href={main} />

            </head>
            <Banner props={this.props}/>
            <SeachIMDB onGetMovie={this.displayMovies} getTranding={'True'}/>
            <div className="header_text">
            <h1 style={{position:'absolute', left:'25px', color: '#4e5b60'}}>CHOOSE A MOVIE: </h1>
            </div>
            <br />
            <br />
            <br />
            <fieldset>
                <div className="container_new">
                    <div className="hover01 column">
                        {
                        this.state.moviesPosters.length > 0 ?
                            this.state.moviesPosters.map( ( poster, index ) => {
                                return (
                                <>
                                    <input type="radio" name="gender" className="sr-only" id={index} />
                                    <label for={index}>
                                        <figure><img id={index} onClick={this.handleMovie} className="image_box" src={'https://image.tmdb.org/t/p/w500/' + poster} className="new_movies" style={{position: 'relative'}} /></figure>
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
            <div className="header_text">
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
                                        <input type="date" onChange={this.handleDate} value={this.state.dateChosen}/>
                                            <span className="fa fa-calendar"></span>
                                        </div>
                                </div>
                                <div className="card-body p-3 p-sm-5">
                                    <div className="row text-center mx-0">
                                        {/* {   WE WILL REPLACE THE CODE BELOW THIS COMMENTS BY THIS DYNAMIC CODE
                                            this.state.movieChosen ? this.state.getMovieTimes(this.state.movieChosen) : 
                                                                     <p> Choose a movie to see the screening times </p>
                                        } */}
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
            </fieldset>
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
            <br />
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
                                        {/* {   WE WILL REPLACE THE CODE BELOW THIS COMMENTS BY THIS DYNAMIC CODE
                                            this.state.movieScreens ? this.state.getMovieScreens(this.state.movieScreens) : 
                                                                     <p> Choose a movie to see the screening times </p>
                                        } */}
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <label for="1">SILVER SCREEN 1</label>
                                            <input type="radio" id ="1" className="cell py-1"></input>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <label for="2">SILVER SCREEN 2</label>
                                            <input type="radio" id ="2" className="cell py-1"></input>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <label for="3">SILVER SCREEN 3</label>
                                            <input type="radio" id ="3"className="cell py-1"></input>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <label for="4">VMAX SCREEN</label>
                                            <input type="radio" id ="4" className="cell py-1"></input>
                                        </div>
                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                            <label for="5">GOLDEN SCREEN</label>
                                            <input type="radio" id ="5" className="cell py-1"></input>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            </fieldset>
            <br />
            <div onClick={this.goNextPage} className = "bottom-right">
            <button className="a1 next btn btn-primary btn-large">Next &raquo;</button>
            </div>
            <br />
            <br />
            <footer className="bg-light text-center">
                <div class="text-center p-3" style={{backgroundcolor: 'rgba(0, 0, 0, 0.2)'}}>
                All rights reserved. © 2021 Copyright:
                <a className="text-dark" >The Big Picture</a>
                </div>
            </footer>
        </React.Fragment>
      )
    }
}
  
export default BookTickets
  