import main from '../static/main.css';
import logo from '../static/finlogo.png';
import usericon from '../static/usericon.png';
import React from 'react';
import { logout } from '../auth';

class EmployeeBanner extends React.Component {

  constructor(props) {
    super(props);
    //this.props.history = this.props.history


    //By default the state is a blank query.
    this.state = { query: '' };
    //Bind our methods.
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAccount = this.handleAccount.bind(this);

  }

  //Method for handling the search query changing.
  handleSearchChange = (e) => {
    //Update the state to represent the changes to the field.
    this.setState({ query: e.target.value });
  }

  //Method for handling the search query being submitted.
  handleSubmit = (e) => {

    var go = ''
    go = '/emain/search/' + this.state.query.split(' ').join('_');

    console.log(go)
    console.log(this.props.history)

    if (this.props.history){
        this.props.history.push(go, this.state);
        console.log(this.props.history)
    }
    else{
        this.props.props.history.push(go, this.state);
    }


}

//Method for handling logging out.
handleLogout = (e) => {
  logout();
  var go = '/logout/' + this.state.IP;

  fetch(go, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(response => response.json()).then(() => this.setState({ response: undefined }))

}


//Method for handling clicking the account button.
handleAccount = (e) => {
  this.props.history.push('/emain/account');
}

    render() {

        return (
          <React.Fragment>
            <head>
        <link rel="stylesheet" type="text/css" href={main} />
        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
        <meta className="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </head>
            <body>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <input onClick={() => this.props.history.push('/emain', this.state)} type="image" style={{ top: '1px', width: 'rem', height: '8rem' }} src={logo}/>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0">
            <button onClick={this.handleLogout} className="tab_background mr-3">LOG OUT</button>
            <input onClick={this.handleAccount} className="mr-3" type="image" style={{width:"2rem",height:"2rem"}} src={usericon}/>
            <input onChange={this.handleSearchChange} value={this.state.query} className="form-control mr-sm-2 search_bar" type="search" placeholder="Search here.." aria-label="Search" />
            <button onClick={this.handleSubmit} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
          </form>
        </div>
      </nav>
      </body>
      </React.Fragment>
        );

    }
}

export default EmployeeBanner;