import React from 'react'
//import SearchIMDB from '../components/SearchIMDB';
//import main from '../static/main.css';
import ManagerBanner from '../components/ManagerBanner';
import moment from 'moment';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
var publicIP = require('public-ip')
//Generic component for individual Movie Pages.



class OverallAnalytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = { comparisonData: [], tickets: [], screenings: [], movies: [], totalrev: 0, data: [], dataPastWeek: [], weeklyrev: 0, MovieA: '', MovieB: '', DateA:'', DateB: '', comparisonDrawn: false };
        this.fetchChartData = this.fetchChartData.bind(this);
        this.buildChartData = this.buildChartData.bind(this);
        this.getMoviesA = this.getMoviesA.bind(this);
        this.getMoviesB = this.getMoviesB.bind(this);
        this.handleMovieA = this.handleMovieA.bind(this);
        this.handleMovieB = this.handleMovieB.bind(this);
        this.handleCompare = this.handleCompare.bind(this);
        this.handleDateChangeA = this.handleDateChangeA.bind(this);
        this.handleDateChangeB = this.handleDateChangeB.bind(this);
        this.getid = this.getid.bind(this);
        this.reformatd = this.reformatd.bind(this);

    }
    async fetchChartData() {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const responseA = await fetch('/tickets', settings);
        const tickets = await responseA.json();
        this.setState({ tickets: Object.values(tickets.response) });

        const responseB = await fetch('/allscreenings', settings);
        const screenings = await responseB.json();
        this.setState({ screenings: Object.values(screenings.response) });
        const responseC = await fetch('/allmovies', settings);
        const movies = await responseC.json();
        this.setState({ movies: Object.values(movies.response) });
        //console.log(this.state);


    }

    //Method for collecting data and formatting it into a state for input into charts.
    buildChartData = () => {
        var i;
        var j;
        let data = [];
        let totalrev = 0;
        let movs = [];
        let ticks = [];
        let obj = {}
        let title;

        this.state.movies.forEach(function (entry) {
            movs.push(entry);
        })
        this.state.tickets.forEach(function (entry) {
            ticks.push(entry);
        })
        //console.log(this.state.movies);
        for (i = 0; i < ticks.length; i++) {
            //console.log(ticks[i]);
            totalrev = totalrev + ticks[i].price;
        }
        this.setState({ totalrev: totalrev });
        let rev = 0;


        movs.forEach(function (mov) {
            ticks.forEach(function (tik) {
                if (mov.internalid === tik.movie_id) {
                    rev = rev + tik.price;
                }
            })
            obj = { "name": mov.original_title, "revenue (??)": rev }
            data = [...data, obj];
            rev = 0;
        })
        this.setState({ data: data });
        // console.log(this.state);
        rev = 0;
        let weeklyrev = 0;
        let newdata = [];
        let inpastweek = false;
        movs.forEach(function (mov) {
            ticks.forEach(function (tik) {
                if (mov.internalid === tik.movie_id) {
                    let sevenAgo = moment().subtract(7, 'd');
                    let curr = moment(tik.date, 'DD-MM-YYYY');
                    if (curr.isSameOrBefore() && curr.isSameOrAfter(sevenAgo)) {
                        inpastweek = true;
                        rev += tik.price;
                        weeklyrev += tik.price;
                    }
                }

            })
            if (inpastweek) {
                obj = { "name": mov.original_title, "revenue (??)": rev }
                newdata = [...newdata, obj];
                rev = 0;
                inpastweek = false;
            }
        })
        this.setState({ dataPastWeek: newdata });
        this.setState({ weeklyrev: weeklyrev });
    }


    async componentDidMount() {
        await this.fetchChartData();
        this.buildChartData();
    }

    //Generate list of movies
    getMoviesA = () => {
        const options = this.state.movies.map(v => ({
            label: v.original_title,
            value: v.original_title
        }));
        return (
            <div className="instruct">
                <Select onChange={this.handleMovieA} value={this.state.MovieA} options={options} placeholder="Movie" name="movieA" />
            </div>
        )
    }

    //Handler for the first date picker.
    handleDateChangeA = (e) => {
        // e.preventDefault();
        // console.log(e.target.value)

        function formatd(inp) {


            let dArr = inp.split("-");  // ex input "2010-01-18"
            return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"

        }


        if (e.target.value)
            this.setState({ DateA: formatd(e.target.value) });
    }
    //Handler for the second date picker.
    handleDateChangeB = (e) => {
        // e.preventDefault();
        // console.log(e.target.value)

        function formatd(inp) {


            let dArr = inp.split("-");  // ex input "2010-01-18"
            return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"

        }


        if (e.target.value)
            this.setState({ DateB: formatd(e.target.value) });
    }

    //dirty func for reformatting dates.
    reformatd = (inp) => {
        let dArr = inp.split("-");
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0];

    }
    //Handlers
    handleMovieA = (data) => {
        console.log(data);
        this.setState({ MovieA: data });
    }

    handleMovieB = (data) => {
        this.setState({ MovieB: data });
    }

    handleCompare = (e) => {
        e.preventDefault();
        this.setState({ comparisonDrawn: true });
        this.makeComparison();
    }

    //Generate list of movies
    getMoviesB = () => {
        const options = this.state.movies.map(v => ({
            label: v.original_title,
            value: v.original_title
        }));
        //console.log(options);
        return (
            <div className="instruct">
                <Select onChange={this.handleMovieB} value={this.state.MovieB} options={options} placeholder="Movie" name="movieB" />
            </div>
        )
    }
    //Get the internal ID from the movie name.
    getid = (mov) => {
        let movid;
        this.state.movies.forEach(function (entry) {
            if (entry.original_title === mov) {
                movid = entry.internalid;

            }
        })
        return movid;
    }

    //Compare two movies between date ranges.
    makeComparison = () => {
        let ticks = []
        this.state.tickets.forEach(function (entry) {
            ticks.push(entry);
        })
        let a = this.state.MovieA.value;
        let aid = this.getid(a);
        let b = this.state.MovieB.value;
        let baid = this.getid(b);
        let a_rev = 0;
        let a_ticks = 0;
        let b_rev= 0;
        let b_ticks = 0;
        let da = this.state.DateA;
        let ba = this.state.DateB;
        let data = [];
        ticks.forEach(function (tik) {
            if (aid === tik.movie_id) {
                let curr = moment(tik.date, 'DD-MM-YYYY');
                if (curr.isSameOrBefore(moment(ba, 'DD-MM-YYYY')) && curr.isSameOrAfter(moment(da,'DD-MM-YYYY'))) {
                    a_rev += tik.price;
                    a_ticks+= tik.numVIP+tik.numChild+tik.numElder+tik.numDefault;
                }
            }
            else if (baid === tik.movie_id) {
                let curr = moment(tik.date, 'DD-MM-YYYY');
                if (curr.isSameOrBefore(moment(ba)) && curr.isSameOrAfter(moment(da))) {
                    b_rev += tik.price;
                    b_ticks+= tik.numVIP+tik.numChild+tik.numElder+tik.numDefault;
                }
            }
        })
        data = [...data, {"name": a, "revenue (??)": a_rev, "tickets":a_ticks}];
        data = [...data, {"name": b, "revenue (??)": b_rev, "tickets":b_ticks}];
        this.setState({comparisonData : data});
    }



    render() {
        return (
            <body id="grad1">
                {/* <ManagerBanner /> */}
                <br />
                <br />
                <div className="container-fluid px-0 px-sm-4 mx-auto">
                            <div className="row justify-content-center mx-0">
                                <div className="col-lg-10">
                                    <div className="card border-0">
                                        <div className="card-header" style={{ backgroundColor: "#4e5b60" }}>
                                            <div className="mx-0 mx-b row justify-content-sm-center justify-content-start px-1">
                                                <h1 className="header_text" style={{ color: "antiqueWhite" }}>OVERALL ANALYTICS: </h1>
                                            </div>
                                        </div>
                                        {
                                            <div className="header_text " >
                                                            <h2 style={{ position: 'absolute', left: '85px', color: '#4e5b60'}}>Overall Income: ??{this.state.totalrev}</h2>
                                                        </div>
                                                        }
                                        <div className="card-body">
                                            <div className="row text-center">
                                                <div className="card-body">
                                                    <div className="row text-center">
                                                       
                                                    
                <BarChart width={500} height={300} data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* <XAxis dataKey="name" stroke="#000000" /> */}
                    {/* <YAxis stroke="#000000" /> */}
                    <XAxis type="number"/>
                    <YAxis type="category" dataKey="name" fontSize={this.state.data.length === 1 ? 15 : 40/this.state.data.length + 'px'}/>
                    <Tooltip />
                    <Legend />
                    <Bar barSize={300/this.state.data.length} background label="name" dataKey="revenue (??)" fill="#8884d8" />
                </BarChart>
                
                
                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                <br />
                <br />
                <br />
                <div className="container-fluid px-0 px-sm-4 mx-auto">
                            <div className="row justify-content-center mx-0">
                                <div className="col-lg-10">
                                    <div className="card border-0">
                                        <div className="card-header" style={{ backgroundColor: "#4e5b60" }}>
                                            <div className="mx-0 mx-b row justify-content-sm-center justify-content-start px-1">
                                                <h1 className="header_text" style={{ color: "antiqueWhite" }}>WEEKLY ANALYTICS: </h1>
                                            </div>
                                        </div>
                                        {
                                            <div className="header_text" >
                                            <h2 style={{ position: 'absolute', left: '85px', color: '#4e5b60' }}>Weekly Income: ??{this.state.weeklyrev}</h2>
                                        </div>
                                        }
                                         <div className="card-body">
                                            <div className="row text-center">
                                                <div className="card-body">
                                                    <div className="row text-center">
                

                <BarChart width={500} height={300} data={this.state.dataPastWeek} marg={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#000000" fontSize={ this.state.dataPastWeek.length === 1? 20 : 40/this.state.dataPastWeek.length + 'px'} />
                    <YAxis stroke="#000000" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue (??)" fill="#8884d8" />
                </BarChart>
                </div>
                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                
                
                <br />
                <br />
                <br />
                <div className="container-fluid px-0 px-sm-4 mx-auto">
                            <div className="row justify-content-center mx-0">
                                <div className="col-lg-10">
                                    <div className="card border-0">
                                        <div className="card-header" style={{ backgroundColor: "#4e5b60" }}>
                                            <div className="mx-0 mx-b row justify-content-sm-center justify-content-start px-1">
                                                <h1 className="header_text" style={{ color: "antiqueWhite" }}>COMPARE MOVIES IN RANGE:</h1>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row text-center">
                                                <div className="card-body">
                                                    <div className="row text-center">
                
                <div className=".col-md-2 .col-4 .my-1 .px-2 analytics">
                <label className="instruct" for="date" id="date">Choose a date:</label>
                <input className="fa fa-calender" type = "date" name="date" onChange={this.handleDateChangeA} value={this.reformatd(this.state.DateA)}  dateFormat="dd/MM/yyyy" />
                </div>
                <div className=".col-md-2 .col-4 .my-1 .px-2 analytics">
                <label className="instruct" for="date" id="date">Choose a date:</label>
                <input  className="fa fa-calender" type = "date" name="date" onChange={this.handleDateChangeB} value={this.reformatd(this.state.DateB)}  dateFormat="dd/MM/yyyy" />
                </div>
                <div className=".col-md-2 .col-4 .my-1 .px-2">
                    <label className="instruct" for="movieA" id="movieA">Choose a movie: </label>
                    {this.getMoviesA()}
                </div>
                <br />
                <br />
                <br />
                <div className=".col-md-2 .col-4 .my-1 .px-2 analytics">
                    <label className="instruct" for="movieB" id="movieB">Choose a movie: </label>
                    {this.getMoviesB()}
                </div>
                <br />
                <br />
                <br />
                <div className=".col-md-2 .col-4 .my-1 .px-2">
                <button className="buttons_remove" type="submit" onClick={this.handleCompare}>COMPARE MOVIES</button>
                </div>
                {this.state.comparisonDrawn === true?
                    <div>
                        <span><p>Comparison between {this.state.MovieA.value} and {this.state.MovieB.value} from {this.state.DateA} to {this.state.DateB}</p></span>
                        <BarChart width={500} height={300} data={this.state.comparisonData} marg={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" stroke="#000000" />
                            <YAxis stroke="#000000" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="revenue (??)" fill="#8884d8" />
                            <Bar dataKey="tickets" fill="#2284d8"/>
                        </BarChart>
                    </div>
                    :
                    <></>}
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
                    <br/>
            </body>
            
            
        )
        
    }
}



export default OverallAnalytics;
