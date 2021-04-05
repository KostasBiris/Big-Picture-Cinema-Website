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
                      isUpcoming: false
                    };
        //Bind our method.
        this.getMovieData = this.getMovieData.bind(this);
        this.getClientIP = this.getClientIP.bind(this);
        this.goBookTickets = this.goBookTickets.bind(this);
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
                console.log(this.state.returnedData);
                
            });



        
        // fetch('/isupcoming', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({data: this.state.returnedData.internalid})
        // })
        // .then(response => response.json()).then(data =>{
        //     this.setState({isUpcoming: data})
        // })

    }
        

    goBookTickets = (e) => {
        if (this.props.isEmployee)
            this.props.history.push('/ebook', this.state);
        else
            this.props.history.push('/book', this.state);
        
    }


    render() {
        console.log(this.state.isUpcoming);
        return (
            <React.Fragment>
                <head>
                    <link rel="stylesheet" type="text/css" href={main} />
                </head>
                <div className="header_text"></div>
                    <h1 style = {{position:'absolute', left:'5rem', color: '#4e5b60' }}>{this.state.returnedData.original_title}</h1>
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <h2 className="text" style={{position:'absolute', left:'35rem', color:'#4e5b60'}}>Movie Description</h2>
                    <br /><br />
                    <h2 className="text_description" style={{position:'absolute'}}> {this.state.returnedData.blurb} </h2>
                    <img className="movie_page" src={'https://image.tmdb.org/t/p/w500/' + this.state.returnedData.poster_path} style={{left: '5rem'}}/>
                    <div className="text"></div>
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
                    </table>
                    <br /><br />
                    <div>
                        <br />
                    <div className="video_frame">
                            <iframe width="600px" height="335px" src = {"https://www.youtube.com/embed/" + this.state.returnedData.youtube_key + "/?controls=1"}>
                            </iframe>
                    </div>
                    {
                        this.state.returnedData.isupcoming ?  <div class="text">
                        <button onClick={this.goBookTickets} className="tab_background" style={{position:'absolute',top:'80%',left:'1300px',width:'180px',height:'60px'}}>BOOK TICKETS</button>
                    </div>
                    :
                    <></>



                    }
                   
                </div>
            </React.Fragment>
        )
    }
}



export default MoviePage;