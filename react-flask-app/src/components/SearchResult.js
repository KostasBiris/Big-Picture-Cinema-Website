import React from 'react';
import SearchIMDB from './SearchIMDB';
import main from '../static/main.css';
  import Banner from './Banner';

 
//Component for displaying a search result.
class SearchResult extends React.Component{
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.prop = this.props.res;
        if (this.props.props) {
            this.props.history = this.props.props.history;
        }
        //Replace spaces in the name with '_' so we can use it in the URL.
        this.name = this.prop.original_title.split(' ').join('_');
        // get the ID of the movie
        this.id = this.prop.id
        this.image = 'https://image.tmdb.org/t/p/w500/' + this.prop.poster_path
        
        this.date = this.prop.release_date;
        this.date = this.date.split("-")[0];
        this.state = {title: '', blurb: '', certificate:'', directors:[], writers:[], actors:[], release_date:'', omdbid: -1, set: false, forscreening:false , 
        poster_path : this.prop.poster_path, runtime:'', genres: this.prop.genre_ids, youtube_key:''}
        this.goToMovie = this.goToMovie.bind(this)
    }

    componentDidMount =() => {
        if (this.props.forscreening !== undefined) {
            if (this.props.forscreening) {
                this.setState({forscreening: true});
            }
        }
        const _jquery = document.createElement("script");
        _jquery.src = "https://code.jquery.com/jquery-3.2.1.slim.min.js";
        _jquery.async = true;
        _jquery.integrity = "sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN";
        _jquery.crossOrigin = "anonymous";
        document.body.appendChild(_jquery);
    
        const _popper = document.createElement("script");
        _popper.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js";
        _popper.async = true;
        _popper.integrity = "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q";
        _popper.crossOrigin = "anonymous";
        document.body.appendChild(_popper);
    
        const _bootstrap = document.createElement("script");
        _bootstrap.src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
        _bootstrap.async = true;
        _bootstrap.integrity ="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl";
        _bootstrap.crossOrigin ="anonymous";
        document.body.appendChild(_bootstrap);
    }

    goToMovie = () => {
        let go = '/movie/' + this.name + '/' + this.id;
        this.props.history.push(go, this.state);
    }


    
    render () {
        return (
            <body>
            <link rel="stylesheet" type="text/css" href={main} />
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
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
                                    <p>{this.prop.blurb}</p>
                                    <p> Director: {this.prop.director}</p>
                                    <button onClick={this.goToMovie} className="rounded-pill text buttons_background">GET ALL TIMES & TICKETS</button>
                                </div>
                            </div>
                        </div>
                    </div>
                <br />
                </div>
                
            </body>
            </body>

        )
    }

}



export default SearchResult;
