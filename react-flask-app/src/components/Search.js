import SearchIMDB from './SearchIMDB';
import React, { useState } from 'react';
import CustomerHomePage from '../Pages/CustomerHomePage';
import SearchResult from './SearchResult';
import main from '../static/main.css';
import { BrowserRouter, Route } from 'react-router-dom';
/*const Search = () => {

  const [returnedData, setReturnedData] = useState('');

  // search movie
  const getMovie = (movie) => {
    fetch('/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // needed in order to NOT get None as a response
      },
      body: JSON.stringify({movie: movie})})  // input data
    .then(response => response.json()).then(data => {  // gets response from flask server
      setReturnedData(data);
    });
  }

  return (
    <div>
      <h1>This is the search form</h1>
      <SearchForm onGetMovie={getMovie} />
      <p>{returnedData.data}</p>
    </div>
  )
}*/
var publicIP = require('public-ip')


//Component for getting and displaying search results.
class SearchResults extends React.Component{
  constructor(props) {
    super(props);
    //Bind our method.
    this.getMovies = this.getMovies.bind(this);
    this.getClientIP = this.getClientIP.bind(this);
    //By default the state is an empty array.
    this.state ={ returnedData: [], IP: null, auth: false};
    //Call our method, using the query given.
    this.getClientIP();
  }

  getClientIP = () => {
    (async () => {
        this.setState({IP: await publicIP.v4()})
    })();

  }
  //Invoke a request to our rest API to search the database for movies matching our query.
  getMovies = (data) => {
    this.setState({ returnedData : Object.values(data)})
  }


  render() {
    //Results found.
    //Render the results in a list format.
      return (
        <>
        <head>
          <link rel="stylesheet" type="text/css" href={main}/>
        </head>
          <body>
          <CustomerHomePage/>
          <SearchIMDB onGetMovie={this.getMovies} movieName={this.props.match.params.query} getAllMovies={'True'}/>

          <div style={{position: 'relative', paddingLeft: '20%', paddingRight: '80%', paddingTop: '10%%', paddingBottom: '90%', width: '30%'}}>

          {/* Render element conditionally  */}
          {this.state.returnedData.length > 0 ?
          this.state.returnedData.map(res_=> {
            return (
              
              <ul>
                <SearchResult res={res_} />
              </ul>
            )
          })
          : <p>No results found</p> }

          </div>
          </body>
        </>
      )
  } 
}


export default SearchResults;
