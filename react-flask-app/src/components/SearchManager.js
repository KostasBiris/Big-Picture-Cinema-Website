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
