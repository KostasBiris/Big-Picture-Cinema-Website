import React from 'react';
import SearchIMDB from './SearchIMDB';


 
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
        this.state = {title: '', blurb: '', certificate:'', directors:[], writers:[], actors:[], release_date:'', omdbid: -1, set: false, forscreening:false , poster_path : this.prop.poster_path}
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
        this.setState({title: this.prop.original_title, blurb: this.prop.overview, certificate: '', release_date: this.prop.release_date, directors: _directors, actors: _actors, writers:_writers, omdbid: data.id});
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
        console.log(this.props);
        this.props.history_.push('/addscreening', {state: this.state})
    }

    
    render () {
        return (
            
            <div>
                <a  href={this.href}>
                <img src={this.image} alt={this.prop.original_title} width="200" height="200"></img><br />
                <span >{this.prop.original_title}</span><br/>
                <span >{this.date}</span>
                </a>
                <SearchIMDB onGetMovie={this.stepUp} movieID = {this.prop.id} />
                {this.state.forscreening ? <button onClick={this.addScreening}>ADD SCREENING</button> : 
                this.state.set ? <p>Already stored.</p> : <button onClick={this.addMovie}>ADD TO DATABASE</button>}
                {}
            </div>
        )
    }

}



export default SearchResult;
