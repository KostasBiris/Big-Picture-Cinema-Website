import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import main from "../static/main.css"
import "./Style/Payment.scss"
import KeyPad from "../components/CashCalculator";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
global.jQuery = require('jquery');
require('bootstrap');

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51ISQ7OC2YcxFx25TvsWtOhWiQkKfYOA0dawMWGSqF7xKTiFz3lnHp1Q34Ike3DUP4JUUg14Bzn3MxUtl1CIcSjpa00SZjsWNg9");
var publicIP = require('public-ip')

let interval;
class Payment extends React.Component {

    constructor(props) {
        super(props);

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
            total: 0,
            result: "",
            payment_type: "",
            isEmployee: true
        };



        
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleAddressOne = this.handleAddressOne.bind(this);
        this.handleAddressTwo = this.handleAddressTwo.bind(this);
        this.handleTicketTypes = this.handleTicketTypes.bind(this);
        this.orderSummary = this.orderSummary.bind(this);
        this.getMovieName = this.getMovieName.bind(this);
        this.handleChangeSelect= this.handleChangeSelect.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.validate = this.validate.bind(this);
        this.payByCard = this.payByCard.bind(this);
        this.payByCash = this.payByCash.bind(this);
        this.calculateReturn = this.calculateReturn.bind(this);
        this.reset = this.reset.bind(this);
        this.onClick = this.onClick.bind(this);
        this.paymentType = this.paymentType.bind(this);
        this.getCashTicket = this.getCashTicket.bind(this);
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
            else if(entry == "4") {
                total+=10.00
            }
        })
        return total;
    }

    getCashTicket = () => {
        var go = '/makebooking'
        fetch(go, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: {state: this.state} })}
        )
        .then(response => response.blob()).then(data => window.open(URL.createObjectURL(data)))
    }
    
    calculateReturn = () => {
        let total = this.calculateTotal();
        let difference = this.state.result-total;
        // this.setState({result : difference})
        this.reset();
        alert("Amount to return is £" + difference)
    }

    reset = () => {
        this.setState({
            result: ""
        })
    };

    onClick = button => {

        if(button === "Enter"){
            this.calculateReturn()
            this.getCashTicket();
        }

        else if(button === "Delete"){
            this.reset()
        }
        else {
            this.setState({
                result: this.state.result + button
            })
        }
    };

    payByCard = () => {
        console.log(this.props)
        // if (this.validate())
        // {
            return( <div classNameName="Payment">
                <Elements stripe={promise}>
                <CheckoutForm props={this.props} state={this.state}/>
                </Elements>
                </div>)
        // }
        // else
        // {
        //     return(<></>)
        // }
    }

    payByCash = () => {
        // if (this.validate()){
            return (
                <React.Fragment>
                    <div className="result"><p>{this.state.result}</p></div>
                    <KeyPad onClick={this.onClick} />
                </ React.Fragment>
            )
        // }
        // else
        // {
        //     return(<></>)
        // }
    }

    paymentType = (e) => {
        e.preventDefault();
        this.setState({payment_type: e.target.value})
        console.log(this.state.payment_type)
    }


    orderSummary = () => {
        let map_ = this.props.location.state.seatmap_copy;
        console.log(map_);
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
                                    <div className="col-lg-10 col-md-12 mb-4">
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
                                        <div className="col-lg-10 col-md-12 mb-4">
                                            <select value={this.state.orderPart[index]} onChange={(e) => this.handleChangeSelect(e, index)} className="register_details custom-select d-block w-100" id="ticket-type" placeholder="Ticket Type" required>     
                                                <option value="1">Adult (£7.50)</option>
                                                <option value="2">Kids (£5.50)</option>
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



    render() {
       // console.log(this.state)
        return (

                <body id="grad1">
                    <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    </head>

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
                                        

                                        <hr class="mb-4"/>
                                        <button onClick={this.paymentType} value="card" class="btn btn-primary btn-lg btn-block" type="submit">PAY BY CARD</button>
                                        <br/>
                                        <hr class="mb-4"/>
                                        <button onClick={this.paymentType} value="cash" class="btn btn-primary btn-lg btn-block" type="submit">PAY BY CASH</button>
                                        <hr class="mb-4"/>

                                        
                                    </form>

                                    {this.state.payment_type === "card" ? this.payByCard() : 
                                    this.state.payment_type === "cash" ? this.payByCash() : <></>}

                                    
                                    
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
                        <div className="container text-center">
                            <button className="tab_background text mr-3 btn-lg">{'<'}</button>
                            <button className="tab_background text mr-3 btn-lg">MOVIE</button>
                            <button className="tab_background text mr-3 btn-lg" onClick={this.goToSeatMap}>SEATS</button>
                            <button className="tab_background text mr-9 btn-lg">CHECKOUT</button>
                            <button className="tab_background text mr-3 btn-lg" style={{marginLeft:'12px'}}>{'>'}</button>
                        </div>
                    </nav>

                    {/* <footer className="bg-light text-center">
                    <div class="text-center p-3" style={{ backgroundcolor: 'rgba(0, 0, 0, 0.2)' }}>
                        All rights reserved. © 2021 Copyright:
                    <a className="text-dark" >The Big Picture</a>
                    </div>
                    </footer> */}

                </body>


        );

    }
    }

export default Payment;
