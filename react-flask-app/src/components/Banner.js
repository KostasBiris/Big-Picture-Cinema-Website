import CustomerHomePage from '../Pages/CustomerHomePage';
import React from 'react';
import search from '../static/search.png';
import logo from '../static/finlogo.png';
import headerbanner from '../static/headerbanner.png';
import follow from '../static/follow.png';
import usericon from '../static/usericon.png';
import main from '../static/main.css';
import Search from '../components/Search';
import { BrowserRouter, Route } from 'react-router-dom';

var publicIP = require('public-ip')

let interval;

class Banner extends React.Component {
    constructor(props) {
        super(props);
        //By default the state is a blank query.
        this.state = { query: '', IP: null, auth: false, response: undefined };
        //Bind our methods.
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleAccount = this.handleAccount.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.assertAuth = this.assertAuth.bind(this);
        this.stepUp = this.stepUp.bind(this);

    }
    stepUp = async () => {
        await (async () => {
            this.setState({ IP: await publicIP.v4() })
        })();
        this.assertAuth();
    }

    assertAuth = () => {
        if (this.state.IP === null) {this.stepUp()}
        var go = '/insession/' + this.state.IP;
        fetch(go, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json()).then(data => {
                this.setState({ response: data.response })
            })
    };

    isAuth = () => {
        if (this.props.location !== undefined) {
            if (this.props.location.state !== undefined) {
                if (this.props.location.state.auth === true) {
                    this.auth = true;
                    this.props.location.state.auth = false;
                    this.state.IP = this.props.location.state.IP;
                    return true;
                }
            }
        }
        if (this.state.response === "error" || this.state.response === undefined || this.auth === false) {
            // console.log(this.state.response);
            return false;
        }
        return true;
    }

    //Method for handling a change in the search query field.
    handleSearchChange = (e) => {
        // e.preventDefault();
        //Update the state to represent the changes to the field.
        this.setState({ query: e.target.value });
    }

    //Method for handling submitting a search query.
    //Called when the submit button is pressed.
    handleSubmit = (e) => {
        //Redirect the route to execute the search query.
        var go = ''

        try {
            go = '/search/' + this.state.query.split(' ').join('_');
            this.props.history.push(go);
        }
        catch (error) // TypeError is catched if this.props.history is undefined == Very likely that it is a redirection attempt
        {
            console.log('catched the error!')
            this.props.props.history.go(2);     // Moves the pointer in the history stack by n entries
            go = '/search/' + this.state.query.split(' ').join('_');
            this.props.props.history.push(go);
        }

    }

    //Method for handling the login button.
    //Called when it is pressed.
    handleLogin = (e) => {
        // e.preventDefault();
        //Redirect the route to the login page/
        this.props.history.push('/login');
    }

    handleRegister = (e) => {
        this.props.history.push('/register');
    }

    handleAccount = (e) => {
        this.props.history.push('/account');
    }

    handleLogout = (e) => {

        var go = '/logout/' + this.state.IP;

        fetch(go, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(() => this.setState({ response: undefined }))

    }


    render () {
        if (this.isAuth()) {
            return (
                <body>
                    <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    </head>
                    <body id = 'grad1'>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#"><img src={logo} style={{top:'1px', width:'rem', height:'8rem'}}/></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <button className="tab_background text mr-3">WHAT'S NEW</button>
                                </li>
                                <li className="nav-item">
                                    <button className="tab_background text mr-3">TICKETS</button>
                                </li>
                                <li className="nav-item dropdown"></li>
                                    <button className="tab_background dropdown-toggle text mr-3"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">SCREENS</button>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <button className="dropdown-item" style={{color:'#f9bc50'}} >SILVER Screens</button>
                                        <button className="dropdown-item" style={{color:'#f9bc50'}}>VMAX Screens</button>
                                        <button className="dropdown-item" style={{color:'#f9bc50'}} >GOLDEN Screens</button>
                                    </div>
                                <li className="nav-item">
                                    <button className="tab_background text mr-3" >EVENTS</button>
                                </li>
                                <li className="nav-item">
                                    <button className="tab_background text mr-9">INFO</button>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <button onClick={this.handleLogout} className="tab_background mr-3">LOG OUT</button>
                                <input onClick={this.handleAccount} className="mr-3" type="image" style={{width:'2rem',height:'2rem'}} src={usericon}/>
                            </form>
                            <form className="form-inline my-2 my-lg-0">
                            <input onChange={this.handleSearchChange} value={this.state.query} className="form-control mr-sm-2 search_bar" type="search" placeholder="Search here.." aria-label="Search"/>
                            <button onClick={this.handleSubmit} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
                            </form>
                        </div>
                        </nav>
                        </body>
                        </body>
            );
        }
        else {
            return (
                <body>
                <head>
                    <link rel="stylesheet" type="text/css" href={main} />
                    <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                </head>
                <body id = 'grad1'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#"><img src={logo} style={{top:'1px', width:'rem', height:'8rem'}}/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <button className="tab_background text mr-3">WHAT'S NEW</button>
                            </li>
                            <li className="nav-item">
                                <button className="tab_background text mr-3">TICKETS</button>
                            </li>
                            <li className="nav-item dropdown"></li>
                                <button className="tab_background dropdown-toggle text mr-3"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">SCREENS</button>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <button className="dropdown-item" style={{color:'#f9bc50'}} >SILVER Screens</button>
                                    <button className="dropdown-item" style={{color:'#f9bc50'}}>VMAX Screens</button>
                                    <button className="dropdown-item" style={{color:'#f9bc50'}} >GOLDEN Screens</button>
                                </div>
                            <li className="nav-item">
                                <button className="tab_background text mr-3" >EVENTS</button>
                            </li>
                            <li className="nav-item">
                                <button className="tab_background text mr-9">INFO</button>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <button onClick={this.handleLogin} className="tab_background mr-3">LOG IN</button>
                            <button onClick={this.handleRegister} className="tab_background mr-5">SIGN UP</button>
                        </form>
                        <form className="form-inline my-2 my-lg-0">
                            <input onChange={this.handleSearchChange} value={this.state.query} className="form-control mr-sm-2 search_bar" type="search" placeholder="Search here.." aria-label="Search"/>
                            <button onClick={this.handleSubmit} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
                        </form>
                    </div>
                    </nav>
                    </body>
                    </body>
                    
            );
        }
    }





}

export default Banner;