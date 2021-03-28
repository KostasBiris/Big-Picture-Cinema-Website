import SearchIMDB from './SearchIMDB';
import React, { useState } from 'react';
import CustomerHomePage from '../Pages/CustomerHomePage';
import SearchResult from './SearchResult';
import main from '../static/main.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Banner from './Banner';
var publicIP = require('public-ip')

//Component for getting and displaying search results.
class SearchResults extends React.Component{
  constructor(props) {
    super(props);
    //Bind our method.
    this.getMovies = this.getMovies.bind(this);
    this.getClientIP = this.getClientIP.bind(this);
    //By default the state is an empty array.
    this.state ={ returnedData: [], IP: null, auth: false, manager: true};
  }

  componentDidMount() {

    this.getClientIP();
    window.addEventListener('load', this.getMovies);
    this.getMovies();
    
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


  getClientIP = () => {
    (async () => {
        this.setState({IP: await publicIP.v4()})
    })();

  }
  //Invoke a request to our rest API to search the database for movies matching our query.
  getMovies = async () => {
    let movie = this.props.match.params.query 
    console.log(movie)
    await fetch(`/movie/search/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: movie })})
      .then(response => response.json()).then(data => {
        this.setState({ returnedData : data.movies})

        console.log(this.state.returnedData);
        // console.log(this.state.returnedData.movies.length);
      });

  }

  render() {
    //Results found.
    //Render the results in a list format.


      return (
        <>
        {/* <head>
          <link rel="stylesheet" type="text/css" href={main}/>
        </head> */}
          <body>
            {/* <SearchIMDB onGetMovie={this.getMovies} movieName={this.props.match.params.query} getAllMovies={"True"} getTranding={"False"} /> */}
            <Banner props={this.props} /> {/* pass props to keep track of props.history.push from CustomerHomePage */}
            {/* <div style={{position: 'relative', paddingLeft: '20%', paddingRight: '80%', paddingTop: '10%%', paddingBottom: '90%', width: '50%'}}> */}
            {/* Render element conditionally  */}
            {this.state.returnedData.length > 0 ?
            this.state.returnedData.map(res_=> {
              return (
                
                // <ul style={{display: 'inline'}}>
                  <SearchResult res={res_} history={this.props.history}/>
                // {/* </ul> */}
              )
            })
            : <p>No results found</p> }

          {/* </div> */}
          </body>
        </>
      )
  

  } 
}


export default SearchResults;
