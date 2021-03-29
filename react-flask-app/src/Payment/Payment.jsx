import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import main from "../static/main.css"
import "./Style/Payment.scss"
import Banner from "../components/Banner";



// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51ISQ7OC2YcxFx25TvsWtOhWiQkKfYOA0dawMWGSqF7xKTiFz3lnHp1Q34Ike3DUP4JUUg14Bzn3MxUtl1CIcSjpa00SZjsWNg9");
var publicIP = require('public-ip')

let interval;
class Payment extends React.Component{
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
render() {
  return (
   
<body id="grad1">
<head>
<link rel="stylesheet" type="text/css" href={main} />
<link rel="icon" href="data:;base64,iVBORw0KGgo" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
</head>

    <Banner/>
    
    <fieldset style={{paddingTop:'50px',paddingRight:'20px'}}>
        <div className="container modalContentPayment" >
            <div className="row" >
                <div className="col-sm-6 col-xs-12 ">
                    <br/>
                    <div className="headerText">
                        <h2 style= {{position: 'absolute', left:'25px', color: '#4e5b60', fontWeight: 'bold'}}>CHECKOUT DETAILS
                        </h2>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <form>
                        <div className="md-form mb-2">
                            <input className="register_details" type="text" name="first_name" id="first_name"
                                placeholder="First name" style={{color:'black'}} required />
                        </div>
                        <div className="md-form mb-2">
                            <input className="register_details" type="text" name="last_name" id="last_name"
                                placeholder="Last name" style={{color:'black'}}  required />
                        </div>
                        <div className="md-form mb-2">
                            <input className="register_details" type="text" name="email" id="email"
                                placeholder="E-mail address" style={{color:'black'}}  required />
                        </div>
                        <div className="md-form mb-2">
                            <input className="register_details" type="text" name="address" id="address"
                                placeholder="Address Line 1" style={{color:'black'}}  required />
                        </div>
                        <div className="md-form mb-2">
                            <input className="register_details" type="text" name="address" id="address-2"
                                placeholder="Address Line 2 (Optional)" style={{color:'black'}}  />
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
                    <div className="Payment"> 
                  <Elements stripe={promise}>
                  <CheckoutForm />
                  </Elements>   
                    </div>
                </div>
                <div className="col-sm-6 col-xs-13">
                    <br/>
                    <div className="headerText">
                        <h3 style={{position: 'absolute', left:'25px', color: '#4e5b60', fontWeight: 'bold'}}>ORDER SUMMARY</h3>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <h5 className="my-0" style={{position: 'absolute', left:'25px'}}>Select Ticket Type: </h5>
                    <br/>
                    <br/>
                    <br/>
                    <ul className="list-group mb-3 z-depth-1">
                        <li className="d-flex justify-content-center">
                            <div>
                                <div className="row">
                                    <div className="col-lg-10 col-md-12 mb-4">
                                        <select className="register_details custom-select d-block w-100" id="ticket-type"
                                            required>
                                            <option value="">Ticket Type..</option>
                                            <option>Adults Ticket 7.50£</option>
                                            <option>Kids Ticket(0-12) 5.50£</option>
                                            <option>Seniors Ticket 6.50£</option>
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
                                <buton className="buttons_remove">Remove Item</buton>
                            </span>
                        </li>
                        <li className="d-flex justify-content-center">
                            <div>
                                <div className="row">
                                    <div className="col-lg-10 col-md-12 mb-4">
                                        <select className="register_details custom-select d-block w-100" id="ticket-type"
                                            required>
                                            <option value="">Ticket Type..</option>
                                            <option>Adults Ticket 7.50£</option>
                                            <option>Kids Ticket(0-12) 5.50£</option>
                                            <option>Seniors Ticket 6.50£</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please select a valid ticket.
                                        </div>
                                    </div>
                                </div>
                                <h5 className="text-muted">The Avengers, 03/07/2021, 21:00</h5>
                                <h5 className="text-muted">H12, Silver Screen 1</h5>
                            </div>
                            <span>
                                <buton className="buttons_remove">Remove Item</buton>
                            </span>
                        </li>
                        <li className="d-flex justify-content-center">
                            <div>
                                <div className="row">
                                    <div className="col-lg-10 col-md-12 mb-4">
                                        <select className="register_details custom-select d-block w-100" id="ticket-type"
                                            required>
                                            <option value="">Ticket Type..</option>
                                            <option>Adults Ticket 7.50£</option>
                                            <option>Kids Ticket(0-12) 5.50£</option>
                                            <option>Seniors Ticket 6.50£</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please select a valid ticket.
                                        </div>
                                    </div>
                                </div>
                                <h5 className="text-muted">The Avengers, 03/07/2021, 21:00</h5>
                                <h5 className="text-muted">H11, Silver Screen 1</h5>
                            </div>
                            <span>
                                <buton className="buttons_remove">Remove Item</buton>
                            </span>
                        </li>
                        <li className="d-flex justify-content-center">
                            <div>
                                <div className="row">
                                    <div className="col-lg-10 col-md-12 mb-4">
                                        <select className="register_details custom-select d-block w-100" id="ticket-type"
                                            required>
                                            <option value="" disabled="true">Ticket Type..</option>
                                            <option>VIP Ticket 10.50£</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please select a valid ticket.
                                        </div>
                                    </div>
                                </div>
                                <h5 className="text-muted">The Avengers, 03/07/2021, 21:00</h5>
                                <h5 className="text-muted">F14, Silver Screen 1</h5>
                            </div>
                            <span>
                                <buton className="buttons_remove">Remove Item</buton>
                            </span>
                        </li>

                        <li>
                            <hr className="mb-4"></hr>
                        </li>
                        <li className="d-flex justify-content-between">
                            <h4>Total (USD)</h4>
                            <h4>$45</h4>
                        </li>
                    </ul>
             </div>  
        </div> 
    </div>
    </fieldset> 

    <br/>
    <br/>
    
    <nav>
        <ul className="pagination justify-content-center ">
            <li className="page-item disabled">
                <a className="buttons_prev" style={{color: 'white', tabIndex:'-1', ariaDisabled:'true'}}>{'<'}
                    </a>
            </li>
            <li className="page-item"><a className="buttons_background" style={{color: 'white'}}>MOVIE</a></li>
            <li className="page-item"><a className="buttons_background" style={{color: 'white'}}>SEATS</a></li>
            <li className="page-item"><a className="buttons_background" style={{color: 'white'}}>CHECKOUT</a></li>
            <li className="page-item">
                <a className="buttons_next" style={{color: 'white'}}>{'>'}</a>
            </li>
        </ul>
    </nav>
    <br/>
    <footer className="bg-light text-center">
        <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            All rights reserved. © 2021 Copyright:
            <a className="text-dark">The Big Picture</a>
        </div>
    </footer> 

</body>

    
  );
  
}
}

export default Payment;
