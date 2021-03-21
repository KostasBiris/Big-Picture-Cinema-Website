import React from 'react'
import main from '../static/main.css';
import poster8 from '../static/poster8.jpg'
import SeachIMDB from '../components/SearchIMDB';
import Banner from '../components/Banner';
import Select from 'react-select';

let interval;
class BookTickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateChosen: '',
            //   moviesPlaying: [], // stores array of movies currently playing
            //   moviesPosters: [], // stores array of posters of movies currently playing
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
        // this.displayMovies = this.displayMovies.bind(this);
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

        }).then(response => response.json()).then(data => {
            this.setState({ screenings: Object.values(data.screenings), movies: Object.values(data.movies) })
            console.log(data)
        })
    }

    componentDidMount() {
        window.addEventListener('load', this.seekData);
    }
    componentWillUnmount() {
        window.removeEventListener('load', this.seekData)
    }



    handleDate = (e) => {
        // e.preventDefault();
        // console.log(e.target.value)
        if (e.target.value)
            this.setState({ dateChosen: e.target.value });
    }

    handleTime = (data) => {
        // e.preventDefault();
        console.log("The time value is ")
        this.setState({ timeChosen: data })
    }
    handleMovie = (e) => {
        // e.preventDefault();
        if (e.target.id)
            this.setState({ movieChosen: e.target.id });
    }

    handleScreen = (e) => {
        //e.preventDefault();
        this.setState({ screenChosen: e.target.value, timeChosen: '' });

        //console.log(this.state);
    }

    // fetch movies from db that are currently playing and render them.
    // displayMovies = (data) => {
    //     console.log(data);
    //     this.setState({moviesPlaying : data})
    //     let moviesPosters = [];

    //     if (this.state.moviesPlaying.results){
    //         this.state.moviesPlaying.results.forEach(function(entry){
    //             moviesPosters.push(entry.poster_path);
    //         })


    //         this.setState({moviesPosters : moviesPosters});
    //         // console.log(this.state.moviesPosters);
    //     }
    // }

    // filters out the times of the movieChosen and these are used to be rendered.
    getMovieTimes = () => {
        // getting the data before going into if statement or 'this' wont be recognised
        let m = parseInt(this.state.movieChosen)
        let date_chosen_day = this.state.dateChosen.split("-")[2]
        let times = [];
        let screenid = parseInt(this.state.screenChosen);
        if (this.state.screenings.length > 0) {
            this.state.screenings.forEach(function (entry) {
                // get the day for each of the entries
                let movie_date_day = entry.date.split("-")[0]

                if (parseInt(movie_date_day) == parseInt(date_chosen_day)) {
                    if (entry.id == m) {
                        if (entry.screenid == screenid) {
                            times.push(entry.time)
                        }

                    }
                }
            })
        }
        console.log(times)


        const options = times.map(v => ({
            label: v,
            value: v
        }));
        return (
            <div style={{ width: this.state.timeChosen ? '100px' : '1000px' }}>
                <Select onChange={this.handleTime} value={this.state.timeChosen} options={options} placeholder="time" name="times" />
            </div>
        )

        // render movie times
        /*times.map( ( time, index ) => {
            return (
                // <Select value = {times}  onChange={this.handleTime} options={times}  placeholder="time" name="times" />
                <div onClick={this.handleTime} className="col-md-2 col-4 my-1 px-2 time-input">
                    <label for={index} value={time} > {time}AM/PM </label>
                    <input type="radio" id ={index} className="cell py-1"></input>
                </div>
                );
        })*/

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

    goNextPage = () => {
        console.log(this.state)
        let go = ''
        //     if (this.state.screenChosen && this.state.dateChosen && this.state.movieChosen && this.state.timeChosen){   // quick validation before next page
        //         go = this.props.history.location.pathname + this.screenChosen; // get the current url and add the next direction
        //         console.log(go);
        //         this.props.history.push(go, this.state);
        //     }
        //     else
        //         alert('one of the fields in your booking is empty! Please fill every field to continue to the next page.')
    }



    render() {
        console.log(this.state);

        // let movieT;
        // if (this.state.dateChosen != ''){
        //     movieT = this.getMovieTimes();
        // }
        // else{
        //     movieT = <p> Choose a movie to see the screening times </p>;
        // }


        return (
            <React.Fragment>
                <head>
                    <link rel="stylesheet" type="text/css" href={main} />

                </head>
                <Banner props={this.props} />
                <div className="header_text">
                    <h1 style={{ position: 'absolute', left: '25px', color: '#4e5b60' }}>CHOOSE A MOVIE: </h1>
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
                                            // this.props.history.location.state.fromMoviePage ? 
                                            //     index == (this.state.moviesPosters.length - 1) ?

                                            //         <input type="radio" name="gender" className="sr-only" id={index} checked={true}/>
                                            //         <label for={index}>
                                            //             <figure><img id={index} onClick={this.handleMovie} className="image_box" 
                                            //                     src={'https://image.tmdb.org/t/p/w500/' + poster} className="new_movies" 
                                            //                     style={{position: 'relative'}} />
                                            //             </figure>
                                            //         </label>

                                            //         : 

                                            //         <input type="radio" name="gender" className="sr-only" id={index} checked={true}/>
                                            //         <label for={index}>
                                            //             <figure><img id={index} onClick={this.handleMovie} className="image_box" 
                                            //                     src={'https://image.tmdb.org/t/p/w500/' + poster} className="new_movies" 
                                            //                     style={{position: 'relative'}} />
                                            //             </figure>
                                            //         </label>

                                            // :
                                            <>
                                                <input type="radio" name="gender" className="sr-only" id={index} />
                                                <label for={index}>
                                                    <figure><img id={(index + 1)} onClick={this.handleMovie} className="image_box"
                                                        src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} className="new_movies"
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
                <div className="header_text">
                    <h1 style={{ position: 'absolute', left: '25px', color: '#4e5b60' }}>CHOOSE DATE: </h1>
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
                                            <input type="date" onChange={this.handleDate} value={this.state.dateChosen} disabled={this.state.movieChosen.length === 0 ? "disabled" : ""} />
                                            <span className="fa fa-calendar"></span>
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
                    <h1 style={{ position: 'absolute', left: '25px', color: '#4e5b60' }}>CHOOSE SCREEN: </h1>
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
                                            {
                                                this.state.movieScreens ? this.getMovieScreens(this.state.movieScreens) :
                                                    <p> Choose a movie to see the screening times </p>
                                            }
                                            {
                                                this.state.dateChosen ?
                                                    <div className="row text-center mx-0">
                                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                                            <label for="1">SILVER SCREEN 1</label>
                                                            <input type="radio" id="1" className="cell py-1" name="screen" value="1" onClick={this.handleScreen}></input>
                                                        </div>
                                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                                            <label for="2">SILVER SCREEN 2</label>
                                                            <input type="radio" id="2" className="cell py-1" name="screen" value="2" onClick={this.handleScreen}></input>
                                                        </div>
                                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                                            <label for="3">SILVER SCREEN 3</label>
                                                            <input type="radio" id="3" className="cell py-1" name="screen" value="3" onClick={this.handleScreen}></input>
                                                        </div>
                                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                                            <label for="4">VMAX SCREEN</label>
                                                            <input type="radio" id="4" className="cell py-1" name="screen" value="4" onClick={this.handleScreen}></input>
                                                        </div>
                                                        <div className="col-md-2 col-4 my-1 px-2 time-input">
                                                            <label for="5">GOLDEN SCREEN</label>
                                                            <input type="radio" id="5" className="cell py-1" name="screen" value="5" onClick={this.handleScreen}></input>
                                                        </div>
                                                    </div> : <p>Choose a date to see the screens.</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="container-fluid px-0 px-sm-4 mx-auto">
                        <div className="row justify-content-center mx-0">
                            <div className="col-lg-10">
                                <div className="card border-0">
                                    <div className="card-header bg-dark">
                                    </div>
                                    <div className="card-body p-3 p-sm-5">
                                        <div className="row text-center mx-0">
                                            <div className="header_text">

                                                <h1 style={{ position: 'absolute', left: '25px', color: '#4e5b60' }}>CHOOSE TIME: </h1>
                                            </div>

                                            <div className="card-body p-3 p-sm-5">
                                                <div className="row text-center mx-0">
                                                    {
                                                        this.state.screenChosen !== "" ? this.getMovieTimes() :
                                                            <p> Choose a screen to see the screening times </p>
                                                    }
                                                    {/* <div className="col-md-2 col-4 my-1 px-2 time-input">
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
</div> */}
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
                <div onClick={this.goNextPage} className="bottom-right">
                    <button className="a1 next btn btn-primary btn-large">Next &raquo;</button>
                </div>
                <br />
                <br />
                <footer className="bg-light text-center">
                    <div class="text-center p-3" style={{ backgroundcolor: 'rgba(0, 0, 0, 0.2)' }}>
                        All rights reserved. © 2021 Copyright:
                <a className="text-dark" >The Big Picture</a>
                    </div>
                </footer>
            </React.Fragment>
        )
    }
}

export default BookTickets


