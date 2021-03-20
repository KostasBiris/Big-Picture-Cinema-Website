import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./Style/Payment.scss"
import Banner from "../components/Banner";
import main from "../static/main.css"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51ISQ7OC2YcxFx25TvsWtOhWiQkKfYOA0dawMWGSqF7xKTiFz3lnHp1Q34Ike3DUP4JUUg14Bzn3MxUtl1CIcSjpa00SZjsWNg9");
class Payment extends React.Component{
render() {
  return (
    <body>
    <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href={main} ></link>
    <meta charset="utf-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
    </head>
    <Banner/>
    <body id="grad1">
    <main>
    <form class="modal-content-payment">
            <br/>
            <div class="header_text">
                <h2 style={{position:'absolute', left:'25px', color: '#4e5b60', fontWeight: 'bold'}}>CHECKOUT DETAILS</h2>
              </div>
              <br/>
              <br/>
            <div class="container p-3 my-3 border">
                <div class="md-form mb-2">
                    <input class="register_details form-control" type="text" name="first_name" id="first_name"
                        placeholder="First name" style={{color:'black'}} required />
                </div>
                <div class="md-form mb-2">
                    <input class="register_details form-control" type="text" name="last_name" id="last_name"
                        placeholder="Last name" style={{color:'black'}} required />
                </div>
                <div class="md-form mb-2">
                    <input class="register_details form-control" type="text" name="email" id="email"
                        placeholder="E-mail address" style={{color:'black'}} required />
                </div>
                <div class="md-form mb-2">
                    <input class="register_details form-control" type="text" name="address" id="address"
                        placeholder="Address Line 1" style={{color:'black'}} required />
                </div>
                <div class="md-form mb-2">
                    <input class="register_details form-control" type="text" name="address" id="address-2"
                        placeholder="Address Line 2 (Optional)" style={{color:'black'}} />
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-12 mb-4">
                        <select class="register-details custom-select d-block w-100" id="country" required>
                            <option value="">Country</option>
                            <option>United Kingdom</option>
                        </select>
                        <div class="invalid-feedback">
                            Please select a valid country.
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-4">
                        <input type="text" class="register-details form-control" id="zip" placeholder="Postcode" required/>
                        <div class="invalid-feedback">
                            Postcode required.
                        </div>
                    </div>
                </div>
                
          </div>    
        </form>
        <div className="Payment"> 
                  <Elements stripe={promise}>
                  <CheckoutForm />
                  </Elements>   
        </div>  
    

    <div class="container-fluid p-3 my-3 border modal-content-card">
            <div class="header_text">
                <h3 style={{position:'absolute', left:'25px', color: '#4e5b60', fontWeight: 'bold'}}>ORDER SUMMARY</h3>
              </div>
              <br/>
              <br/>
              <br/>
              <br/>
              <div class="mb-4">
          <ul class="list-group mb-3 z-depth-1">
            <li class="d-flex justify-content-between">
              <div>
                <h4 class="my-0">2x Adult Tickets</h4>
                <h5 class="text-muted">The Avengers, 03/07/2021, 21:00</h5>
              </div>
              <span class="text-muted">$15</span>
            </li>
            <li class="d-flex justify-content-between ">
              <div>
                <h4 class="my-0">1x Vip Tickets</h4>
                <h5 class="text-muted">Casablanca, 06/08/2021, 19:00</h5>
              </div>
              <span class="text-muted">$13.50</span>
            </li>
            <li class=" d-flex justify-content-between ">
              <div>
                <h4 class="my-0">3x Kids Tickets</h4>
                <h5 class="text-muted">Toy Story 4, 17/05/2021, 21:00</h5>
              </div>
              <span class="text-muted">$16.50</span>
            </li>
            <li>
                <hr class="mb-4"/>
            </li>
            <li class="d-flex justify-content-between">
              <h4>Total (USD)</h4>
              <h4>$45</h4>
            </li>
          </ul>
        </div>
      </div>
    </main>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
    </body>    
    </body>
    
  );
}
}
export default Payment;
