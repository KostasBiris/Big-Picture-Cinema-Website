import React from 'react';
import SearchIMDB from './SearchIMDB';
import '../static/main.css';

 
//Component for displaying a search result.
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
        poster_path : this.prop.poster_path, runtime:'', genres: this.prop.genre_ids, youtube_key:''}
        this.addMovie = this.addMovie.bind(this);
        this.stepUp = this.stepUp.bind(this);
        this.addScreening = this.addScreening.bind(this);
    }

    componentDidMount =() => {
        if (this.props.forscreening !== undefined) {
            if (this.props.forscreening) {
                this.setState({forscreening: true});
            }
        }
    }

    addMovie = () => {
        // console.log(this.state);
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

    stepUp = (data) => {
        let _directors = [];
        let _actors = [];
        let _writers = [];
        if(data.credits){
            data.credits.crew.forEach(function(entry){
                    if (entry.job === "Director") {
                        _directors.push(entry.name);
                    }
                    else if (entry.job === "Writer") {
                        _writers.push(entry.name);
                    }
                })
                data.credits.cast.forEach(function(entry){
                if (entry.known_for_department === 'Acting'){
                    _actors.push(entry.original_name)
                }
            })
        }

        let youtube_key;
        if (data.videos){
            data.videos.results.forEach(function(entry){
                if (entry.type === "Trailer") {
                    youtube_key = entry.key;
                }
            })
        }

        this.setState({title: this.prop.original_title, blurb: this.prop.overview, certificate: '', 
            release_date: this.prop.release_date, directors: _directors, actors: _actors, 
            writers:_writers, omdbid: data.id, 
            runtime : data.runtime,
            youtube_key: youtube_key});

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

    addScreening = () => {
        // console.log(this.props);
        this.props.history_.push('/addscreening', {state: this.state})
    }

    
    render () {
        console.log("HERE IS THE PROP");
        console.log(this.prop);
        return (


            <React.Fragment>
                <body>
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
                                    {/* <p> Director: {this.prop.director}</p> */}
                                    {/* <button onClick={this.goToMovie} className="rounded-pill text buttons_background">ADD TO DATABASE</button> */}

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

            
            // <div>
            //     <a  href={this.href}>
            //     <img src={this.image} alt={this.prop.original_title} width="200" height="200"></img><br />
            //     <span >{this.prop.original_title}</span><br/>
            //     <span >{this.date}</span>
            //     </a>
            //     <SearchIMDB onGetMovie={this.stepUp} movieID = {this.prop.id} />
            //     {this.state.forscreening ? <button onClick={this.addScreening}>ADD SCREENING</button> : 
            //     this.state.set ? <p>Already stored.</p> : <button onClick={this.addMovie}>ADD TO DATABASE</button>}
            //     {}
            // </div>
        )
    }

}



export default SearchResult;
