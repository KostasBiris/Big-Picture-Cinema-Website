import React, { useState, useEffect } from "react";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";

const cardStyle = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#32325d"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    }
};

const button = {
    background: '#5469d4',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    borderRadius: '0 0 4px 4px',
    border: '0',
    padding: '12px 16px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'block',
    transition: 'all 0.2s ease',
    boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
    width: '100%',
    '&:hover': {
        filter: 'contrast(115%)'
    },
    '&:disabled': {
        opacity: '0.5',
        cursor: 'default'
    }
}
const form = {
    width: '30vw',
    alignSelf: 'center',
    boxShadow: '0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
    borderRadius: '7px',
    padding: '40px'
}

const body = {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '16px',
    WebkitFontSmoothing: 'antialiased',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: '10vh',
    width: '10vw',
    marginLeft: '150px'

}
const input = {
    borderRadius: '6px',
    marginBottom: '6px',
    padding: '12px',
    border: '1px solid rgba(50, 50, 93, 0.1)',
    maxHeight: '44px',
    fontSize: '16px',
    width: '100%',
    background: 'white',
    boxSizing: 'border-box',
}

export default function CheckoutFormAuth(state, props) {


    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(false);
    let history = useHistory();

    // useEffect(() => {
    //     window.makePaymentIntent();
    // }, []);
    const makePaymentIntent = (ev) => {
        ev.preventDefault();
        console.log(state);
        fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                payment_method: state.state.pm,
                customer: state.state.stripeID,
                total: state.total
            })
        }).then(async function (r) {
            return r.json();
        }).then(async function (res) {
            console.log(res);
            if (res.error) {
                setError(setError(` Intent setup failed ${res.error.message}`));
                setProcessing(false);
            }
            else {
                console.log('Customer was charged :D');
                setSucceeded(true);
                setError(null);
                setProcessing(false);
                var go = '/makebooking'
                fetch(go, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ data: state })
                }
                )
                    .then(response => response.blob()).then(data => state.isEmployee ? window.open(URL.createObjectURL(data)) : 1);
                    alert("payment succeeded");
                    history.push("/");
            }
        })

    }

    const makeSpan =() => {
        if (succeeded) {
            return (
                <div>
                    Succeeded
                </div>
            );
        }
        if (processing) {
            return (
                <div className="spinner" id="spinner"/>
            );
        }
        return (
            <div>
                Pay Now
            </div>
        )



    }



    return (
        <body style={body} style={{ paddingLeft: '0.1rem', paddingRight: '0.1rem', marginBottom: '1rem' }}  >
            <button style={button}
                disabled={processing || disabled || succeeded}
                id="submit"
                onClick={makePaymentIntent}
            >
                <span id="button-text">
                    {makeSpan()}
                </span>
            </button>
        </body>
    );


}
