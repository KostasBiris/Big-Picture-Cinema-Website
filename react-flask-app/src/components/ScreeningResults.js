import React from 'react';
import Banner from '../components/Banner';
import SearchResult from './SearchResult';
import main from '../static/main.css';




class ScreeningResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = { date: this.props.match.params.query, screenings: [], movies: [] }
        this.moviesToCards = this.moviesToCards.bind(this);
        this.fetchMovies = this.fetchMovies.bind(this);

    }

    componentDidMount() {
        this.fetchMovies();
    }

    //Method that fetches movies on the specified date.
    async fetchMovies() {
        await fetch('/searchdates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: this.state.date })
        }).then(response => response.json()).then(data => {
            this.setState({ screenings: Object.values(data.screenings), movies: Object.values(data.movies) })
            // console.log(data)
        })
    }

    //Method for returning search results as cards.
    moviesToCards = () => {
        return (
            <div>
                {this.state.movies.map(entry => {
                    return (
                        <SearchResult res={entry} history = {this.props.history}/>
                    )
                })}
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
            <body id="grad1">
                <Banner history = {this.props.history}/>
                <body id="grad1">
                    {this.moviesToCards()}
                </body>
            </body>
            </ React.Fragment>
        );
    }
}

export default ScreeningResults;