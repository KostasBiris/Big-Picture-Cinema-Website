import React from 'react';
import main from '../static/main.css';
import logo from '../static/finlogo.png'
import Moment from 'react-moment';
import moment, { min } from 'moment';
import vid from '../static/vid.mp4';

class CustomerRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = { forename: '', surname: '', email: '', phonenumber: '', password: '', dob: ''};
        this.handleFornameChange = this.handleFornameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleDOBChange = this.handleDOBChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Methods for handling changes in the form.
    handleFornameChange = (e) => {
        this.setState({ forename: e.target.value });

    }

    handleSurnameChange = (e) => {
        this.setState({ surname: e.target.value });

    }
    handlePhoneNumberChange = (e) => {
        this.setState({ phonenumber: e.target.value });
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });

    }

    handleDOBChange = (e) => {
        this.setState({ dob: e.target.value });
    }

    //Method for performing validation techniques, using regex mostly.
    validate = () => {
        function validateEmail(email) {
            //https://stackoverflow.com/questions/52188192/what-is-the-simplest-and-shortest-way-for-validating-an-email-in-react
            const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regexp.test(email);
        }
        //Validate the password through length check.
        function validatePassword(password) {
            if (password.length >= 8) {
                return true;
            }
            return false;
        }

        function validateFirstname(firstname) {
            const regexp = /^[a-z ,.'-]+$/i;
            return regexp.test(firstname);
        }

        function validateSurname(surname) {
            const regexp = /^[a-z ,.'-]+$/i;
            return regexp.test(surname);
        }

        function validatePhone(phonenumber) {
            const regexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return regexp.test(phonenumber);
        }

        function validateDOB(dob_) {
            const minDOB = moment().subtract(120, "years");
            const maxDOB = moment().subtract(12, "years");
            const dob = moment(dob_);
            return dob.isAfter(minDOB) && dob.isBefore(maxDOB);
        }

        if (!validateEmail(this.state.email)) {console.log('email failed');}
        if (!validatePassword(this.state.password)) {console.log('password failed');}
        if (!validateFirstname(this.state.forename)) {console.log('firstname failed');}
        if (!validateSurname(this.state.surname)) {console.log('surname failed');}      
        if (!validatePhone(this.state.phonenumber)) {console.log('phone failed');}
        if (!validateDOB(this.state.dob)) {console.log('dob failed');}



        return validateEmail(this.state.email) && validatePassword(this.state.password) && validateFirstname(this.state.forename) 
        && validateSurname(this.state.surname) && validatePhone(this.state.phonenumber) && validateDOB(this.state.dob);
    }

    //Method for handling submission.
    handleSubmit = (e) => {
        
        e.preventDefault();
        if (this.validate()) {
            this.registerUser();
            this.props.history.push('/home');
        }
        else {
            alert("Your details are invalid! Please try again.");
            this.setState({forename: '', surname: '', email: '', phonenumber: '', password: '', dob: ''});
        }
    }

    //Make the fetch call to flask to register.
    registerUser = () => {
        fetch ('/register', {
            method: 'POST' ,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: this.state})})
            .then(response => response.json())
        };
    render() {
        return (
        <body>
            <head>
                <link rel="stylesheet" type="text/css" href={main}/>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            </head>
            <video playsInline autoPlay muted loop id="bgvid">
                <source src={vid} type="video/mp4" />
            </video>
            <body>
                <div className="register">

                    <form className="modalContentRegister">
                        <div className="containerStart">
                            
                            <img src={logo} style={{display: 'block', margin: 'auto', width:'10rem', height: '7rem'}}/>
                            <input onChange={this.handleFornameChange} value={this.state.forename} className="registerDetails" type="text" name="first_name" id= "first_name" placeholder="First name" style={{color:'black'}} required/>
                            <input onChange={this.handleSurnameChange} value={this.state.surname} className="registerDetails"  type="text" name="last_name" id= "last_name" placeholder="Last name" style={{color:'black'}} required/>
                            <input onChange={this.handlePhoneNumberChange} value={this.state.phonenumber} className="registerDetails"  type="text" name="phone_number" id= "phone_number" placeholder="Phone number" style={{color:'black'}} required/>
                            <input onChange={this.handleEmailChange} value={this.state.email} className="registerDetails"  type="text" name="email" id="email" placeholder="E-mail address" style={{color:'black'}} required/>
                            <input onChange={this.handlePasswordChange} value={this.state.password} className="registerDetails"  type="password" name="password" id="password" placeholder="Password" style={{color:'black'}} required/>
                            <input onChange={this.handleDOBChange} value={this.state.dob} className="registerDetails"  type="date" name="birthday" id="birthday" placeholder="Date of Birth" style={{color:'black'}} required/>
                            <input onClick={this.handleSubmit} className="signupButton" type="submit"  value="SIGN UP" style={{color: 'white', position: 'relative' }} />
                            <label>
                                <input type="checkbox" checked="checked" name="remember" style={{marginBottom:'15px'}}/> Remember me
                            </label>
                            <p style={{textAlign:'center'}}>Already have an account? <a href="/login" style={{color:'dodgerblue'}}>Log in</a>.</p>
                            <p style={{textAlign: 'center'}}>By creating an account you agree to our <a href="#" style={{color:'dodgerblue'}}>Terms & Privacy</a>.</p>
                        </div>
  			        </form>
                </div>
            </body>
        </body>
        );
    }
}


export default CustomerRegister;