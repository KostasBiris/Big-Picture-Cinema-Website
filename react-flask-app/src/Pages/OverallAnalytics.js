import React from 'react'
import SearchIMDB from '../components/SearchIMDB';
import main from '../static/main.css';

var publicIP = require('public-ip')
//Generic component for individual Movie Pages.

class OverallAnalytics extends React.Component {
    constructor(props) {
        super(props);
        this.title = props.match.params.title;
        this.movieID = props.match.params.movieID;
        this.state = {IP: null, auth: false, 
                      returnedData: [], 
                      movieURL: '',
                      fromMoviePage: true};
        //Bind our method.
        this.getOverallAnalyticsData = this.getOverallAnalyticsData.bind(this);
        this.getClientIP = this.getClientIP.bind(this);
        this.goBookTickets = this.goBookTickets.bind(this);
        //Call our method.
        this.getOverallAnalyticsData();
        this.getClientIP();
    }
    getClientIP = () => {
        (async () => {
            this.setState({IP: await publicIP.v4()})
        })();

    }
    
    componentDidMount = () => {
        window.addEventListener('load', this.getMovieData);
    }

    componentDidMount = () => {
        window.removeEventListener('load', this.getMovieData);
    }

    //Method for getting the data of the specific requested movie.
    getOverallAnalyticsData = () => {
        // // to fetch from our database
        // // Invoke a request to our rest API to get the data of the overall analytics.
        // var route = this.title + '/page';
        // fetch(route, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ movie: this.title })
        // })
        //     .then(response => response.json()).then(data => {

        //         this.setState({ returnedData: data });
        //         console.log(this.state.returnedData);
                
        //     });
            // to fetch from our database
        
        this.setState({ returnedData : Object.values(data)})

    } 

    goBookTickets = (e) => {
        let go = '/book';
        this.props.history.push(go, this.state);
    }


    render() {
        return (
            <React.Fragment>
                <head>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">   
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                    <link rel="stylesheet" type="text/css" href="{{url_for('static', filename='main.css')}}" />
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    
                    <meta charset="utf-8" />
                    <title>{{ title }}</title>
                    <script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js'></script>
                </head>

                <body id="grad1">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#"><img src="{{url_for('static',filename='finlogo.png')}}" style="top:1px;width:rem;height:8rem;"></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item dropdown">
                                <button class="tab_background dropdown-toggle text mr-3"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">MOVIES</button>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <button class="dropdown-item" style="color:#f9bc50;" >ADD MOVIES</button>
                                    <button class="dropdown-item" style="color:#f9bc50;">REMOVE MOVIES</buttom>
                                    <button class="dropdown-item" style="color:#f9bc50;" >VIEW MOVIES</button>
                                </div>
                            </li>
                        <li class="nav-item active">
                            <button class="tab_background text mr-3">EMPLOYEES</button>
                        </li>
                        <li class="nav-item">
                            <button class="tab_background text mr-3">TICKETS</button>
                        </li>
                        <li class="nav-item dropdown">
                            <button class="tab_background dropdown-toggle text mr-3"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">ANALYTICS</button>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <button class="dropdown-item" style="color:#f9bc50;" >WEEKLY</button>
                                <button class="dropdown-item" style="color:#f9bc50;">OVERALL</buttom>
                            </div>
                        </ul>
                <form class="form-inline my-2 my-lg-0">
                <button class="tab_background mr-5">LOG OUT</button>
                <input class="mr-3" type="image" style="width:2rem;height:2rem;" src="{{url_for('static',filename='usericon.png')}}"/>
                <input class="form-control mr-sm-2 search_bar" type="search" placeholder="Search here.." aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0 text_button" type="submit">Search</button>
                </form>
            </div>
            </nav>
            <br>
            <br>
            <div class="header_text">
                <h1 style="position:absolute; left:25px; color: #4e5b60;">OVERALL ANALYTICS</h1>
            </div>
            <br>
            <br>
            <br>
            <br>

            <!--Column Graph of Overall Best Performing Movies-->
            <div>       
            <center>
                <h1>{{ title }}</h1>
            </center>
            <center>
                <canvas id="chart" width="600" height="400"></canvas>
                <script>
                // bar chart data
                var barData = {
                    labels : [
                    {% for item in labels %}
                    "{{ item }}",
                    {% endfor %}
                ],

                    datasets : [{
                    fillColor: " rgba(0, 128, 0,0.6)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    data : [
                        {% for item in values %}
                        "{{ item }}",
                        {% endfor %}
                    ]
                    }
                    ]
                }

                // get bar chart canvas
                var mychart = document.getElementById("chart").getContext("2d");

                steps = 10
                max = {{max}}

                // draw bar chart
                new Chart(mychart).Bar(barData, {
                scaleOverride: true,
                scaleSteps: steps,
                scaleStepWidth: Math.ceil(max / steps),
                scaleStartValue: 0,
                scaleShowVerticalLines: true,
                scaleShowGridLines : true,
                barShowStroke : true,
                scaleShowLabels: true
                }
                );

                </script>
            </center>

            </div>

            <br>
            <br>
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
            </React.Fragment>
        )
    }
}



export default MoviePage;