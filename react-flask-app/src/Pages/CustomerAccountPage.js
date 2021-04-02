import React from 'react';
import main from '../static/main.css';
import Banner from '../components/Banner.js';
import usericon from '../static/usericon.png';

var publicIP = require('public-ip')



const table = {
    borderCollapse: 'collapse',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto'
}


const td = {
    border: '1px solid #cccccc',
    padding: '8px'
}

const th = {
    fontWeight: 'bold',
    textTransform: 'uppercase'
}

const tr = {
    "&:nthChild(even)" : {
        backgroundColor: '#dddddd'
    },
    
    "&:hover" : {
        backgroundColor: 'blue',
        color: 'white'
    },

}
let sortDirection = false;
  let ticketsData = [
    {date: new Date(Date.parse('14-05-2021')), movieName:'Thor', file: '.../react-flask-app/api/templates/algoII.pdf'},
    {date: new Date("29-03-2021"), movieName:'Spider Man', file: 'algoII.pdf'},
    {date: new Date("08-04-2021"), movieName:'Iron Man', file: 'algoII.pdf'},
    {date: new Date("02-05-2021"), movieName:'Hulk', file: 'algoII.pdf'},
    {date: new Date("16-07-2021"), movieName:'Black Widow', file: 'algoII.pdf'}
  ];

 /* window.onload = () => {
    loadTableData(ticketsData);
  };*/

  function loadTableData(ticketsData) {
    const tableBody = document.getElementById('tableData');
    let dataHtml = '';

    for(let ticket of ticketsData){
                  //-----------Date-----------|----------MovieName--------|--------------------Link to Ticket's PDF--------------------->
      dataHtml += `<tr><td>${ticket.date}</td><td>${ticket.movieName}</td><td><a href=${ticket.file}><div>click here</div></a></td></tr>` ;

    }
    console.log(dataHtml)

    tableBody.innerHTML = dataHtml;
  }

  function sortColumn(columnName){
    const dataType = typeof ticketsData[0][columnName];
    sortDirection = !sortDirection;

    switch(dataType){
      case 'number':
        sortNumberColumn(sortDirection, columnName)
        break;
    }

    loadTableData(ticketsData);
  }

  function sortNumberColumn(sort, columnName){
    ticketsData = ticketsData.sort((p1,p2) => {
      return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]

    });
  }


class CustomerAccountPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: [], auth: false, tickets: []}
        this.stepUp = this.stepUp.bind(this);
        this.stepUp();
        this.loadTableData = this.loadTableData.bind(this);
    }

    stepUp = async () => {
        await (async () => {
            this.setState({IP: await publicIP.v4()})
        })();
        this.assertAuth();
        this.forceUpdate();

    }

    componentDidMount = async() => {
        await (async ()=> {
        window.addEventListener('load', this.stepUp);
        window.addEventListener('load', this.loadTableData(ticketsData));
        this.loadTableData(ticketsData)})();
    }   


    componentWillUnmount() {
        window.removeEventListener('load', this.stepUp)
    }

    assertAuth = () => {
        var go = '/insession/' + this.state.IP;//routes
        fetch(go, {//sends the request
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: this.IP })//data sent from react to flask
        })
            .then(response => response.json()).then(data => {
                this.setState({ auth: true , data: data.response})})//accepts and stores the data
    };

     getTickets = () =>{
        var go = '/gettickets/' + this.state.data.id;//routes
         fetch(go, {//sends the request
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({ data: this.IP })//data sent from react to flask
         })
         .then(response => response.json()).then(data => {
             this.setState({ tickets: data.response})})//accepts and stores the data
    }




    loadTableData = (ticketsData) => {
        const tableBody = document.getElementById('tableData');
        let dataHtml = '';

        for(let ticket of ticketsData){
                    //-----------Date-----------|----------MovieName--------|--------------------Link to Ticket's PDF--------------------->
        dataHtml += `<tr style = {tr}><td>${ticket.date}</td><td>${ticket.movieName}</td><td><a href=${ticket.file}><div>click here</div></a></td></tr>` ;

        }
        console.log(dataHtml)

        tableBody.innerHTML = dataHtml;
    }

    sortColumn = (columnName) => {
        const dataType = typeof ticketsData[0][columnName];
        sortDirection = !sortDirection;

        switch(dataType){
        case 'number':
            sortNumberColumn(sortDirection, columnName)
            break;
        }

        loadTableData(ticketsData);
    }

    sortNumberColumn = (sort, columnName) => {
        ticketsData = ticketsData.sort((p1,p2) => {
        return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]

        });
    }



    render() {
        return (
            <body>
                

                <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>   
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                <link rel="stylesheet" type="text/css" href={main} />
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                </head>
                {/* <Banner history={this.props.history}/> */}
                <div id='grad1'>
                
                

             
                {/*-----HEADER TABS END HERE----*/}


                <div className="container">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br/>
                <br/>

                {/* --------------------------------------------TICKETS TABLE--------------------------------------------------------------- */}

                <div>
                <table style = {table}>
                    <thead>
                    <tr style = {tr}>
                        
                        <th onclick="sortColumn('date')">Date</th>
                        <th style = {th}> Movie Name </th>
                        <th style = {th}> View Ticket </th>
                    </tr>
                    </thead>

                    <tbody id = "tableData"></tbody>
                </table>
                </div>


                <br/>
                <br/>

                {/* --------------------------------------FOOTER---------------------------------------------- */}
                <footer className="bg-light text-center">
                <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                All rights reserved. © 2021 Copyright:
                    <a className="text-dark" >The Big Picture</a>
                </div>
                </footer>
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            </div>
            </body>
        );
    }
}


export default CustomerAccountPage;

