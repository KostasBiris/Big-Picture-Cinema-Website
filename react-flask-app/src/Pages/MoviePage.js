import React from 'react'
var publicIP = require('public-ip')
//Generic component for individual Movie Pages.
class MoviePage extends React.Component {
    constructor(props) {
        super(props);
        this.title = props.match.params.title;
        this.state = {IP: null, auth: false};
        //Bind our method.
        this.getData = this.getData.bind(this);
        this.getClientIP = this.getClientIP.bind(this);
        //By default the state is an empty array.
        this.state = { data: [] };
        //Call our method.
        this.getData();
        this.getClientIP();

    }
    getClientIP = () => {
        (async () => {
            this.setState({IP: await publicIP.v4()})
        })();

    }
    //Method for getting the data of the specific requested movie.
    getData = () => {
        //Invoke a request to our rest API to get the data of the movie.
        var fet = '/movie/' + this.title + '/page';
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
    }
    render() {
        return (

            <div>
                Movie Name: {this.state.data.name}<br />
                Blurb: {this.state.data.blurb}<br />
                Director: {this.state.data.director}<br />
                Lead Actors: {this.state.data.leadactors}<br />
                Release Date: {this.state.data.releasedate}<br />
                Certificate: {this.state.data.certificate}<br />

            </div>
        )
    }
}



export default MoviePage;