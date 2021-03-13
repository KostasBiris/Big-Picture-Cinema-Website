import React from 'react'
import { useState } from 'react' 


class SearchIMDB extends React.Component{
  constructor(props) {
      super(props);
      this.getAllMoviesData = this.getAllMoviesData.bind(this);
      this.getMovieData = this.getMovieData.bind(this)
      
      // check whether the request is to get all the movies or just the details of a movie
      if(props.getAllMovies == 'True')
        this.getAllMoviesData(this.props.movieName);
      else
        this.getMovieData = this.getMovieData(this.props.movieID);//else return just the one movie with all of the details
      
  }

  
  // fetch omdb api (IMDB open source database) using movie name. Returns all the movies
  getAllMoviesData = (movieName) => {
      fetch(`http://www.omdbapi.com/?s=${movieName}&apikey=21f186c3`, {
      method: 'GET',
      })
      .then(response => response.json()).then(data => {
        this.props.onGetMovie(data.Search);

    });
  }
  // fetch that returns only the details for a specific movie
  getMovieData = (movieID) => {
    fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=21f186c3`, {
    method: 'GET',
    })
    .then(response => response.json()).then(data => {
      // console.log(data)
      this.props.onGetMovie(data); // depends on the function that is passed as a prop
  });
  }


  render () {
    return (
        <>
        </>
    )
  }
}

export default SearchIMDB
