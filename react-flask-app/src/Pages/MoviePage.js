import React from 'react'
import SearchIMDB from '../components/SearchIMDB';
import search from '../static/search.png'
import logo from '../static/finlogo.png'
import headerbanner from '../static/headerbanner.png'
import follow from '../static/follow.png'
import usericon from '../static/usericon.png'
import poster1 from '../static/poster1.jpg'
import poster2 from '../static/poster2.jpg'
import poster3 from '../static/poster3.jpg'
import poster4 from '../static/poster4.jpg'
import poster5 from '../static/poster5.jpg'
import poster6 from '../static/poster6.jpg'
import poster7 from '../static/poster7.jpg'
import left from '../static/left.png'
import right from '../static/right.png'
import main from '../static/main.css';

var publicIP = require('public-ip')
//Generic component for individual Movie Pages.

class MoviePage extends React.Component {
    constructor(props) {
        super(props);
        this.title = props.match.params.title;
        this.movieID = props.match.params.movieID;
        this.state = {IP: null, auth: false, returnedData: [], directors: [], actors: [], writers: [], genres: [], movieURL: ''};
        //Bind our method.
        this.getMovieData = this.getMovieData.bind(this);
        this.getClientIP = this.getClientIP.bind(this);
        //Call our method.
        this.getMovieData();
        this.getClientIP();
    }
    getClientIP = () => {
        (async () => {
            this.setState({IP: await publicIP.v4()})
        })();

    }

    //Method for getting the data of the specific requested movie.
    getMovieData = (data) => {
        this.setState({ returnedData : data})
        let directors = []
        let actors = []
        let writers = []
        let genres = []
        let video = []
        if(this.state.returnedData.credits){
            this.state.returnedData.credits.crew.forEach(function(entry){
                    if (entry.job === 'Director') {
                        directors.push(entry.name);
                    }
                    else if (entry.job === 'Writer') {
                        writers.push(entry.name);
                    }
                })
            this.state.returnedData.credits.cast.forEach(function(entry){
                if (entry.known_for_department == 'Acting'){
                    actors.push(entry.original_name)
                }
            })
            this.setState({directors: directors});
            this.setState({actors: actors});
            this.setState({writers: writers});
        }
        else
            console.log("not working");
        if(this.state.returnedData.credits){
            this.state.returnedData.genres.forEach(function(entry){
                    genres.push(entry.name);
                })
            this.setState({genres: genres});
        }
        if(this.state.returnedData.videos)
            this.state.returnedData.videos.results.forEach(function(entry){
            video.push(entry.key);
            })
        // this.setState({videoKeys : video[0]});
        this.setState({movieURL: "https://www.youtube.com/watch?v="+video[0]})

    }
        // to fetch from our database
        //Invoke a request to our rest API to get the data of the movie.
        /*var fet = '/movie/' + this.title + '/page';
        fetch(fet, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movie: this.title })
        })
            .then(response => response.json()).then(data => {
                this.setState({ data: data })
            });
    }*/
    render() {
        return (
            <React.Fragment>
                <head>
                    <link rel="stylesheet" type="text/css" href={main} />
                </head>

                {/* call SearchIMDB to get movie data     */}
                <SearchIMDB onGetMovie={this.getMovieData} movieName={this.title} getAllMovies={'False'} movieID={this.movieID}/>
                <div className="header_text"></div>
                    <h1 style = {{position:'absolute', left:'5rem', color: '#4e5b60' }}>{this.state.returnedData.original_title}</h1>
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <h2 className="text" style={{position:'absolute', left:'35rem', color:'#4e5b60'}}>Movie Description</h2>
                    <br /><br />
                    <h2 className="text_description" style={{position:'absolute'}}> {this.state.returnedData.overview} </h2>
                    <img className="movie_page" src={'https://image.tmdb.org/t/p/w500/' + this.state.returnedData.poster_path} style={{left: '5rem'}}/>
                    <div className="text"></div>
                    <table className="position_table">
                            <tr>
                            <th>Director/s: </th>
                            <td data-th="Director/s">{this.state.directors.join(', ')}</td>
                            </tr>
                         <tr>
                         <th>Writer/s: </th>
                        <td data-th="Writer/s">{this.state.writers.join(', ')}</td>
                        </tr>
                        <tr>
                        <th>Actors: </th>
                        <td data-th="Actors">{this.state.actors.join(', ')}</td>
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
                        <td data-th="Genre">{this.state.genres.join(', ')}</td>
                        <tr>
                        <th>Rating: </th>
                        <td data-th="Certificate">{this.state.returnedData.vote_average}</td>
                        </tr>
                    </table>
                    <br /><br />
                    <div>
                        <br />
                    <div className="video_frame">
                            <iframe width="600px" height="335px" src = {this.state.movieURL}>
                            </iframe>
                    </div>
                    <div class="text">
                        <button className="tab_background" style={{position:'absolute',top:'80%',left:'1300px',width:'180px',height:'60px'}}>BOOK TICKETS</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}



export default MoviePage;