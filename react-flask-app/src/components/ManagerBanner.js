import React from 'react';
import logo from '../static/finlogo.png';
import { logout } from '../auth';


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

    handleSearchChange = (e) => {
        // e.preventDefault();
        //Update the state to represent the changes to the field.
        this.setState({ query: e.target.value });
      }

    handleSubmit = (e) => {
        var go = ''
        go = '/addmovies/search/' + this.state.query.split(' ').join('_');
    
        console.log(go)
        console.log("hellooooooo")
        
    
        if (this.props.history){
            this.props.history.push(go, this.state);
            console.log("going");
        }
        else{
            this.props.props.history.push(go, this.state);
        }
    }

    handleLogout = (e) => {
        logout()
        var go = '/logout/' + this.state.IP;
      
        fetch(go, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(() => this.setState({ response: undefined }))
      
      }
      
      handleAccount = (e) => {
        this.props.history.push('/emain/account');
      }

    render () {
        return (
            
                <body id="grad1">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#"><img src={logo} style={{top:'1px', width:'rem', height:'8rem'}}/></a>
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
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <button className="tab_background mr-5">LOG OUT</button>
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