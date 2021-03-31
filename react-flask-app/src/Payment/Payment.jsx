import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import main from "../static/main.css"
import "./Style/Payment.scss"
import Banner from "../components/Banner";
import Select from 'react-select'
import { relativeTimeThreshold } from "moment";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51ISQ7OC2YcxFx25TvsWtOhWiQkKfYOA0dawMWGSqF7xKTiFz3lnHp1Q34Ike3DUP4JUUg14Bzn3MxUtl1CIcSjpa00SZjsWNg9");
var publicIP = require('public-ip')

let interval;
class Payment extends React.Component {

    constructor(props) {
        super(props);
        // console.log(this.props)
        // console.log(this.props.location.state.screening.seatmap)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            addressOne: '',
            addressTwo: '',
            ticketTypes: [],
            SelectedQuantity: 0,
            numberSeats: this.props.location.state.selectedSeats.length,
            seatsSelected: this.props.location.state.selectedSeats,
            screening: this.props.location.state.screeningChosen,
            movie: '',
            orderPart: [],
            valid: false,
            total: 0
        };



        
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleAddressOne = this.handleAddressOne.bind(this);
        this.handleAddressTwo = this.handleAddressTwo.bind(this);
        this.handleTicketTypes = this.handleTicketTypes.bind(this);
        this.handleSelectedQuantity = this.handleSelectedQuantity.bind(this);
        this.orderSummary = this.orderSummary.bind(this);
        this.getMovieName = this.getMovieName.bind(this);
        this.handleChangeSelect= this.handleChangeSelect.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.validate = this.validate.bind(this);
                //  this.renderSelector = this.renderSelector.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.stepUp);
        window.addEventListener('load', this.getMovieName(this.state.screening.movieid));
        this.getMovieName(this.state.screening.movieid);
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
        _bootstrap.integrity = "sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl";
        _bootstrap.crossOrigin = "anonymous";
        document.body.appendChild(_bootstrap);

        let k = [];
        for (var i = 0; i < this.props.location.state.selectedSeats.length; i++) {
           k = [...k, "1"];
        }
        this.setState({orderPart:k});
    }

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

    handleAddressOne = (e) => {
        this.setState({ addressOne: e.target.value });
        this.validate();

    }

    handleAddressTwo = (e) => {
        this.setState({ addressTwo: e.target.value });
    }

    handleTicketTypes = (e) => {
        this.state.ticketTypes.push(parseInt(e.target.value));
        // this.setState({ticketTypes: parseInt(e.target.value)})
    }

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

        function validateAdd(add) {
            return add.length >=3;
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
        && validateSurname(this.state.lastname) && validateAdd(this.state.addressOne) && ok;
    }






    handleSelectedQuantity = (e) => {
        this.setState({ quantity: this.state.selectedQuantity + parseInt(e.target.value) });
        // this.state.quantity.push(parseInt(e.target.value));
        // this.setState({quantity: parseInt(e.target.value)})
        console.log(this.state)
    }

    /*renderSelector = () => {
        return (
            <body>
                <div>
                    <div className="row">
                        <div className="col-lg-10 col-md-12 mb-4">
                            <select onChange={this.handleTicketTypes} className="register_details custom-select d-block w-100" id="ticket-type"
                                required>
                                <option value="">Ticket Type..</option>
                                <option value={0}>Adults Ticket 7.50£</option>
                                <option value={1}>Kids Ticket(0-12) 5.50£</option>
                                <option value={2}>Seniors Ticket 6.50£</option>
                                <option value={3}>VIP Ticket 10.50£</option>
                            </select>

                            <div className="invalid-feedback">
                                Please select a valid ticket.
                        </div>
                        </div>
                    </div>
                    <h5 className="text-muted">The Avengers, 03/07/2021, 21:00</h5>
                    <h5 className="text-muted">H10, Silver Screen 1</h5>
                </div>


                <span>
                    <select onChange={this.handleSelectedQuantity} className="register_details custom-select d-block w-100"
                        required>
                        <option value="">0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </span>
                </body>
            );
    }*/


    async getMovieName (id)  {
        var go = '/getmoviename/' + id;

        await fetch(go, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            this.setState({movie: data.response})
        })
        // const res = await response.json();
        // const movie = res['response'];
        // this.setState({movie: movie});

    }

    handleChangeSelect = (e, index) => {
        let arr = [...this.state.orderPart];
        let item = {...arr[index]};
        item = e.target.value;
        arr[index] = item;
        this.setState({orderPart : arr})
    }

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
        })
        return total;
    }




    orderSummary = () => {
        return (
            <ul className="list-group mb-3 z-depth-1">
                    {this.state.seatsSelected.map((entry,index)=> {
                        return (
                            <li className="d-flex justify-content-center">
                                <div>
                                    <div className="row">
                                        <div className="col-lg-10 col-md-12 mb-4">
                                            <select value={this.state.orderPart[index]} onChange={(e) => this.handleChangeSelect(e, index)} className="register_details custom-select d-block w-100" id="ticket-type" placeholder="Ticket Type" required>
                                                <option value="1"> Adult (£7.50)</option>
                                                <option value="2"> Kids (£5.50)</option>
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
                    })}
            </ul>
        )
    }



    render() {
       // console.log(this.state)
        return (

                <body id="grad1">
                    <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    </head>

                    <Banner history={this.props.history} />
                    <fieldset style={{ paddingTop: '50px', paddingRight: '20px' }}>
                        <div className="container modalContentPayment" >
                            <div className="row" >
                                <div className="col-sm-6 col-xs-12 ">
                                    <br />
                                    <div className="headerText">
                                        <h2 style={{ position: 'absolute', left: '25px', color: '#4e5b60', fontWeight: 'bold' }}>CHECKOUT DETAILS
                                </h2>
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <form>
                                        <div className="md-form mb-2">
                                            <input onChange={this.handleFirstName} value={this.state.firstname} className="register_details form-control" type="text" name="first_name" id="first_name"
                                                placeholder="First name" style={{ color: 'black' }} required />
                                        </div>
                                        <div className="md-form mb-2">
                                            <input onChange={this.handleLastName} value={this.state.lastname} className="register_details form-control" type="text" name="last_name" id="last_name"
                                                placeholder="Last name" style={{ color: 'black' }} required />
                                        </div>
                                        <div className="md-form mb-2">
                                            <input onChange={this.handleEmail} value={this.state.email} className="register_details form-control" type="text" name="email" id="email"
                                                placeholder="E-mail address" style={{ color: 'black' }} required />
                                        </div>
                                        <div className="md-form mb-2">
                                            <input onChange={this.handleAddressOne} value={this.state.addressOne} className="register_details form-control" className="register_details form-control" type="text" name="address" id="address"
                                                placeholder="Address Line 1" style={{ color: 'black' }} required />
                                        </div>
                                        <div className="md-form mb-2">
                                            <input onChange={this.handleAddressTwo} value={this.state.addressTwo} className="register_details form-control" type="text" name="address" id="address-2"
                                                placeholder="Address Line 2 (Optional)" style={{ color: 'black' }} />
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-12 mb-4">
                                                <select className="register_details custom-select d-block w-100" id="country" required>
                                                    <option value="">Country</option>
                                                    <option>United Kingdom</option>
                                                </select>
                                                <div className="invalid-feedback">
                                                    Please select a valid country.
                                        </div>
                                            </div>

                                        </div>

                                    </form>
                                    {this.validate() ?<div classNameName="Payment">
                                        <Elements stripe={promise}>
                                            <CheckoutForm props={this.props} state={this.state}/>
                                        </Elements>
                                    </div> : <></>}
                                    
                                </div>
                                <div className="col-sm-6 col-xs-13">
                                    <br />
                                    <div className="headerText">
                                        <h3 style={{ position: 'absolute', left: '25px', color: '#4e5b60', fontWeight: 'bold' }}>ORDER SUMMARY</h3>
                                    </div>
                                    <br/>
                                    <br/>
                                    <br/>

                                    {this.orderSummary()}
                                    <div>
                                        <li>
                                            <hr className="mb-4"></hr>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <h4>Total (£)</h4>
                                            <h4>{this.calculateTotal()}</h4>
                                        </li>
                                    
                                </div>
                                </div>
                            </div>
                        </div>

                    </fieldset>

                    <br />
                    <br />

                    <nav>
                        <ul className="pagination justify-content-center ">
                            <li className="page-item disabled">
                                <a className="buttons_prev" style={{ color: 'white', tabIndex: '-1', ariaDisabled: 'true' }}>{'<'}
                                </a>
                            </li>
                            <li className="page-item"><a className="buttons_background" style={{ color: 'white' }}>MOVIE</a></li>
                            <li className="page-item"><a className="buttons_background" style={{ color: 'white' }}>SEATS</a></li>
                            <li className="page-item"><a className="buttons_background" style={{ color: 'white' }}>CHECKOUT</a></li>
                            <li className="page-item">
                                <a className="buttons_next" style={{ color: 'white' }}>{'>'}</a>
                            </li>
                        </ul>
                    </nav>
                    <br />
                    <footer className="bg-light text-center">
                        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                            All rights reserved. © 2021 Copyright:
                    <a className="text-dark">The Big Picture</a>
                        </div>
                    </footer>

                </body>


        );

    }
    }

export default Payment;
