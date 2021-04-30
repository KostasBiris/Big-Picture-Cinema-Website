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
        this.getClientIP();
    }
    getClientIP = () => {
        (async () => {
            this.setState({IP: await publicIP.v4()})
        })();

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

    
    goBookTickets = (e) => {
        if (this.props.isEmployee)
            this.props.history.push('/ebook', this.state);
        else
            this.props.history.push('/book', this.state);
        
    }

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
                </head>
                <div className="header_text"></div>
                    <h1 style = {{position:'absolute', left:'25px', color: '#4e5b60', fontWeight:'bold' }}>{this.state.returnedData.original_title}</h1>
                    {/* <br /><br /><br /><br /><br /><br /><br /><br />
                    <h2 className="text" style={{position:'absolute', left:'35rem', color:'#4e5b60'}}>Movie Description</h2>
                    <br /><br />
                    <h2 className="text_description" style={{position:'absolute'}}> {this.state.returnedData.blurb} </h2>
                    */}<div className="column" style={{position:'relative', left:'25px'}}>
                        <img className="poster poster_movies" src={'https://image.tmdb.org/t/p/w500/' + this.state.returnedData.poster_path} style={{left: '5rem', position: 'relative'}}/>

                    </div> 
                    <div className="container">
                        <div className="row">
                            <div className="border-dark card-sm-center position_table" style={{position:'absolute', left:'22rem', top:'15rem'}}>
                                <div className="card-header">
                                    Movie Description
                                </div>
                                <div className="card-body text-dark">
                                    <p className="card-text">
                                    {this.state.returnedData.blurb}
                                    </p>
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
                    <br></br>
                    <div className="row">
                    <table className="table table-sm-center table-dark position_table" style={{position:'absolute', left:'22rem', top:'27rem'}}>
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
                    <br/>
                    <br/>
                    <br/>
                    <div className="embed-responsive embed-responsive-21by9">
                        
                    </div>
                    {/* <div className="text"></div>
                    <table className="position_table">
                            <tr>
                            <th>Director/s: </th>
                            <td data-th="Director/s">{this.state.returnedData.director}</td>
                            </tr>
                         <tr>
                         <th>Writer/s: </th>
                        <td data-th="Writer/s">{this.state.returnedData.writers}</td>
                        </tr>
                        <tr>
                        <th>Actors: </th>
                        <td data-th="Actors">{this.state.returnedData.leadactors}</td>
                        </tr>
                        <tr>
                        <th>Runtime: </th>
                        <td data-th="Runtime">{this.state.returnedData.runtime} mins</td>
                        </tr>
                        <tr>
                            <th>Release date: </th>
                            <td data-th="Release date">{this.state.returnedData.release_date}</td>
                        </tr>
                        <th>Genre: </th>
                        <td data-th="Genre">{this.state.returnedData.genres}</td>
                        <tr>
                        <th>Rating: </th>
                        <td data-th="Certificate">{this.state.returnedData.certificate}</td>
                        </tr>
                        <tr>
                        <th>Screenings: </th>
                        <td data-th="Screenings">{this.getScreenings()}</td>
                        </tr>
                    </table>
                    {/* Screenings:
                    {this.getScreenings()} 
                     {this.state.returnedData.screenings!==undefined ? this.getScreenings() : <></>} 
                    <br /><br />
                    <div>
                        <br />
                    <div className="video_frame">
                            <iframe width="600px" height="335px" src = {"https://www.youtube.com/embed/" + this.state.returnedData.youtube_key + "/?controls=1"}>
                            </iframe>
                    </div>
                    <br/>

                    <br/>

                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    {
                        this.state.returnedData.isupcoming ?  <div class="text">
                        <button onClick={this.goBookTickets} className="tab_background" style={{position:'absolute',top:'80%',left:'1300px',width:'180px',height:'60px'}}>BOOK TICKETS</button>
                    </div>
                    :
                    <></>



                    }
                   
                </div> */}
            </React.Fragment>
        )
    }
}



export default MoviePage;