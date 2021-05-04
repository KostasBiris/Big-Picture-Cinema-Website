import React from 'react';
import SearchResult from '../components/SearchResult';
import { Link } from "react-router-dom";
global.jQuery = require('jquery');
require('bootstrap');

var publicIP = require('public-ip')

//Component for getting and displaying search results.
class ViewMovies extends React.Component{
  constructor(props) {
    super(props);
    //Bind our method.
    this.getMovies = this.getMovies.bind(this);
    //By default the state is an empty array.
    this.state ={ returnedData: [], IP: null, auth: false, manager: true};
  }

  componentDidMount() {

    window.addEventListener('load', this.getMovies);
    this.getMovies();
}
  
  componentDidCatch(TypeError){}


  //Invoke a request to our rest API to search the database for movies matching our query.
  getMovies = async () => {
    let movie = ''
    if(this.props.match)
      movie = this.props.match.params.query 
    console.log(movie)
    await fetch(`/allmovies`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },})
      .then(response => response.json()).then(data => {
        console.log(data)
        this.setState({ returnedData : Object.values(data.response)})
        console.log(this.state)

      });

  }

  render() {
    //Results found.
    //Render the results in a list format.
      return (
        <React.Fragment>
            <body>
            <br />
            {this.state.returnedData.length > 0 ?
            this.state.returnedData.map(res_=> {
              console.log(res_);
                return (
                // CUSTOMER SEARCH MOVIES
                <SearchResult res={res_} history={this.props.history}/>
              )
            })
            : <p>No results found</p> }

            </body>
        </React.Fragment>
      )
  

  } 
}


export default ViewMovies;
