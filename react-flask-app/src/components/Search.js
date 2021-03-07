import SearchForm from './SearchForm';
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


//Component for getting and displaying search results.
class SearchResults extends React.Component{
  constructor(props) {
    super(props);
    //Bind our method.
    this.getMovie = this.getMovie.bind(this);

    //By default the state is an empty array.
    this.state ={ returnedData: []};

    //Call our method, using the query given.
    this.getMovie(this.props.match.params.query);
  }

  //Invoke a request to our rest API to search the database for movies matching our query.
  getMovie = (movie) => {
    var fet = '/movie/' + movie;
      fetch (fet, {
        method: 'POST' ,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({movie: movie})})
        .then(response => response.json()).then(data => {
         this.setState({ returnedData : Object.values(data)})
        });
  }


  render() {
    //Results found.
    //Render the results in a list format.
    if (this.state.returnedData.length > 0) {
      return (
        <>
        <head>
          <link rel="stylesheet" type="text/css" href={main}/>
        </head>
          <body>
          <CustomerHomePage/>
          <div style={{position: 'relative', paddingLeft: '20%', paddingRight: '80%', paddingTop: '10%%', paddingBottom: '90%', width: '30%'}}>
          {this.state.returnedData.map(res_=> {
            return (
              <ul>
                <li><SearchResult res={res_}/></li>
              </ul>
            )
          })}
          </div>
          
          </body>
        </>
      )
    }else {
      //No results found.
      return (
        <>
          <p>No results found.</p>
        </>
      )
    }
  } 
};


export default SearchResults;
