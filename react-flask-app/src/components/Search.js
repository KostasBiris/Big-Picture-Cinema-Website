import SearchForm from './SearchForm';
import React, { useState } from 'react';
import CustomerHomePage from '../Pages/CustomerHomePage';
import SearchResult from './SearchResult';
import main from '../static/main.css';

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

class SearchResults extends React.Component{
  constructor(props) {
    super(props);
    this.getMovie = this.getMovie.bind(this);
    this.state ={ returnedData: []};
    this.getMovie(this.props.match.params.query);
  }
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
      return (
        <>
          <p>No results found.</p>
        </>
      )
    }
  } 
};


export default SearchResults;
