import React from 'react';
import SearchResult from '../components/SearchResult';
import { Link } from "react-router-dom";

var publicIP = require('public-ip')

//Component for getting and displaying search results.
class ViewMovies extends React.Component{
  constructor(props) {
    super(props);
    //Bind our method.
    this.getMovies = this.getMovies.bind(this);
    this.getClientIP = this.getClientIP.bind(this);
    //By default the state is an empty array.
    this.state ={ returnedData: [], IP: null, auth: false, manager: true};
  }

  componentDidMount() {

    this.getClientIP();
    window.addEventListener('load', this.getMovies);
    this.getMovies();

    const _jquery = document.createElement("script");
    _jquery.src = "https://code.jquery.com/jquery-3.2.1.slim.min.js";
    _jquery.async = true;
    _jquery.integrity = "sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN";
    _jquery.crossOrigin = "anonymous";
    document.body.appendChild(_jquery);

    const _popper = document.createElement("script");
    _popper.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js";
    _popper.async = true;
    _popper.integrity = "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q";
    _popper.crossOrigin = "anonymous";
    document.body.appendChild(_popper);

    const _bootstrap = document.createElement("script");
    _bootstrap.src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
    _bootstrap.async = true;
    _bootstrap.integrity ="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl";
    _bootstrap.crossOrigin ="anonymous";
    document.body.appendChild(_bootstrap);
}
  
  componentDidCatch(TypeError){}


  getClientIP = () => {
    (async () => {
        this.setState({IP: await publicIP.v4()})
    })();

  }
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
