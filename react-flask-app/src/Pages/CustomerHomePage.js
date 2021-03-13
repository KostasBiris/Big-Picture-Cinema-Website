import React from 'react';
import search from '../static/search.png'
import logo from '../static/finlogo.png'
import headerbanner from '../static/headerbanner.png'
import follow from '../static/follow.png'
import usericon from '../static/usericon.png'
import poster1 from '../static/poster1.jpg'
import poster2 from '../static/poster2.jpg'
import poster3 from '../static/poster3.jpg'
import poster4 from '../static/poster4.jpg'
import poster5 from '../static/poster5.jpg'
import poster6 from '../static/poster6.jpg'
import poster7 from '../static/poster7.jpg'
import left from '../static/left.png'
import right from '../static/right.png'
import main from '../static/main.css';
import { shiftLeft, shiftRight } from './scripts/scripts'
import Search from '../components/Search';
import { BrowserRouter, Route } from 'react-router-dom';

var publicIP = require('public-ip')

//Component for the main page of the customers.
class CustomerHomePage extends React.Component {
    constructor(props) {
        super(props);
        //By default the state is a blank query.
        this.state = { query: '', IP: null, auth: false };
        //Bind our methods.
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.getClientIP = this.getClientIP.bind(this);
        this.assertAuth = this.assertAuth.bind(this);
        this.stepUp = this.stepUp.bind(this);

        
    }
    getClientIP = () => {
        (async () => {
            this.setState({ IP: await publicIP.v4() })
        })();
    }

    stepUp = async () => {
        await (async () => {
            this.setState({IP: await publicIP.v4()})
        })();
        this.assertAuth();
    }

    componentDidMount() {
        window.addEventListener('load', this.stepUp);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.stepUp)
    }

    assertAuth = () => {
        var go = '/insession/' + this.state.IP;
        fetch(go, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: this.IP })
        })
            .then(response => response.json()).then(data => {
                alert('USER: '.concat(Object.values(data.response)))}).then(() => this.setState({ auth: true }))
    };

    //Method for handling a change in the search query field.
    handleSearchChange = (e) => {
        //Update the state to represent the changes to the field.
        this.setState({ query: e.target.value });
    }

    //Method for handling submitting a search query.
    //Called when the submit button is pressed.
    handleSubmit = (e) => {
        //Redirect the route to execute the search query.
        var go = '/search/' + this.state.query;
        this.props.history.push(go);
    }

    //Method for handling the login button.
    //Called when it is pressed.
    handleLogin = (e) => {
        //Redirect the route to the login page/
        this.props.history.push('/login');
    }

    handleRegister = (e) => {
        this.props.history.push('/register');
    }

    render() {
        console.log(this.state);
        return (
            <body>
                <head>
                    <link rel="stylesheet" type="text/css" href={main} />
                    <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                </head>
                <body style={{ backgroundColor: 'rgb(255,255,255)' }} />
                <img src={logo} style={{ top: '1px', width: '300px', height: '190px' }} />
                <img src={headerbanner} style={{ position: 'absolute', top: '10px', left: '340px', width: '980px', height: '105px' }} />
                <img src={follow} style={{ position: 'absolute', top: '10px', left: '1380px', width: '100px', height: '105px' }} />
                <div class="text">
                    <button className="tab_background" style={{ position: 'absolute', top: '125px', left: '340px', width: '150px', height: '40px' }}>WHAT'S NEW </button>
                    <button className="tab_background" style={{ position: 'absolute', top: '125px', left: '510px', width: '150px', height: '40px' }}>TICKETS</button>
                    <button className="tab_background" style={{ position: 'absolute', top: '125px', left: '680px', width: '150px', height: '40px' }}>SCREENS</button>
                    <button className="tab_background" style={{ position: 'absolute', top: '125px', left: '850px', width: '150px', height: '40px' }}>INFO</button>
                </div>
                <form>
                    <input onChange={this.handleSearchChange} value={this.state.query} className="search_bar" name="query" id="query" type="text" placeholder="Search here.." style={{ position: 'absolute', top: '125px', left: '1020px' }} />
                    <input onClick={this.handleSubmit} className="search_icon" type="image" src={search} style={{ position: 'absolute', top: '125px', left: '1270px', width: '50px', height: '40px' }} />
                </form>
                <div>
                    <button type="submit" id="login" className="text_button" style={{ position: 'absolute', top: '125px', left: '1390px', width: '60px', height: '40px' }}>LOG IN</button>
                    <button id="register" type="submit" className="text_button" style={{ position: 'absolute', top: '125px', left: '1460px', width: '60px', height: '40px' }}>SIGN UP</button>
                    <button onClick={this.handleLogin} className="text_button" style={{ position: 'absolute', top: '125px', left: '1390px', width: '60px', height: '40px' }}>LOG IN</button>
                    <button onClick={this.handleRegister} className="text_button" style={{ position: 'absolute', top: '125px', left: '1460px', width: '60px', height: '40px' }}>SIGN UP</button>
                    <input href="/home" id="account" type="image" src={usericon} style={{ position: 'absolute', top: '125px', left: '1340px', width: '40px', height: '40px' }} />
                </div>
            </body>

        );
    }
};

export default CustomerHomePage;

