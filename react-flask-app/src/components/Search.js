import SearchIMDB from './SearchIMDB';
import React, { useState } from 'react';
import CustomerHomePage from '../Pages/CustomerHomePage';
import SearchResult from './SearchResult';
import SearchResultManager from './SearchResultManager';
import main from '../static/main.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Banner from './Banner';
var publicIP = require('public-ip')
global.jQuery = require('jquery');
require('bootstrap');


//Component for getting and displaying search results.
class SearchResults extends React.Component{
  constructor(props) {
    super(props);
    //Bind our method.
    this.getMovies = this.getMovies.bind(this);
    //By default the state is an empty array.
    this.state ={ returnedData: [], IP: null, auth: false, manager: true};
  }

  componentDidMount = async ()  => {

    window.addEventListener('load', this.getMovies);
    await this.getMovies();
    if (this.state.returnedData.length === 0) {
      this.props.history.push('/', this.state);
    }
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
        <React.Fragment>
        <head>
          <link rel="stylesheet" type="text/css" href={main}/>
        </head>
          <body id="grad1">
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
        </React.Fragment>
      )
  

  } 
}


export default SearchResults;
