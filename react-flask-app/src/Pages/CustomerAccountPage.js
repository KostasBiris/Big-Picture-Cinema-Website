import React from 'react';


var publicIP = require('public-ip')



const table = {
    borderCollapse: 'collapse',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto'
}


const td, th = {
    border: '1px solid #cccccc',
    padding: '8px'
}

const th = {
    fontWeight: bold,
    textTransform: uppercase
}

const tr = {
    "&:nthChild(even)" : {
        backgroundColor: '#dddddd'
    },
    
    "&:hover" : {
        backgroundColor: 'blue',
        color: white
    },

}



class CustomerAccountPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: [], auth: false, tickets: []}
        this.stepUp = this.stepUp.bind(this);
        this.stepUp();
    }

    stepUp = async () => {
        await (async () => {
            this.setState({IP: await publicIP.v4()})
        })();
        this.assertAuth();
        this.forceUpdate();

    }

    componentDidMount() {
        window.addEventListener('load', this.stepUp);
        window.addEventListener('load', this.loadTableData(ticketsData));
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
                <link rel="stylesheet" type="text/css" href="{{url_for('static', filename='main.css')}}" />
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                </head>

                <body id="grad1">
                <nav class="navbar navbar-expand-lg navbar-light bg-light"/>
                <a class="navbar-brand" href="#"><img src="{{url_for('static',filename='finlogo.png')}}" style="top:1px;width:rem;height:8rem;"/></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <button class="tab_background text mr-3">WHAT'S NEW</button>
                    </li>
                    <li class="nav-item">
                        <button class="tab_background text mr-3">TICKETS</button>
                    </li>
                    <li class="nav-item dropdown">
                        <button class="tab_background dropdown-toggle text mr-3"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">SCREENS</button>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <button class="dropdown-item" style="color:#f9bc50;" >SILVER Screens</button>
                        <button class="dropdown-item" style="color:#f9bc50;">VMAX Screens</buttom>
                        <button class="dropdown-item" style="color:#f9bc50;" >GOLDEN Screens</button>
                        </div>
                    </li>
                    <li class="nav-item">
                        <button class="tab_background text mr-3" >EVENTS</button>
                    </li>
                    <li class="nav-item">
                        <button class="tab_background text mr-9">INFO</button>
                    </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                    <button class="tab_background mr-3">LOG IN</button>
                    <button class="tab_background mr-5">SIGN UP</button>
                    <input class="mr-3" type="image" style="width:2rem;height:2rem;" src="{{url_for('static',filename='usericon.png')}}"/>
                    <input class="form-control mr-sm-2 search_bar" type="search" placeholder="Search here.." aria-label="Search"/>
                    <button class="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
                    </form>
                </div>
                
                </nav>
                {/*-----HEADER TABS END HERE----*/}


                <div class="container">
                    <div class="main-body">
                    
                {/*--------------------------PROFILE BOX---------------------------------------------*/}
                        <div class="row gutters-sm">
                            <div class="col-md-60 mb-3">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex flex-column align-items-center text-center">
                                            <input class="mr-3" type="image" style="width:5rem;height:5rem;" src="{{url_for('static',filename='usericon.png')}}"/>
                                            <div class="mt-3">
                                                
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
                            <div class="col-8">
                                <div class="card mb-30">
                                    <div class="card-body">

                                        {/* ID Row */}
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">ID</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                {this.state.data.id}
                                            </div>
                                        </div>
                                        <hr/>

                                        {/* Email Row */}
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Email</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                {this.state.data.email}
                                            </div>
                                        </div>
                                        <hr/>

                                        {/* Phone Row */}
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Phone</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                {this.state.data.phone}
                                            </div>
                                        </div>
                                        <hr/>

                                        {/* DoB Row */}
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Date of Birth</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
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
                <footer class="bg-light text-center">
                <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
                All rights reserved. © 2021 Copyright:
                    <a class="text-dark" >The Big Picture</a>
                </div>
                </footer>
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            </body>
        );
    }
}


export default CustomerAccountPage;

