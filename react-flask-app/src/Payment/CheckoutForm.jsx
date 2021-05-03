// import React, { useState, useEffect } from "react";
// import {
//   CardElement,
//   useStripe,
//   useElements
// } from "@stripe/react-stripe-js";

// const cardStyle = {
//   style: {
//     base: {
//       color: "#32325d",
//       fontFamily: 'Arial, sans-serif',
//       fontSmoothing: "antialiased",
//       fontSize: "16px",
//       "::placeholder": {
//         color: "#32325d"
//       }
//     },
//     invalid: {
//       color: "#fa755a",
//       iconColor: "#fa755a"
//     }
//   }
// };

// const button = {
//   background: '#5469d4',
//   fontFamily: 'Arial, sans-serif',
//   color: '#ffffff',
//   borderRadius: '0 0 4px 4px',
//   border: '0',
//   padding: '12px 16px',
//   fontSize: '16px',
//   cursor: 'pointer',
//   display: 'block',
//   transition: 'all 0.2s ease',
//   boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
//   width:'100%',
//   '&:hover': {
//     filter: 'contrast(115%)'
//   },
//   '&:disabled':{
//     opacity:'0.5',
//     cursor:'default'
//   }
// }
// const form = {
//   width: '30vw',
//   alignSelf:'center',
//   boxShadow:'0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
//   borderRadius:'7px',
//   padding:'40px'
// }  

// const body = {
//   fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
//   fontSize: '16px',
//   WebkitFontSmoothing: 'antialiased',
//   display: 'flex',
//   justifyContent:'center',
//   alignContent:'center',
//   height:'21.5vh',
//   width:'30vw',
//   marginLeft:'150px'

// }
// const input ={
//   borderRadius:'6px',
//   marginBottom:'6px',
//   padding:'12px',
//   border:'1px solid rgba(50, 50, 93, 0.1)',
//   maxHeight:'44px',
//   fontSize:'16px',
//   width:'100%',
//   background:'white',
//   boxSizing:'border-box',
// }


// export default function CheckoutForm (state, props)  {
//   const [succeeded, setSucceeded] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState('');
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientSecret] = useState('');
//   const [intent, setIntent] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [customer, setCustomer] = useState(null);
//   const stripe = useStripe();
//   const elements = useElements();
//  // const _props = props;
//   //console.log(props);
//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     if (state.isAuthed) {
//       setProcessing(true);
//       const cardElement = elements.create('card');
//       cardElement.mount('#card-element');
//       stripe.confirmCardSetup(
//         intent.client_secret, {
//           payment_method: {
//             card: elements.getElement(CardElement),
//             billing_details: {
//               name: state.forename + ' ' + state.surname
//             },
//           },
//         }
//       ).then(function(r) {
//         console.log(r);
//         if (r.error) {
//           setError(`Card setup failed ${r.error.message}`);
//           setProcessing(false);
//         }
//         else {
//           console.log('Card setup succeeded!')
//           console.log('Setup intent payment method' + r.setupIntent.payment_method);
//           createCustomer(r.setupIntent.payment_method);
//       }
//       });
//     }
//     else {
//       window
//       .fetch("/create-payment-intent", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({items: [{ id: "ticket" }]})
//       })
//       .then(res => {
//         return res.json();
//       })
//       .then(function(data){
//         console.log(data);
//         setIntent(data);
//         setClientSecret(data.client_secret);
//       });  
//     }

//   }, []);
//   //     .then(data => {
//   //       setIntent(data);
//   //     });
//   // }, []);



//   const handleChange = async (event) => {
//     // Listen for changes in the CardElement
//     // and display any errors as the customer types their card details
//     setDisabled(event.empty);
//     setError(event.error ? event.error.message : "");
//   };

//   const handleSubmit = async ev => {
//     ev.preventDefault();
//   const payload = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement)
//       }
//     });

//     if (payload.error) {
//       setError(`Payment failed ${payload.error.message}`);
//       setProcessing(false);
//     } else {
//       setError(null);
//       setProcessing(false);
//       setSucceeded(true);
//       if (state.save === "on") {
//         console.log('save card details.');
//       }
//      // console.log(_props);
//       console.log(state);
//         var go = '/makebooking'
//         fetch(go, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ data: state })}
//         )
//         .then(response => response.blob()).then(data => window.open(URL.createObjectURL(data)))
      
//       }
// }

//     const createCustomer = (paymentMethod) => {
//       setPaymentMethod(paymentMethod);
//       console.log('Creating customer..')
//       fetch('/create_customer', {
//         method: 'POST',
//         body: JSON.stringify({
//           payment_method: paymentMethod
//         })
//       }).then(function(r) {
//         return r.json();
//       }).then(function(response) {
//         console.log(response);
//         if(response.error) {
//           console.log(response.error.message);
//           setError(`Card setup failed ${response.error.message}`);
//         } else {
//           console.log('Created customer: ' + response.id);

//           makePayment(response.id, paymentMethod);
//         }
//       });
//     }

//     const makePayment = (customerid, paymentid) =>{
//       setIntent('');
//       fetch('/create-payment-intent', {
//         method: 'POST',
//         body : JSON.stringify({
//           payment_method : paymentid,
//           customer: customerid
//         })
//       }).then(function(r) {
//         return r.json();
//       }).then(function(res) {
//         console.log(res);
//         if (res.error) {
//           setError(setError(` Intent setup failed ${res.error.message}`));
//           setProcessing(false);
//         }
//         else {
//           console.log('Customer was charged :D');
//           setSucceeded(true);
//           setError(null);
//         }
//       })
//     }

//   return (
//     <body style={body}>
//     <form id="payment-form" onSubmit={handleSubmit} style={form}>
//       <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
//       <button style={button}
//         disabled={processing || disabled || succeeded}
//         id="submit"
//       >
//         <span id="button-text">
//           {processing ? (
//             <div className="spinner" id="spinner"></div>
//           ) : (
//             "Pay now"
//           )}
//         </span>
//       </button>
//       {/* Show any error that happens when processing the payment */}
//       {error && (
//         <div className="card-error" role="alert">
//           {error}
//         </div>
//       )}
//       {/* Show a success message upon completion */}
//       <p className={succeeded ? "result-message" : "result-message hidden"}>
//         <center>Payment succeeded</center>
//       </p>
//     </form>
//     </body>
//   );
// }

//     // const payload = await stripe.confirmCardPayment(clientSecret, {
//     //   payment_method: {
//     //     card: elements.getElement(CardElement)
//     //   }
//     // });

//     // if (payload.error) {
//     //   setError(`Payment failed ${payload.error.message}`);
//     //   setProcessing(false);
//     // } else {
//     //   setError(null);
//     //   setProcessing(false);
//     //   setSucceeded(true);
//     //   if (state.save === "on") {
//     //     console.log('save card details.');
//     //   }
//     //  // console.log(_props);
//     //   console.log(state);
//     //     var go = '/makebooking'
//     //     fetch(go, {
//     //       method: 'POST',
//     //       headers: {
//     //           'Content-Type': 'application/json'
//     //       },
//     //       body: JSON.stringify({ data: state })}
//     //     )
//     //     .then(response => response.blob()).then(data => window.open(URL.createObjectURL(data)))
      
//     //   }

//       //props.history.push('/');
//     //  _props.history.push('/');
import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
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
  width: '30vw',
  alignSelf:'center',
  boxShadow:'0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
  borderRadius:'7px',
  padding:'40px'
}  

const body = {
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  fontSize: '16px',
  WebkitFontSmoothing: 'antialiased',
  display: 'flex',
  justifyContent:'center',
  alignContent:'center',
  height:'21.5vh',
  width:'30vw',
  marginLeft:'150px'

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


export default function CheckoutForm (state, props)  {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
 // const _props = props;
  //console.log(props);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: [{ id: "ticket" }]})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

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

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
    console.log(succeeded, disabled, error, processing);
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
     // console.log(_props);
      console.log(state);
        var go = '/makebooking'
        fetch(go, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: state })}
        )
        .then(response => response.blob()).then(data => state.state.isEmployee ?  window.open(URL.createObjectURL(data)): 1)
      
      }

      //props.history.push('/');
    //  _props.history.push('/');
    
  };

  return (
    <body style={body}>
    <form id="payment-form" onSubmit={handleSubmit} style={form}>
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
