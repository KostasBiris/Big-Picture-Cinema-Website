import SearchIMDB from './SearchIMDB';
import React from 'react';
import SearchResult from './SearchResultManager';
import main from '../static/main.css';
var publicIP = require('public-ip')

//Component for getting and displaying search results.
class SearchManager extends React.Component{
  constructor(props) {
    super(props);
    //Bind our method.
    this.getMovies = this.getMovies.bind(this);
    this.getClientIP = this.getClientIP.bind(this);
    // this.handleQuery = this.handleQuery.bind(this);
    //By default the state is an empty array.
    this.state ={ returnedData: [], IP: null, auth: false, manager: true, query: ''};
    
  }

  componentDidMount() {

    this.getClientIP();
    // window.addEventListener('load', this.handleQuery);
    // this.handleQuery();
    
    // const _jquery = document.createElement("script");
    // _jquery.src = "https://code.jquery.com/jquery-3.2.1.slim.min.js";
    // _jquery.async = true;
    // _jquery.integrity = "sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN";
    // _jquery.crossOrigin = "anonymous";
    // document.body.appendChild(_jquery);

    // const _popper = document.createElement("script");
    // _popper.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js";
    // _popper.async = true;
    // _popper.integrity = "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q";
    // _popper.crossOrigin = "anonymous";
    // document.body.appendChild(_popper);

    // const _bootstrap = document.createElement("script");
    // _bootstrap.src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
    // _bootstrap.async = true;
    // _bootstrap.integrity ="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl";
    // _bootstrap.crossOrigin ="anonymous";
    // document.body.appendChild(_bootstrap);

}


  getClientIP = () => {
    (async () => {
        this.setState({IP: await publicIP.v4()})
    })();

  }
  //Invoke a request to our rest API to search the database for movies matching our query.
  getMovies = (data) => {
    // MANAGER ADD MOVIES FUNCTIONALITY 
    this.setState({ returnedData : Object.values(data)})
  }

  // handleQuery = () => {
  //   if(this.props.match){
  //       this.setState({query : this.props.match.params.query});
  //   }

  //   return(
  //       <SearchIMDB onGetMovie={this.getMovies} movieName={this.state.query} getAllMovies={"True"} getTranding={"False"} />
  //   );

  // }

  render() {
    //Results found.
    //Render the results in a list format.
    console.log("Testing the manager...")

      return (
        <>
        {/* <head>
          <link rel="stylesheet" type="text/css" href={main}/>
        </head> */}
          <body>
            <SearchIMDB onGetMovie={this.getMovies} movieName={this.props.match.params.query} getAllMovies={"True"} getTranding={"False"} />

            <br />
            <br />
            <br />
            {this.state.returnedData.length > 0 ?
            this.state.returnedData.map(res_=> {
              return (
                
                // MANAGER ADD MOVIES
                <ul style={{display: 'inline'}}>
                  <SearchResult res={res_} />
                </ul>

              )
            })
            : <p>No results found</p> }

          {/* </div> */}
          </body>
        </>
      )
  

  } 
}


export default SearchManager;
