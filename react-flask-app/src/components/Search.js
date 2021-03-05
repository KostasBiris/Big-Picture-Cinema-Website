import SearchForm from './SearchForm';
import React, { useState } from 'react';

const Search = () => {

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
}

export default Search
