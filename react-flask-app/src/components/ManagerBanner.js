import React from 'react';
import logo from '../static/finlogo.png';
import { logout } from '../test';
global.jQuery = require('jquery');
require('bootstrap');


class ManagerBanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = { query: '' };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleAccount = this.handleAccount.bind(this);
    }


    componentDidMount() {
        window.addEventListener('load', this.stepUp);
    
    }
    //Method for handling the search query changing.
    handleSearchChange = (e) => {
        //Update the state to represent the changes to the field.
        this.setState({ query: e.target.value });
      }
    //Method for handling the submission of the query.
    handleSubmit = (e) => {
        // e.preventDefault();
        var go = ''
        go = '/addmovies/search/' + this.state.query.split(' ').join('_');
    
        if (this.props.history){
            this.props.history.push(go, this.state);
            console.log("going");
        }
        else{
            this.props.props.history.push(go, this.state);
        }
    }
    //Method for handling logging out.
    handleLogout = (e) => {
        logout() 
        this.props.history.push('/mlogin')
      }
      
      handleAccount = (e) => {
        this.props.history.push('/emain/account');
      }

    render () {
        return (
            
                <body id="grad1">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <input onClick={() => this.props.history.push('/overall_analytics', this.state)} type="image" style={{ top: '1px', width: 'rem', height: '8rem' }} src={logo}/>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <button className="tab_background dropdown-toggle text mr-3"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">MOVIES</button>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <button className="dropdown-item" style={{color:'#f9bc50'}} >ADD MOVIES</button>
                                    <button className="dropdown-item" style={{color:'#f9bc50'}}>REMOVE MOVIES</button>
                                    <button className="dropdown-item" style={{color:'#f9bc50'}} >VIEW MOVIES</button>
                                </div>
                            </li>
                            <li className="nav-item active">
                                <button className="tab_background text mr-3">EMPLOYEES</button>
                            </li>
                            <li className="nav-item">
                                <button className="tab_background text mr-3">TICKETS</button>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="tab_background dropdown-toggle text mr-3"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">ANALYTICS</button>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <button className="dropdown-item" style={{color:'#f9bc50'}} >WEEKLY</button>
                                    <button className="dropdown-item" style={{color:'#f9bc50'}}>OVERALL</button>
                                </div>
                            </li>
                            <button onClick={this.handleLogout} className="tab_background mr-5">LOG OUT</button>

                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input onChange={this.handleSearchChange} value={this.state.query} className="form-control mr-sm-2 search_bar" type="search" placeholder="Search here.." aria-label="Search"/>
                            <button onClick={this.handleSubmit} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
                        </form>
                    </div>
                    </nav>
            </body>
        );
        
    }
}

export default ManagerBanner;