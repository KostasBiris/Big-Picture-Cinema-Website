import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutFormAuth from "./CheckoutFormAuth";
import CheckoutFormAuthNoKey from "./CheckoutFormAuthNoKey";
import CheckoutForm from './CheckoutForm';
import main from "../static/main.css"
import "./Style/Payment.scss"
import Banner from "../components/Banner";
import Select from 'react-select'
import { relativeTimeThreshold } from "moment";
import ThemeProvider from "react-bootstrap/esm/ThemeProvider";
import {authFetch} from "../auth";
import {withHooksHOC} from "../auth/withHooksHOC";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51ISQ7OC2YcxFx25TvsWtOhWiQkKfYOA0dawMWGSqF7xKTiFz3lnHp1Q34Ike3DUP4JUUg14Bzn3MxUtl1CIcSjpa00SZjsWNg9");
var publicIP = require('public-ip')
global.jQuery = require('jquery');
require('bootstrap');

let interval;
class Payment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            ticketTypes: [],
            SelectedQuantity: 0,
            numberSeats: this.props.location.state.selectedSeats.length,
            seatsSelected: this.props.location.state.selectedSeats,
            screening: this.props.location.state.screeningChosen,
            movie: '',
            orderPart: [],
            valid: false,
            total: 0,
            isEmployee: false,
            save: false,
            movieObj : []
        };



        
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleTicketTypes = this.handleTicketTypes.bind(this);
        this.orderSummary = this.orderSummary.bind(this);
        this.getMovieName = this.getMovieName.bind(this);
        this.handleChangeSelect= this.handleChangeSelect.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.validate = this.validate.bind(this);
        this.assertAuth = this.assertAuth.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getPaymentWidget = this.getPaymentWidget.bind(this);
        this.getMovieObj = this.getMovieObj.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.stepUp);
        window.addEventListener('load', this.getMovieName(this.state.screening.movieid));
        this.getMovieName(this.state.screening.movieid);

        let k = [];
        for (var i = 0; i < this.props.location.state.selectedSeats.length; i++) {
            if (this.props.location.state.seatmap[this.props.location.state.selectedSeats[i].row.charCodeAt(0)-65][this.props.location.state.selectedSeats[i].col-1].isVip === true) {
                k = [...k, "4"]
            }
            else {
                k = [...k, "1"];
            }
        }
        this.setState({orderPart:k});

        if (this.props.isAuthed) {
            this.assertAuth();
        }
        console.log(this.state);
    }
    assertAuth = async () => {
        await authFetch("/api/insession").then(response => response.json()).then(data => {
            this.setState({firstname : data.response.forename, lastname : data.response.surname, email: data.response.email, stripeID : data.response.stripe, pm : data.response.pm})})//accepts and stores the data        
    };

    handleFirstName = (e) => {
        this.setState({ firstname: e.target.value });
        this.validate();
    }

    handleLastName = (e) => {
        this.setState({ lastname: e.target.value });
        this.validate();

    }

    handleEmail = (e) => {
        this.setState({ email: e.target.value });
        this.validate();

    }

    handleTicketTypes = (e) => {
        this.state.ticketTypes.push(parseInt(e.target.value));
        // this.setState({ticketTypes: parseInt(e.target.value)})
    }

    // returns true if the input is constructed like this: username@domain.com
    validate = () => {
        function validateEmail(email) {
            //https://stackoverflow.com/questions/52188192/what-is-the-simplest-and-shortest-way-for-validating-an-email-in-react
            const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regexp.test(email);
        }
        //Validate the password through length check.

        function validateFirstname(firstname) {
            const regexp = /^[a-z ,.'-]+$/i;
            return regexp.test(firstname);
        }

        function validateSurname(surname) {
            const regexp = /^[a-z ,.'-]+$/i;
            return regexp.test(surname);
        }


        function validateTickets(tickets) {
            let flag = true;
            tickets.forEach(function (entry) {
                if (entry ==="") {
                    flag = false;
                }
            })
            return flag;
        }
        let ok = true;
        this.state.orderPart.forEach(function(entry) {
            if (entry === "") {
                ok =false;
            }
        })

        return validateEmail(this.state.email) && validateFirstname(this.state.firstname) 
        && validateSurname(this.state.lastname) && ok;
    }

    // get the movie object with the name returned from getMovieName
    getMovieObj () {
        var route = '/movie/' + this.state.movie + '/page';
        console.log(route)
        fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movie: this.state.movie })
        })
            .then(response => response.json()).then(data => {
                this.setState({movieObj : data})
                console.log(data)
                
            });
    }

    // get movie using ID fetching
    async getMovieName (id)  {
        var go = '/getmoviename/' + id;

        await fetch(go, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            this.setState({movie: data.response})

            // get movie object after we get the name so that we have access to the certificate
            this.getMovieObj();
        })

    }

    

    handleChangeSelect = (e, index) => {
        let arr = [...this.state.orderPart];
        let item = {...arr[index]};
        item = e.target.value;
        arr[index] = item;
        this.setState({orderPart : arr})
    }

    // calculate final price
    calculateTotal = () => {
        let total = 0;
        let orderParts = [];
        this.state.orderPart.forEach(function(entry) {
            orderParts.push(entry);
        })

        orderParts.forEach(function(entry) {
            if (entry == "1") {
                total+=7.50;
            }
            else if(entry == "2") {
                total+=5.50
            }
            else if(entry == "3") {
                total+=6.50
            }
            else if (entry == "4") {
                total+=10.00
            }
        })
        return total;
    }   

    handleSave = (e) => {
        this.setState({save: e.target.value})
    }

    orderSummary = () => {
        let map_ = this.props.location.state.seatmap_copy;
        return (
            <ul className="list-group mb-3 z-depth-1">
                    {this.state.seatsSelected.map((entry,index)=> {
                        
                        let row = entry.row.charCodeAt(0) -65;
                        let col = entry.col-1;

                        if (map_[row][col].isVip) {
                        return (
                            <li className="d-flex justify-content-center">
                            <div>
                                <div className="row">
                                <div className="col-lg-10 col-md-12 mb-4" style={{minWidth:'120px',fontSize:'10px'}}>
                                        <select value={this.state.orderPart[index]} onChange={(e) => this.handleChangeSelect(e, index)} className="register_details custom-select d-block w-100" id="ticket-type" placeholder="Ticket Type" required>     
                                            <option value="4">VIP (£10.0)</option>
                                        </select>
                                    </div>


                                </div>
                            </div>
                            <h5 className="text-muted">{this.state.movie}, <br/>{this.state.screening.date}, <br/>{this.state.screening.time}</h5>
                            <h5 className="text-muted">     SCREEN {this.state.screening.screenid} 
                            <br/><br/> SEAT {entry.row}, {entry.col}</h5>
                        </li>
                        )
                        }
                        else {
                            return (
                                <li className="d-flex justify-content-center">
                                <div>
                                    <div className="row">
                                        <div className="col-lg-10 col-md-12 mb-4" style={{minWidth:'120px', fontSize:'10px'}}>
                                            <select value={this.state.orderPart[index]} onChange={(e) => this.handleChangeSelect(e, index)}className="register_details custom-select d-block w-100" id="ticket-type" placeholder="Ticket Type" required>     
                                                <option value="1">Adult (£7.50)</option>
                                                { this.state.movieObj.certificate == "U" || 
                                                this.state.movieObj.certificate == "PG"     || 
                                                this.state.movieObj.certificate == "12A"    || 
                                                this.state.movieObj.certificate == "12"     || 
                                                this.state.movieObj.certificate == "PG-12"  ||
                                                this.state.movieObj.certificate == "15" ?
                                                <option value="2">Kids (£5.50)</option> : <></>}
                                                <option value="3">Senior (£6.50)</option>
                                            </select>
                                        </div>
    
    
                                    </div>
                                </div>
                                <h5 className="text-muted">{this.state.movie}, <br/>{this.state.screening.date}, <br/>{this.state.screening.time}</h5>
                                <h5 className="text-muted">     SCREEN {this.state.screening.screenid} 
                                <br/><br/> SEAT {entry.row}, {entry.col}</h5>
                            </li>
                            )
                        }
                        
                    
                })}
            </ul>
        )
    }

    getPaymentWidget = () => {
        if (this.props.isAuthed && this.state.stripeID !== '') {
            console.log('USING CHECKOUTFORMAUTH')
            return (
            <div className="Payment">
                <Elements stripe={promise}>
                    <CheckoutFormAuth props={this.props} state={this.state}/>
                </Elements>
            </div>
            );
        }
        else if (this.props.isAuthed && this.state.stripeID === '') {
            console.log('USING CHECKOUT FORM AUTHNOKEY')
            return (
                <div className="Payment">
                    <Elements stripe={promise}>
                        <CheckoutFormAuthNoKey props={this.props} state={this.state}/>
                    </Elements>
                </div>
            );
        }
        else if (!this.props.isAuthed) {
            console.log('USING NOAUTH')
            return (
                <div className="Payment">
                    <Elements stripe={promise}>
                        <CheckoutForm props={this.props} state={this.state}/>
                    </Elements>
                </div>
            );
        }
    }




    render() {
        return (

                <body id="grad1" style={{height:"100%", minHeight: "100vh"}}>
                    <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                        <meta name="viewport" content=" height=device-height, width=device-width, initial-scale=1, shrink-to-fit=no" />
                    </head>
                        <fieldset style={{ paddingTop: '50px', paddingRight: '20px' }}>
                        <div className="container modalContentPayment" >
                            <div className="row" >
                                <div className="col-sm-6 col-xs-12 ">
                                    <br />
                                    <div className="header_text">
                                        <h2 style={{ position: 'absolute', left: '15px', color: '#4e5b60', fontWeight: 'bold',  marginBottom:'auto'}}>CHECKOUT DETAILS
                                </h2>
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <form className="">
                                        <div className="md-form mb-2">
                                            <input className="registerDetails formControl" onChange={this.handleFirstName} value={this.state.firstname} type="text" name="first_name" id="first_name"
                                                placeholder="First name" style={{ color: 'black',  marginTop: 'auto' }} required />
                                        </div>
                                        <div className="md-form mb-2">
                                            <input className="registerDetails formControl"  onChange={this.handleLastName} value={this.state.lastname} type="text" name="last_name" id="last_name"
                                                placeholder="Last name" style={{ color: 'black' }} required />
                                        </div>
                                        <div className="md-form mb-2">
                                            <input className="registerDetails formControl"  onChange={this.handleEmail} value={this.state.email} type="text" name="email" id="email"
                                                placeholder="E-mail address" style={{ color: 'black' }} required />
                                        </div>
                                        <div className="container">
                                        
                                        </div>
                                    </form>
                                    {this.validate() ? this.getPaymentWidget() : <></>}
                                    
                                    {/* <div className="md-form mb-2">
                                    <div className="container justify-content-center" style={{padding:'3rem'}}>
                                    {this.validate() ? this.getPaymentWidget() : <></>}
                                    </div>
                                    </div> */}
                                </div>
                                <div className="col-sm-6 col-xs-13">
                                    <br />
                                    <div className="header_text">
                                        <h3 style={{ position: 'absolute', left: '15px', color: '#4e5b60', fontWeight: 'bold', marginBottom:'auto' }}>ORDER SUMMARY</h3>
                                    </div>
                                    <br/>
                                    <br/>
                                    <br/>

                                    {this.orderSummary()}
                                    <div>
                                        <ul className='list-unstyled'>
                                        <li>
                                            <hr className="mb-4"></hr>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <h4>Total (£)</h4>
                                            <h4>{this.calculateTotal()}</h4>
                                        </li>
                                        </ul>
                                    
                                </div>
                                </div>
                            </div>
                        </div>

                    </fieldset>

                    <br />
                    <br />

                    <nav>
                        <div className="container justify-content-center text-center">
                            <button className="page-item buttons_background mr-3">MOVIE</button>
                            <button className="page-item buttons_background mr-3" onClick={this.goToSeatMap}>SEATS</button>
                            <button className="page-item buttons_background mr-3">CHECKOUT</button>
                            
                        </div>
                    </nav>
                    <br>
                    </br>

                </body>


        );

    }
    }

export default Payment;
