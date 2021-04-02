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
            <body>
                <head>
                <link rel="stylesheet" type="text/css" href={main} />
                <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                </head>
                <Banner history = {this.props.history}/>
                <body id="grad1">
                    {this.moviesToCards()}
                </body>
            </body>

        );
    }
}

export default ScreeningResults;