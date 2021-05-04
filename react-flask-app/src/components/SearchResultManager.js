import React from 'react';
import SearchIMDB from './SearchIMDB';
import '../static/main.css';

 
//Component for displaying a search result.

// const certificationDict = { 0 : '15', 1 : 'R18', 2 : 'U', 3 : 'PG', 4 : '12A', 5 : '12', 6 : '18'};
class SearchResult extends React.Component{
    constructor(props) {
        super(props);
        this.prop = this.props.res;
        //Replace spaces in the name with '_' so we can use it in the URL.
        this.name = this.prop.original_title.split(' ').join('_');
        // get the ID of the movie
        this.id = this.prop.id
        this.image = 'https://image.tmdb.org/t/p/w500/' + this.prop.poster_path
        //URL for redirection.
        this.href = '/movie/' + this.name + '/' + this.id;
        this.date = this.prop.release_date;
        this.date = this.date.split("-")[0];
        this.state = {title: '', blurb: '', certificate:'', directors:[], writers:[], actors:[], release_date:'', omdbid: -1, set: false, forscreening:false , 
        poster_path : this.prop.poster_path, runtime:'', genres: '', youtube_key:''}
        this.addMovie = this.addMovie.bind(this);
        this.stepUp = this.stepUp.bind(this);
        this.addScreening = this.addScreening.bind(this);

        // we can get certifications from https://api.themoviedb.org/3/certification/movie/list?api_key=271393256b89c9461c48c1688804f774
        // this can be pasted in browser to see output
    }

    componentDidMount =() => {
        if (this.props.forscreening !== undefined) {
            if (this.props.forscreening) {
                this.setState({forscreening: true});
            }
        }
    }
    //Method for adding a corresponding movie to the database.
    addMovie = () => {
        console.log(this.state);
        fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: this.state })})
            .then(response => response.json()
            ).then(
                this.setState({set: true})
            )
    };

    //Method for setting up the state.
    stepUp = (data) => {
        let _directors = [];
        let _actors = [];
        let _writers = [];
        console.log(data)
        //Getting the directors, actors and writers
        if(data.credits){
            data.credits.crew.forEach(function(entry){
                    if (entry.job === "Director") {
                        _directors.push(entry.name);
                    }
                    else if (entry.known_for_department === "Writing")
                    {
                        
                        if (entry.job === "Writer" || entry.job === "Screenplay") {
                            _writers.push(entry.name);
                        }
                    } 
                })
                data.credits.cast.forEach(function(entry){
                if (entry.known_for_department === 'Acting'){
                    _actors.push(entry.original_name)
                }
            })
        }
        //Getting the trailer
        let youtube_key;
        if (data.videos){
            data.videos.results.forEach(function(entry){
                if (entry.type === "Trailer") {
                    youtube_key = entry.key;
                }
            })
        }
        //Getting genres
        let genres = [];
        if (data.genres){{
            data.genres.forEach(function(entry){
                genres.push(entry.name);
            })
        }}

        //Certification stuff
        var certificate;
        if (data.release_dates.results)
        {
            data.release_dates.results.forEach(function(entry)
            {
                if (entry.iso_3166_1 == "GB")
                {
                    certificate = entry.release_dates[0].certification;
                    // console.log(data)
                    // console.log("The certificate " + certificate)
                }
            })
            // if the certificate is empty after checking
            if (!certificate)
            {
                if (data.adult === true)
                    certificate = '18' // only adults admitted
                else
                    certificate = 'PG' // all ages admitted
            }
        }       
     
        //Update the state
        this.setState({title: this.prop.original_title, blurb: this.prop.overview, certificate: certificate, 
            release_date: this.prop.release_date, directors: _directors, actors: _actors, 
            writers:_writers, omdbid: data.id, 
            runtime : data.runtime, genres: genres,
            youtube_key: youtube_key});
        //Fetch from omdb
        var go = '/omdb/' + this.state.omdbid;
        var result;
        fetch (go, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
        }).then(response => response.json()).then(data =>
            data.response === "IN" ? this.setState({set: true}) : this.setState({set:false}))
         
    }


    //Pushes the add screening page to the navigation stack.
    addScreening = () => {
        // console.log(this.props);
        this.props.history_.push('/addscreening', {state: this.state})
    }

    
    render () {
        // console.log(this.state);
        return (


            <React.Fragment>
                <body id="grad1">
                <div className="container"  style={{textAlign:"center"}}>
                    <div className=".card mb-3" style={{maxWidth: "60rem", maxHeight:"15rem", backgroundColor:"#ece9e388"}}>
                        <div className="row .no-gutters">
                            <div className="col-md-4">
                                <img className=".img-responsive .img-rounded" src={this.image} alt={this.prop.original_title}
                                style={{maxHeight: "13rem", maxWidth: "10rem"}} ></img>
                            </div>
                            <div className="col-md-8">
                                <div className=".card-body">
                                    <h4 className=".card-title">{this.prop.original_title}</h4>
                                    <p>{this.prop.overview}</p>
                                    <SearchIMDB onGetMovie={this.stepUp} movieID = {this.prop.id} />
                                    {this.state.forscreening ? <button onClick={this.addScreening}>ADD SCREENING</button> : 
                                    this.state.set ? <p>Already stored.</p> : <button onClick={this.addMovie}>ADD TO DATABASE</button>}
                                
                                </div>
                            </div>
                        </div>
                    </div>
                <br />
                </div>
                
                </body>

            </React.Fragment>

        
        )
    }

}



export default SearchResult;
