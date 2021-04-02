import SearchIMDB from './SearchIMDB';
import React, { useState } from 'react';
import CustomerHomePage from '../Pages/CustomerHomePage';
import SearchResult from './SearchResult';
import SearchResultManager from './SearchResultManager';
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
    let movie = ''
    if(this.props.match)
      movie = this.props.match.params.query 
    console.log(movie)
    await fetch(`/movie/search/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: movie })})
      .then(response => response.json()).then(data => {
        console.log(data)
        this.setState({ returnedData : data.movies})


      });

  }

  render() {
    //Results found.
    //Render the results in a list format.
    console.log(this.props)
    console.log("This is the search result")

      return (
        <>
        {/* <head>
          <link rel="stylesheet" type="text/css" href={main}/>
        </head> */}
          <body>
            {/* <Banner history ={this.props.history} /> */}
            {this.state.returnedData.length > 0 ?
            this.state.returnedData.map(res_=> {
              return (
                // CUSTOMER SEARCH MOVIES
                <SearchResult res={res_} history={this.props.history}/>
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
