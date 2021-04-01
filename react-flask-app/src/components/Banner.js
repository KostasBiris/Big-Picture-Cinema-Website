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
import BookTickets from '../Pages/BookTicketsPage'

var publicIP = require('public-ip')

let interval;

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
        this.assertAuth = this.assertAuth.bind(this);
        this.stepUp = this.stepUp.bind(this);
        this.getClientIP = this.getClientIP.bind(this);

    }

    async componentDidMount  ()  {
        window.addEventListener('load', this.stepUp);
        await this.stepUp();
        this.assertAuth();
        interval = setInterval(() => {

            if (this.state.IP !== null) {
                this.assertAuth();
            }
        }, 5000)

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

    componentWillUnmount = () => {
        window.removeEventListener('load', this.stepUp(true))
        clearInterval(interval);
    }


    getClientIP = () => {
        (async () => {
            this.setState({ IP: await publicIP.v4() })
        })();
    }



    stepUp = async (flag) => {
        await (async () => {
            this.setState({ IP: await publicIP.v4() })
        })();
        if (flag)
            this.assertAuth();
    }

    async assertAuth  ()  {
        if (this.state.IP === null) {
            return false;
        }
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
        go = '/search/' + this.state.query.split(' ').join('_');
        // console.log(this.props)

        if (this.props.history){
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


    handleSubmitDate = (e) => {
        e.preventDefault();
        if (this.state.date !== '') {
            this.props.history.push('/searchscreenings/' + this.state.date);
        }

    }


    handleDate = (e) => {
        // e.preventDefault();
        // console.log(e.target.value)

        function formatd(inp) {
            let dArr = inp.split("-");  // ex input "2010-01-18"
            return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"

        }
        if (e.target.value)
            this.setState({ date: formatd(e.target.value) });
    }

    reformatd = (inp) => {
        let dArr = inp.split("-");
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0];

    }




    render() {
        if (this.isAuth()) {
            return (
                <body>
                    <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    </head>
                    <body id='grad1'>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="#"><img src={logo} style={{ top: '1px', width: 'rem', height: '8rem' }} /></a>
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
                                        <Route path="/book" component={BookTickets}/>
                                    </li>
                                    <li className="nav-item dropdown"></li>
                                    <button className="tab_background dropdown-toggle text mr-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">SCREENS</button>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <button className="dropdown-item" style={{ color: '#f9bc50' }} >SILVER Screens</button>
                                        <button className="dropdown-item" style={{ color: '#f9bc50' }}>VMAX Screens</button>
                                        <button className="dropdown-item" style={{ color: '#f9bc50' }} >GOLDEN Screens</button>
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
                                    <input onClick={this.handleAccount} className="mr-3" type="image" style={{ width: '2rem', height: '2rem' }} src={usericon} />
                                </form>
                                <form className="form-inline my-2 my-lg-0">
                                    <input onChange={this.handleSearchChange} value={this.state.query} className="form-control mr-sm-2 search_bar" type="search" placeholder="Search here.." aria-label="Search" />
                                    <button onClick={this.handleSubmit} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
                                </form>
                                <form className="form-inline my-2 my-lg-0">
                                <input type="date" onChange={this.handleDate} value={this.reformatd(this.state.date)}/>
                                <button onClick={this.handleSubmitDate} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
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
                    <body id='grad1'>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="#"><img src={logo} style={{ top: '1px', width: 'rem', height: '8rem' }} /></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
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
                                    <button className="tab_background dropdown-toggle text mr-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">SCREENS</button>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <button className="dropdown-item" style={{ color: '#f9bc50' }} >SILVER Screens</button>
                                        <button className="dropdown-item" style={{ color: '#f9bc50' }}>VMAX Screens</button>
                                        <button className="dropdown-item" style={{ color: '#f9bc50' }} >GOLDEN Screens</button>
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
                                    <input onChange={this.handleSearchChange} value={this.state.query} className="form-control mr-sm-2 search_bar" type="search" placeholder="Search here.." aria-label="Search" />
                                    <button onClick={this.handleSubmit} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
                                </form>
                                <form className="form-inline my-2 my-lg-0">
                                    <input type="date" onChange={this.handleDate} value={this.reformatd(this.state.date)} />
                                    <button onClick={this.handleSubmitDate} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
                                </form>
                                <form className="form-inline my-2 my-lg-0">
                                <input type="date" onChange={this.handleDate} value={this.reformatd(this.state.date)}/>
                                <button onClick={this.handleSubmitDate} className="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
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