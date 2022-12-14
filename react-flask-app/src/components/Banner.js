import CustomerHomePage from '../Pages/CustomerHomePage';
import React from 'react';
import search from '../static/search.png';
import logo from '../static/finlogo.png';
import headerbanner from '../static/headerbanner.png';
import follow from '../static/follow.png';
import usericon from '../static/usericon.png';
import main from '../static/main.css';
import Search from '../components/Search';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import BookTickets from '../Pages/BookTicketsPage';
import ReactDatePicker from 'react-datepicker';
import {logout, authFetch} from "../auth";
var publicIP = require('public-ip')
global.jQuery = require('jquery');
require('bootstrap');


class Banner extends React.Component {
    constructor(props) {
        super(props);
        //this.props.history = this.props.history


        //By default the state is a blank query.
        this.state = { query: '', IP: null, auth: false, response: undefined, date: '' };
        //Bind our methods.
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleAccount = this.handleAccount.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

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
        // e.preventDefault();
        // e.preventDefault();
        var go = ''
        go = '/search/' + this.state.query.split(' ').join('_');
        console.log(go)
        console.log(this.props.history)
        console.log(this.props);
        if (this.props.history){
            console.log("going")
            // this.props.history.goBack();
            this.props.history.push(go, this.state);
        }
        else{
            // this.props.props.history.go(2);     // Moves the pointer in the history stack by n entries
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

    //Method for handling the register button.
    handleRegister = (e) => {
        this.props.history.push('/register');
    }

    //Method for handling the account button.
    handleAccount = (e) => {
        this.props.history.push('/account', this.state);
    }

    //Method for handling the logout button.
    handleLogout = (e) => {
        logout() // deletes token from in session in flask_praetorian
        this.props.history.push('/home') // go to home
        var go = '/logout/' + this.state.IP;

        fetch(go, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(() => this.setState({ response: undefined }))

    }

    
    //Method for handling searching by date.
    handleSubmitDate = (e) => {
        //e.preventDefault();
        if (this.state.date !=='') {
            const go = '/searchscreenings/' + this.state.date;
            if (this.props.history){
                console.log("going")
                this.props.history.push(go, this.state);
            }
            else{
                this.props.props.history.push(go);
            }
        }   
    }

    //Method for handling the date changing.
    handleDate = (e) => {
        //Dirty trick to reformat the date how we want it.
        function formatd(inp) {
            let dArr = inp.split("-");  // ex input "2010-01-18"
            return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
            
        }
        if (e.target.value)
            this.setState({ date: formatd(e.target.value) });   
    }

    //Another dirty func for reformatting the date.
    reformatd = (inp) => {
        let dArr = inp.split("-");
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0];
        
    }




    render() {
        //Is the client logged in?
        if (this.props.logged) {
            return (
                <React.Fragment>
                    <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    </head>
                    <body id='grad1'>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <input onClick={() => this.props.history.push('/home', this.state)} type="image" style={{ top: '1px', width: 'rem', height: '8rem' }} src={logo}/>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <button className="tab_background text mr-3">WHAT'S NEW</button>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/book'}>
                                        <button className="tab_background text mr-3">TICKETS</button>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="tab_background text mr-9">INFO</button>
                                    </li>
                                </ul>
                                <form className="form-inline my-2 my-lg-0">
                                    <button onClick={this.handleLogout} className="tab_background mr-3">LOG OUT</button>
                                    <input onClick={this.handleAccount} className="mr-3" type="image" style={{ width: '2rem', height: '2rem' }} src={usericon} />
                                </form>
                                <form className="form-inline my-2 my-lg-0 mr-3">
                                    <input onChange={this.handleSearchChange} value={this.state.query} className="form-control mr-sm-2 search_bar" type="search" placeholder="Search here.." aria-label="Search" />
                                    <button onClick={this.handleSubmit} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
                                </form>
                                <form className="form-inline my-2 my-lg-0 mr-3">
                                <input type="date" onChange={this.handleDate} value={this.reformatd(this.state.date)} />
                                <button onClick={this.handleSubmitDate} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
                                </form>
                            </div>
                        </nav>
                    </body>
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    </head>
                    <body id='grad1'>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <input onClick={() => this.props.history.push('/home', this.state)} type="image" style={{ top: '1px', width: 'rem', height: '8rem' }} src={logo}/>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <button className="tab_background text mr-3">WHAT'S NEW</button>
                                    </li>
                                    <li className="nav-item">
                                        
                                        <Link to={'/book'}>
                                            <button className="tab_background text mr-3">TICKETS</button>
                                        </Link>
                                        {/* <Route path="/book" component={BookTickets}/> */}
                                    </li>
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
                                <form className="form-inline my-2 my-lg-0 mr-3">
                                    <input onChange={this.handleSearchChange} value={this.state.query} className="form-control mr-sm-2 search_bar" type="search" placeholder="Search here.." aria-label="Search" />
                                    <button onClick={this.handleSubmit} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
                                </form>
                                <form className="form-inline my-2 my-lg-0 mr-3">
                                    <input type="date" onChange={this.handleDate} value={this.reformatd(this.state.date)} />
                                    <button onClick={this.handleSubmitDate} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
                                </form>
                            </div>
                        </nav>
                    </body>
                </React.Fragment>

            );
        }
    }





}
export default Banner;