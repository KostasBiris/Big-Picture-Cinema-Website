import React from 'react';
import SearchIMDB from './SearchIMDB';
import main from '../static/main.css';
import Banner from './Banner';
global.jQuery = require('jquery');
require('bootstrap');
  
 
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
    }

    //Method for pushing a movie page to the history stack.
    goToMovie = (e) => {
        e.preventDefault();
        let go = '/movie/' + this.name + '/' + this.id;
        this.props.history.push(go, this.state);
    }


    
    render () {
        console.log("Trying to render inside SearchResult")
        console.log(this.state)
        return (
            <React.Fragment>
            <link rel="stylesheet" type="text/css" href={main} />
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            
            <body id="grad1">
            <div className="container-fluid px-0 px-sm-4 mx-auto" >
                            <div className="row justify-content-center mx-0" style={{ backgrouncolor: "antiqueWhite", padding:'1rem' }}>
                                <div className="col-lg-10">
                                    <div className="card border-0">
                                    <div className="card-header" style={{ backgroundColor: "#4e5b60" }}>
                                            <div className="mx-0 mb-0 row justify-content-sm-center justify-content-start px-1">
                                            <h4 className=".card-title" style={{ color: "antiqueWhite" }}>{this.prop.original_title}</h4>
                                            </div>
                                        </div>
                                    <div className="justify-content-sm-center px-sm-4 card-body">
                                            <div className="row text-center">
                                                <div className="col-md-2 col-4 my-1 px-2">
                                                    <div className="mx-0 mb-0 row justify-content-start px-1">
                                <img className="img-fluid" src={this.image} alt={this.prop.original_title}></img>
                                </div>
                                </div>
                                <div className="col my-1 px-2">
                                   <div className="mx-0 mb-0 row justify-content-end px-1">
                                    <p>{this.prop.blurb}</p>
                                </div>
                                    <div class="mb-auto p-2">
                                    <button onClick={this.goToMovie} className="text buttons_background" >GET ALL TIMES & TICKETS</button>
                                    </div>
                                    </div>
                                    
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                   
                <br />
                
                
            </body>
            </React.Fragment>

        )
    }

}



export default SearchResult;
