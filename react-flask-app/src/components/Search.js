import SearchForm from './SearchForm';
import React, { useState } from 'react';



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
          {this.state.returnedData.map(res=> {
            return (
              <ul>
                <li>{res.name}</li>
              </ul>
            )
          })}
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
