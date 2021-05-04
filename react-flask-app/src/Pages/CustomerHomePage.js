import React from 'react';
import main from '../static/main.css';
import aa1 from '../static/aa1.png';
import aa2 from '../static/aa2.png';
import aa3 from '../static/aa3.png';
global.jQuery = require('jquery');
require('bootstrap');
var publicIP = require('public-ip');

let interval;
//Component for the main page of the customers.
class CustomerHomePage extends React.Component {
    constructor(props) {
        super(props);
        //By default the state is a blank query.
        this.state = {query: '', IP: null, auth: false, response: undefined , movies: null, date:''};
        //Bind our methods.
        this.getRandomPosters = this.getRandomPosters.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    reformatd = (inp) => {
        let dArr = inp.split("-");
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0];

    }

    async componentDidMount() {
        this.getSomeMovies();
    }

    // get movies to be displayed in home screen
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

    // handle click to movie page
    handleClick = (e, movie) => {
        e.preventDefault();
        var go = '/movie/' + movie.original_title.split(' ').join('_') + '/' + movie.id;
        this.props.history.push(go, this.state);
    } 


    //Get some random movie posters (from the upcoming movies!)
    getRandomPosters = () => {
        
        let indexes = [];
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
                        <div class="col-lg-3 col-md-4 hover01">
                            <center>
                    <div className=".col-sm-5 .col-md-6">
                            <figure><img onClick={(e) => {
                                this.handleClick(e, movies[i])}
                                } className="img-fluid image_box" src={'https://image.tmdb.org/t/p/w500/' + movies[i].poster_path} alt=""/></figure>
                        </div>
                        </center>
                        </div>
                    );
                
            })}
            </div>
            </div>
            );
    }



    render() {
            return (
                <React.Fragment>
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
                    <div className="header_text">
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
                    </body>
                    </React.Fragment>
            );
    }
}

export default CustomerHomePage;

