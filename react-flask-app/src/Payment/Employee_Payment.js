import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import main from "../static/main.css"
import "./Style/Payment.scss"
import Banner from "../components/Banner";

const promise = loadStripe("pk_test_51ISQ7OC2YcxFx25TvsWtOhWiQkKfYOA0dawMWGSqF7xKTiFz3lnHp1Q34Ike3DUP4JUUg14Bzn3MxUtl1CIcSjpa00SZjsWNg9");
var publicIP = require('public-ip')

let interval;
class EPayment extends React.Component{
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
<body>

</body>
    );
}

}
export default EPayment;