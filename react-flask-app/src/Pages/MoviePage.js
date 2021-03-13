import React from 'react'
import SearchIMDB from '../components/SearchIMDB';

var publicIP = require('public-ip')
//Generic component for individual Movie Pages.

class MoviePage extends React.Component {
    constructor(props) {
        super(props);
        this.title = props.match.params.title;
        this.movieID = props.match.params.movieID;
        this.state = {IP: null, auth: false, returnedData: []};
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
    }
    //     //Invoke a request to our rest API to get the data of the movie.
    //     var fet = '/movie/' + this.title + '/page';
    //     fetch(fet, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ movie: this.title })
    //     })
    //         .then(response => response.json()).then(data => {
    //             this.setState({ data: data })
    //         });
    // }
    render() {
        return (
            
            <div>
                <SearchIMDB onGetMovie={this.getMovieData} movieName={this.title} 
                getAllMovies={'False'} movieID={this.movieID}/>
                <img src={this.state.returnedData.Poster} alt={this.props.Title} width="200" height="200"></img><br />
                Movie Name: {this.state.returnedData.Title}<br />
                Blurb: {this.state.returnedData.Plot}<br />
                {/* Director: {this.state.data.director}<br />
                Lead Actors: {this.state.data.leadactors}<br />
                Release Date: {this.state.data.releasedate}<br />
                Certificate: {this.state.data.certificate}<br /> */}

            </div>
        )
    }
}



export default MoviePage;