import React from 'react'
import { useState } from 'react'


class SearchIMDB extends React.Component {
  constructor(props) {
    super(props);
    this.getAllMoviesData = this.getAllMoviesData.bind(this);
    this.getMovieData = this.getMovieData.bind(this);
    this.getTrandingMoviesData = this.getTrandingMoviesData.bind(this);

  }

  componentDidMount = () => {
    // check whether the request is to get all the movies or just the details of a movie
    if (this.props.getAllMovies === "True")
      this.getAllMoviesData(this.props.movieName);
    else if (this.props.getTranding === "True")
      this.getTrandingMoviesData()
    else
      this.getMovieData(this.props.movieID);//else return just the one movie with all of the details
  }


  // fetch omdb api (IMDB open source database) using movie name. Returns all the movies
  getAllMoviesData = (movieName) => {
    let movie = movieName.split('_').join('%20');
    // fetch(`http://www.omdbapi.com/?s=${movieName}&apikey=21f186c3`, {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=271393256b89c9461c48c1688804f774&language=en-US&query=${movie}&page=1&include_adult=false`, {
      method: 'GET',
    })
      .then(response => response.json()).then(data => {
        // console.log(data);
        this.props.onGetMovie(data.results);

      });
    
    fetch(`https://api.themoviedb.org/3/certification/movie/list?api_key=271393256b89c9461c48c1688804f774`)
  }
  // fetch that returns only the details for a specific movie
  getMovieData = (movieID) => {
    // fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=21f186c3`, {
    fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=271393256b89c9461c48c1688804f774&language=en-US&append_to_response=credits,videos,release_dates`, {
      method: 'GET',
    })
      .then(response => response.json()).then(data => {
      //  console.log(data)
        this.props.onGetMovie(data); // depends on the function that is passed as a prop
      });

  }

  getTrandingMoviesData = () => {
    // fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=21f186c3`, {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=271393256b89c9461c48c1688804f774`, {
      method: 'GET',
    })
      .then(response => response.json()).then(data => {
        // console.log(data)
        this.props.onGetMovie(data); // depends on the function that is passed as a prop
      });
  }


  render() {
    return (
      <>
      </>
    )
  }
}

export default SearchIMDB
