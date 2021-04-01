import React from 'react';
import search from '../static/search.png';
import logo from '../static/finlogo.png';
import headerbanner from '../static/headerbanner.png';
import follow from '../static/follow.png';
import usericon from '../static/usericon.png';
import main from '../static/main.css';
import { shiftLeft, shiftRight } from './scripts/scripts'
import Search from '../components/Search';
import { BrowserRouter, Route } from 'react-router-dom';
import aa1 from '../static/aa1.png';
import aa2 from '../static/aa2.png';
import aa3 from '../static/aa3.png';
import poster13 from '../static/poster13.png';
import poster14 from '../static/poster14.jpg';
import poster8 from '../static/poster8.jpg';
import poster9 from '../static/poster9.jpg';
import moment from 'moment'
import DatePicker from 'react-datepicker';

var publicIP = require('public-ip')

let interval;
//Component for the main page of the customers.
class CustomerHomePage extends React.Component {
    constructor(props) {
        super(props);
        //By default the state is a blank query.
        this.state = {query: '', IP: null, auth: false, response: undefined , movies: null, date:''};
        //Bind our methods.
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleAccount = this.handleAccount.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.getClientIP = this.getClientIP.bind(this);
        this.assertAuth = this.assertAuth.bind(this);
        this.stepUp = this.stepUp.bind(this);
        this.getSomeMovies = this.getSomeMovies.bind(this);
        this.getRandomPosters = this.getRandomPosters.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    reformatd = (inp) => {
        let dArr = inp.split("-");
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0];

    }



    getClientIP = () => {
        (async () => {
            this.setState({ IP: await publicIP.v4() })
        })();
    }

    stepUp = async (flag) => {
        await (async () => {
            this.setState({ IP: await publicIP.v4() })
        })();
        if (flag) {
            this.assertAuth();
        }
        
        
    }

    isAuth = () => {
        if (this.props.location !== undefined) {
            if (this.props.location.state !== undefined) {
                if (this.props.location.state.auth === true) {
                    this.auth = true;
                    this.props.location.state.auth = false;
                    this.state.IP = this.props.location.state.IP;
                    return true;
                }
            }
        }
    
        if (this.state.response === "error" || this.state.response === undefined || this.auth === false) {
            // console.log(this.state.response);
            return false;
        }
        return true;
    }

    async componentDidMount() {
        window.addEventListener('load', this.stepUp);
        
        const _jquery = document.createElement("script");
        _jquery.src = "https://code.jquery.com/jquery-3.2.1.slim.min.js";
        _jquery.async = true;
        _jquery.integrity = "sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN";
        _jquery.crossOrigin = "anonymous";
        await document.body.appendChild(_jquery);

        const _popper = document.createElement("script");
        _popper.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js";
        _popper.async = true;
        _popper.integrity = "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q";
        _popper.crossOrigin = "anonymous";
        await document.body.appendChild(_popper);

        const _bootstrap = document.createElement("script");
        _bootstrap.src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
        _bootstrap.async = true;
        _bootstrap.integrity ="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl";
        _bootstrap.crossOrigin ="anonymous";
        await document.body.appendChild(_bootstrap);

        this.getSomeMovies();

        // console.log(this.state);


        interval = setInterval(() => {
            if (this.IP !== null) {
                this.assertAuth();
            }
        }, 5000)

    }

    componentWillUnmount = () => {
        window.removeEventListener('load', this.stepUp(true));
        clearInterval(interval);
    }


    assertAuth = () => {
        if (this.state.IP === null) {this.stepUp(false)}
        var go = '/insession/' + this.state.IP;
        fetch(go, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json()).then(data => {
                this.setState({ response: data.response })
            })
    };

    //Method for handling a change in the search query field.
    handleSearchChange = (e) => {
       // e.preventDefault();
        //Update the state to represent the changes to the field.
        this.setState({ query: e.target.value });
    }

    //Method for handling submitting a search query.
    //Called when the submit button is pressed.
    handleSubmit = (e) => {
        //e.preventDefault();
        //Redirect the route to execute the search query.
        var go = ''

        try {
            go = '/search/' + this.state.query.split(' ').join('_');
            this.props.history.push(go, this.state);
        }
        catch (error) // TypeError is catched story is undefined == Very likely that it is a redirection attempt
        {
            console.log('catched the error!')
            // console.log(this.props.props)
            // this.props.props.history.go(2);     // Moves the pointer in the history stack by n entries
            // go = '/search/' + this.state.query.split(' ').join('_');
            // this.props.props.history.push(go);
        }

    }

    handleSubmitDate = (e) => {
        e.preventDefault();
        if (this.state.date!== '') {
            this.props.history.push('/searchscreenings/' + this.state.date);
        }

    }


    handleDate = (e) => {
        // e.preventDefault();
        // console.log(e.target.value)

        function formatd(inp) {
            let dArr = inp.split("-");  // ex input "2010-01-18"
            return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"

        }
        if (e.target.value)
            this.setState({ date: formatd(e.target.value) });
    }

    //Method for handling the login button.
    //Called when it is pressed.
    handleLogin = (e) => {
        // e.preventDefault();
        //Redirect the route to the login page/
        this.props.history.push('/login');
    }

    handleRegister = (e) => {
        this.props.history.push('/register');
    }

    handleAccount = (e) => {
        this.props.history.push('/account');
    }

    handleLogout = (e) => {

        var go = '/logout/' + this.state.IP;

        fetch(go, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(() => this.setState({ response: undefined }))

    }


    async getSomeMovies () { 
        await fetch('/upcoming', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(response => response.json()).then(data => {
            this.setState({movies: Object.values(data.movies) })
        })
        // console.log(this.state.movies);
    }


    handleClick = (e, movie) => {
        e.preventDefault();
        var go = '/movie/' + movie.original_title.split(' ').join('_') + '/' + movie.id;
        this.props.history.push(go, this.state);
    } 

    getRandomPosters = () => {
        
        let indexes = [];
        // console.log(this.state);
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        let i;
        let movies = [];
        this.state.movies.forEach(function (entry) {
            movies.push(entry);
        })
        for (i = 0; i <movies.length; i++) {
            let a = getRandomInt(movies.length);
            indexes.push(i);
        }
        // console.log(indexes);
        return (
            <div className="container">
            <div className="row">
                {indexes.map(i => {
                    return (
                    <div className="col-lg-3 col-md-4 hover01">
                        <div className="col-md-2 col-md-offset-1">
                            <figure><img onClick={(e) => {
                                this.handleClick(e, movies[i])}
                                } className="img-fluid new_movies" src={'https://image.tmdb.org/t/p/w500/' + movies[i].poster_path} alt=""/></figure>
                        </div>
                        

                    </div>
                    );
                
            })}
            </div>
            </div>
            );
    }



    render() {
        // console.log(this.state);
        if (this.isAuth()) {
            return (
                <body>
                    <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    </head>
                    <body id = 'grad1'>
                        
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
                            <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src={aa1} alt="First slide"/>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={aa2} alt="Second slide"/>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={aa3} alt="Third slide"/>
                            </div>    
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <br/>
                    <div class="header_text">
                        <h1 style={{position:'absolute', left:'25px', color: '#4e5b60', fontWeight: 'bold'}}>PLAYING NOW</h1>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    {this.state.movies !== null ? this.getRandomPosters() : <></>}

                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <br/>
                    <br/>
                    <footer className="bg-light text-center">
                        <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                            All rights reserved. © 2021 Copyright:
                            <a className="text-dark" >The Big Picture</a>
                        </div>
                    </footer>
                    </body>
                </body>
            );
        } else {

            return (
                <body>
                    <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    </head>
                    <body id = 'grad1'>

                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
                            <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src={aa1} alt="First slide"/>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={aa2} alt="Second slide"/>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={aa3} alt="Third slide"/>
                            </div>    
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <br/>
                    <div class="header_text">
                        <h1 style={{position:'absolute', left:'25px', color: '#4e5b60', fontWeight: 'bold'}}>PLAYING NOW</h1>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    {/*this.getRandomPosters()*/}
                    {this.state.movies !== null ? this.getRandomPosters() : <></>}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <footer className="bg-light text-center">
                        <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                            All rights reserved. © 2021 Copyright:
                            <a className="text-dark" >The Big Picture</a>
                        </div>
                    </footer>
                    </body>
                </body>
            );
        }
    }
}

export default CustomerHomePage;

