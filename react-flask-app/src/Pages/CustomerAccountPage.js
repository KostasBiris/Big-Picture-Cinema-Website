import React from 'react';
import main from '../static/main.css';
import Banner from '../components/Banner.js';
import usericon from '../static/usericon.png';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import { Link } from "react-router-dom";
import {authFetch} from "../auth";
import {withHooksHOC} from "../auth/withHooksHOC";

var checkedEmail = 0;
var publicIP = require('public-ip')

class CustomerAccountPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: [], auth: false, tickets: [], pdfs : [], currpdf: null, html: ''}
        this.assertAuth = this.assertAuth.bind(this);
        this.stepUp = this.stepUp.bind(this);
        this.getTickets = this.getTickets.bind(this);
        this.makeTicketList = this.makeTicketList.bind(this);
    }

    //assert authentication
    stepUp = async () => {
        this.assertAuth();
    }

    componentDidMount = async() => {
        window.addEventListener('load', this.stepUp);
        await this.stepUp();
    }   
    componentWillUnmount() {
        window.removeEventListener('load', this.stepUp)
    }

    //Find out if the user is authenticated, and get their details as well as booked tickets.
    assertAuth = async() => {
        await authFetch("/api/insession").then(response => response.json()).then(data => 
            this.setState({auth: true, data: data.response}))
        this.getTickets();  
    };

    //Get the pdfs of all tickets belonging to the customer
     getTickets = async () =>{
        // console.log(this.state);
        let email = this.state.data.email;
        var go = '/getticket/' + email;//routes
        //get the tickets
        await fetch(go, {//sends the request
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
         })
         .then(response => response.json()).then(data => { 
             this.setState({ tickets: Object.values(data.response)})})//accepts and stores the data
        let pdfs = [];
        let tickets = [];

        this.state.tickets.forEach(function(entry) {
            tickets.push(entry);
        })

        //get the pdf's
        tickets.forEach(async function (entry, index) {
            go = '/getpdf/' + entry.id;
            await fetch(go, { method: 'POST' })
                 .then(response => response.blob())
                 .then(blob => {
                    let u = URL.createObjectURL(blob);
                    this[index].pdfURL = u;
                 });
         }, tickets);
         this.setState({tickets: tickets});

    }
    //Make a list of hyperlinks for tickets to be rendered.
    makeTicketList =  () => {
        let tickets = [];
        // console.log()
        this.state.tickets.forEach(function(entry) { tickets.push(entry)});
        return (
                <ul>
                {this.state.tickets.map((t) => {
                        return (
                            <React.Fragment>
                                <Link style={{color:"orange"}}><li onClick={()=> {window.open(t.pdfURL)}}>{t.movieName}, {t.date}</li></Link>                            
                            </React.Fragment>
                    );
                })}
                </ul>
        );
    }

    render() {
        //this.makeTicketList();
        // console.log(this.props.auth[0]);
        return (
            <body id="grad1" style={{height:"100%", minHeight: "100vh"}}>
                

                <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>   
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                <link rel="stylesheet" type="text/css" href={main} />
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                </head>
                {/* <Banner history={this.props.history}/> */}
                
                

             
                {/*-----HEADER TABS END HERE----*/}


                <div className="container" style={{padding: "15% 0"}}>
                    <div className="main-body">
                    
                {/*--------------------------PROFILE BOX---------------------------------------------*/}
                        <div className="row gutters-sm">
                            <div className="col-md-60 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <input className="mr-3" type="image" style={{width:'5rem',height:'5rem'}} src={usericon}/>
                                            <div className="mt-3">
                                                
                                                {/* Customer Forename */}
                                                <h4>{this.state.data.forename}</h4>

                                                {/* Customer Surname */}
                                                <h4>{this.state.data.surname}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                

                {/* ---------------------ACCOUNT DETAILS BOX---------------------------------------------------------------- */}
                            </div>
                            <div className="col-8">
                                <div className="card mb-30">
                                    <div className="card-body">

                                        {/* ID Row */}
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">ID</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {this.state.data.id}
                                            </div>
                                        </div>
                                        <hr/>

                                        {/* Email Row */}
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {this.state.data.email}
                                            </div>
                                        </div>
                                        <hr/>

                                        {/* Phone Row */}
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {this.state.data.phone}
                                            </div>
                                        </div>
                                        <hr/>

                                        {/* DoB Row */}
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Date of Birth</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {this.state.data.dob}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Tickets</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {this.state.tickets.length > 0 ? this.makeTicketList() : <></>}                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script> */}
            </body>
        );
    }
}
export default withHooksHOC(CustomerAccountPage);

