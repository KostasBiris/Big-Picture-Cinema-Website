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
                <div className="header_text row justify-content-center">
                    <h1 style = {{color: '#4e5b60', fontWeight:'bold', marginBottom:'0.5rem', marginTop:'1rem'}}>{this.state.returnedData.original_title}</h1>
                   </div>
                   {window.innerWidth > 600 ? 
                   <div className="d-flex justify-content-center">
                    
                       
                        <img className="poster_template" src={'https://image.tmdb.org/t/p/w500/' + this.state.returnedData.poster_path}/>

                            <div className="d-flex align-items-center">
                            <iframe style={{height:'20rem', width:'50rem', margin:'1rem'}} src = {"https://www.youtube.com/embed/" + this.state.returnedData.youtube_key + "/?controls=1"}>
                            </iframe>
                            </div>
                    </div>
                    : 
                    <div>

                        <div className="d-flex justify-content-center">
                            <img className="poster_template" src={'https://image.tmdb.org/t/p/w500/' + this.state.returnedData.poster_path}/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <iframe style={{height:'20rem', width:'50rem', margin:'1rem', maxWidth:'500px'}} src = {"https://www.youtube.com/embed/" + this.state.returnedData.youtube_key + "/?controls=1"}/>
                        </div>
                    </div>

                    }
                    <div className="container-fluid px-0 px-sm-4 mx-auto">
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
                                    <br></br>
                                    
                                    {
                                        this.state.returnedData.isupcoming ?   
                                            <button onClick={this.goBookTickets}  className="buttons_background">BOOK TICKETS</button> 
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
                        
                    <br></br>
                    
                    <div className="row justify-content-center">
                    <table className="table table-sm-center table-dark" style={{maxWidth:'50%'}} >
                            <tr>
                                <th scope="col">
                                    Director(s):
                                </th>
                                <td data-th = "Director(s)">{this.state.returnedData.director}</td>

                            </tr> 
                            <tr>
                                <th scope="row">
                                        Writer(s):
                                </th>
                                <td data-th = "Writer(s)">{this.state.returnedData.writers}</td>
                            </tr>  
                            <tr>
                                <th scope="row">
                                    Actors:
                                </th>

                                    <td data-th = "Actors">{this.state.returnedData.leadactors}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    Runtime:
                                </th>
                                <td data-th = "Runtime">{this.state.returnedData.runtime} mins</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    Release Date:
                                </th>
                                <td data-th = "ReleaseDate">{this.state.returnedData.release_date}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    Genres:
                                </th>
                                <td data-th = "Genres">{this.state.returnedData.genres}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    Certificate:
                                </th>
                                <td data-th = "Certificate">{this.state.returnedData.certificate}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    Screenings:
                                </th>
                                <td data-th = "Screenings">{this.getScreenings()}</td>
                            </tr>
                    </table>
                    </div>
                    </body>
            </React.Fragment>
        )
    }
}



export default MoviePage;