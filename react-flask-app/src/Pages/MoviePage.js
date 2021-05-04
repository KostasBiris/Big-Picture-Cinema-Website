import React from 'react'
import SearchIMDB from '../components/SearchIMDB';
import main from '../static/main.css';

var publicIP = require('public-ip')
//Generic component for individual Movie Pages.

class MoviePage extends React.Component {
    constructor(props) {
        super(props);
        this.title = props.match.params.title;
        this.movieID = props.match.params.movieID;
        this.state = {IP: null, auth: false, 
                      returnedData: [], 
                      movieURL: '',
                      fromMoviePage: true,
                      isUpcoming: false,
                      screenings: [],
                    };
        //Bind our method.
        this.getMovieData = this.getMovieData.bind(this);
        this.getClientIP = this.getClientIP.bind(this);
        this.goBookTickets = this.goBookTickets.bind(this);
        this.getScreenings = this.getScreenings.bind(this);
        //Call our method.
        this.getMovieData();
    }
    
    componentDidMount = () => {
        window.addEventListener('load', this.getMovieData);
    }

    componentDidMount = () => {
        window.removeEventListener('load', this.getMovieData);
    }

    //Method for getting the data of the specific requested movie.
    getMovieData = () => {
        // to fetch from our database
        // Invoke a request to our rest API to get the data of the movie.
        var route = '/movie/' + this.title + '/page';
        fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movie: this.title })
        })
            .then(response => response.json()).then(data => {

                this.setState({ returnedData: data });
                this.setState({screenings: Object.values(data.screenings)})
                console.log(this.state.returnedData);
                
            });

    }

    //Function for redirecting to the book tickets page.
    goBookTickets = (e) => {
        if (this.props.isEmployee)
            this.props.history.push('/ebook', this.state);
        else
            this.props.history.push('/book', this.state);
        
    }

    //Get screenings corresponding to the movie.
    getScreenings = () => {
        var screenings = this.state.screenings;
        return (
            <ul>
                {screenings.map(s => {
                    return (
                        <li>{s.date}, {s.time}, {s.screenid}</li>
                    );
                })}
            </ul>
        );
    }

    render() {
        // console.log(this.state.isUpcoming);
        return (
            <React.Fragment>
                 <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    </head>
                    <body id = 'grad1'>
                <div className="header_text"></div>
                    <h1 style = {{position:'absolute', left:'25px', color: '#4e5b60', fontWeight:'bold' }}>{this.state.returnedData.original_title}</h1>
                    <div className="column" style={{position:'relative', left:'25px'}}>
                        <img className="poster poster_movies" src={'https://image.tmdb.org/t/p/w500/' + this.state.returnedData.poster_path} style={{left: '5rem', position: 'relative'}}/>

                    </div> 
                    <div className="container-fluid px-0 px-sm-4 mx-auto" style={{position:'relative', left:'12rem', top:'14rem', maxWidth:'15rem'}}>
                            <div className="row justify-content-center ">
                                <div className="col-lg-10">
                                    <div className="card ">
                                        <div className="card-header" style={{ backgroundColor: "#4e5b60" }}>
                                            <div className="row justify-content-sm-center justify-content-start" >
                                                <h1 className="header_text" style={{ color: "antiqueWhite" }}>Movie Discription: </h1>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row text-center">
                                                <div className="card-body">
                                                    
                                    {this.state.returnedData.blurb}
                                    
                                    {
                                        this.state.returnedData.isupcoming ?   
                                            <button onClick={this.goBookTickets}  className="buttons_background rounded-pill">BOOK TICKETS</button> 
                                        : 
                                            <></>
                                    }
                             </div>
                             </div>
                                                </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                    <br></br>/*
                    <div className="row">
                    <table className="table table-sm-center table-dark" style={{position:'relative', left:'21rem', top:'30rem', maxWidth:'fit-content'}}>
                            <tr>
                                <th scope="col">
                                    Director(s):
                                </th>
                                <td data-th = "Director(s)">{this.state.returnedData.director}</td>

                            </tr> 
                            <tr>
                                <th scope="col">
                                        Writer(s):
                                </th>
                                <td data-th = "Writer(s)">{this.state.returnedData.writers}</td>
                            </tr>  
                            <tr>
                                <th scope="col">
                                    Actors:
                                </th>

                                    <td data-th = "Actors">{this.state.returnedData.leadactors}</td>
                            </tr>
                            <tr>
                                <th scope="col">
                                    Runtime:
                                </th>
                                <td data-th = "Runtime">{this.state.returnedData.runtime} mins</td>
                            </tr>
                            <tr>
                                <th scope="col">
                                    Release Date:
                                </th>
                                <td data-th = "ReleaseDate">{this.state.returnedData.release_date}</td>
                            </tr>
                            <tr>
                                <th scope="col">
                                    Genres:
                                </th>
                                <td data-th = "Genres">{this.state.returnedData.genres}</td>
                            </tr>
                            <tr>
                                <th scope="col">
                                    Certificate:
                                </th>
                                <td data-th = "Certificate">{this.state.returnedData.certificate}</td>
                            </tr>
                    </table>

                    </div>
                
                    <br/>
                    <div className="embed-responsive embed-responsive-21by9">
                        
                    </div>
                    <br/>
                    <br/>
                    </body>
            </React.Fragment>
        )
    }
}



export default MoviePage;