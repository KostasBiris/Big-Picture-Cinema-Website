import React, { useState, useEffect } from "react";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {useHistory} from "react-router-dom";

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
    width:'100%',
    '&:hover': {
      filter: 'contrast(115%)'
    },
    '&:disabled':{
      opacity:'0.5',
      cursor:'default'
    }
  }
  const form = {
    width: '15vw',
    alignSelf:'center',
    boxShadow:'0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
    borderRadius:'7px',
    // padding:'4rem'
  }  
  
  const body = {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '16px',
    WebkitFontSmoothing: 'antialiased',
    display: 'flex',
    justifyContent:'center',
    alignContent:'center',
    // height:'21.5vh',
    width:'15vw',
    // marginLeft:'150px'
  }
  const input ={
    borderRadius:'6px',
    marginBottom:'6px',
    padding:'12px',
    border:'1px solid rgba(50, 50, 93, 0.1)',
    maxHeight:'44px',
    fontSize:'16px',
    width:'100%',
    background:'white',
    boxSizing:'border-box',
  }
  



export default function CheckoutFormAuthNoKey(state, props) {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [intent, setIntent] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const [customerid, setCustomerid] = useState('');
    const [paymentid, setPaymentid] = useState('')
    const [data, setData] = useState(state);
    let history = useHistory();
    // console.log(props);
    console.log(state);
    useEffect(() => {
        window
            // .setProcessing(true)
            .fetch("/setup-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            .then(res => {
                return res.json();
            })
            .then(function (data) {
                console.log('Setup Payment intent' + data.client_secret);
                setIntent(data);
                setClientSecret(data.client_secret);
            })
    }, []);

    const createCustomer = async (paymentMethod) => {
        let email = state.state.email;
        let pm = paymentMethod;
        console.log(email, pm)
        setPaymentMethod(paymentMethod);
        console.log('Creating customer..')
        fetch('/create_customer', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                payment_method: pm,
                email: email
            })
        }).then(function (r) {
            return r.json();
        }).then(function (response) {
            // console.log(response);
            if (response.error) {
                console.log(response.error.message);
                setError(`Card setup failed ${response.error.message}`);
            } else {
                setClientSecret(response.client_secret);
                console.log('Created customer: ' + response.id);
                setCustomerid(response.id);
                setPaymentid(paymentMethod);
                makePayment(response.id, paymentMethod);
            }
        });
    }
    const makePayment = async (customerid, paymentid) => {
        setIntent('');
        fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                payment_method: paymentid,
                customer: customerid,
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
                // const payload = await stripe.confirmCardPayment(clientSecret, {
                //     payment_method: paymentid,
                // });
                // if (payload.error) {
                //     setError(`Payment failed ${payload.error.message}`);
                // }
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


    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };


    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        stripe.confirmCardSetup(
            intent.client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        }
        ).then(
            function (r) {
                // console.log(r);
                if (r.error) {
                    setError(setError(`Card setup failed ${r.error.message}`));
                    setProcessing(false);
                }

                else {
                    console.log('Card setup succeeded!')
                    console.log('Setup intent payment method ' + r.setupIntent.payment_method);
                    createCustomer(r.setupIntent.payment_method)
                    // .then(console.log(customerid,paymentid))
                    // .then(makePayment(customerid, paymentid))
                }
            }
        )

    }


    return (
        <body style={body} style={{ paddingLeft: '0.1rem', paddingRight: '0.1rem', marginBottom: '1rem' }} >
            <form id="payment-form" onSubmit={handleSubmit} style={form} style={{ padding: '0 0 0 0', minWidth: '250px' }}>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                <button style={button}
                    disabled={processing || disabled || succeeded}
                    id="submit"
                >
                    <span id="button-text">
                        {processing ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            "Pay now"
                        )}
                    </span>
                </button>
                {/* Show any error that happens when processing the payment */}
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}
                {/* Show a success message upon completion */}
                <p className={succeeded ? "result-message" : "result-message hidden"}>
                    <center>Payment succeeded</center>
                </p>
            </form>
        </body>
    );
}