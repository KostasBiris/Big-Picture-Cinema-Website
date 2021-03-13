import React from 'react'
import { useState } from 'react' 


class SearchIMDB extends React.Component{
  constructor(props) {
      super(props);
      this.getAllMoviesData = this.getAllMoviesData.bind(this);
      this.getMovieData = this.getMovieData.bind(this)
      // this.stepUp = this.stepUp.bind(this);
      if(props.getAllMovies == 'True')
        this.getAllMoviesData(this.props.movieName);
      else
        this.getMovieData = this.getMovieData(this.props.movieID);//else return just the one movie with all of the details
      
  }

  

  getAllMoviesData = (movieName) => {
      fetch(`http://www.omdbapi.com/?s=${movieName}&apikey=21f186c3`, {
      method: 'GET',
      })
      .then(response => response.json()).then(data => {
        this.props.onGetMovie(data.Search);

    });
  }

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

  // const SearchIMDB = ({onGetMovie}) => {
  //   // const[dataReturned, setDataReturned] = useState([])
  //   const[movieData, setMovieData] = useState([]) 
  //   const[movieName, setMovieName] = useState('')

  //   const getAllMoviesData = () => {
  //     // e.preventDefault();
  //       console.log('geting here')

  //       fetch(`http://www.omdbapi.com/?s=${movieName}&apikey=21f186c3`, {
  //       method: 'GET',
  //       })
  //       .then(response => response.json()).then(data => {
  //         setMovieData(data.Search)
  //     });
      
      // onGetMovie(movieData)
      // // get movie using movie ID
      // fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=21f186c3`, {
      //   method: 'GET',
      //   })
      //   .then(response => response.json()).then(data => { 
      //   setMovieReturned(data)
      // });
    // }


  //   return (
  //     <div>
  //         <form onSubmit={getAllMoviesData}>
  //             <label>
  //                 Name: 
  //                 <input type="text" placeholder="Movie Name" value={movieName} 
  //                   onChange={(e) => setMovieName(e.target.value)} />
  //                 <input type="submit" value='Search'></input>
  //             </label>
  //         </form>
  //     </div>
  // )

export default SearchIMDB
