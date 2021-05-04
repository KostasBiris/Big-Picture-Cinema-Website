import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
class AddScreening extends React.Component {
    constructor(props) {
        super(props);
        this.state = {screen: 1, movies: [], titles:[], movie: "", date: moment(), time: ""}
        this.handleMovieChange = this.handleMovieChange.bind(this);
        this.handleScreenChange = this.handleScreenChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);

    }

    //Method for handling the screen changing.
    handleScreenChange = (e) => {        
        e.preventDefault();
        console.log(e);
        this.setState({screen: e.target.value});
    }

    //Method for handling the movie changing.
    handleMovieChange = (movie) => {
        //e.preventDefault();
        this.setState({movie: movie});

    }
    //Method for handling the time changing.
    handleTimeChange = (time) => {
        this.setState({time: time});
    }

    //Method for handling the date changing.
    handleDateChange = (date) => {
        //Make sure that the date is AFTER or equal to today.
        if (moment(date).isBefore()) {
            this.setState({date:moment()});
        }
        else {
            this.setState({date: moment(date).toDate()});
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.screen!=0 && this.movie!="" && this.time!="") {
            let movie = this.state.movie.value;
            let screen = this.state.screen;
            let time = this.state.time;
            let date = moment(this.state.date).format('DD-MM-YYYY').toString();
            let obj = this.state.movies.find(r=> r.original_title === this.state.movie.label);
            let data = {movie_id: obj.internalid, screen: screen, time: time, date: date};
            console.log(data);
            fetch('/addascreening', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: data })
            }).then(response => response.json()).then(data=> {
                alert('RESULT: ' + data.response)
                this.setState({date: moment(), time: ""})
            })
        } else{
            alert("Please fill in all details!")
        }
    }

    componentDidMount = () => {
        let dat = [];
        fetch('/allmovies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json()).then(data => this.setState({ movies: Object.values(data.response) }))
    }

    //Func for helping with options.
    MakeData = (data) => {
        return <option value={data}>{data}</option>
    }




    render() {

        let data = []
        this.state.movies.map(v => {
            data.push(v.original_title);
        })
        const options = data.map(v => ({
            label: v,
            value: v
          }));     
          
        return(
            <div>
                <form>
                    <label for="movies" id="movies">Choose a movie:</label>
                    <Select value = {this.state.movie}  onChange={this.handleMovieChange} style={{width: this.state.movie === undefined ? '100px' : `${100 + this.state.movie.length*2}px` }} options={options}  placeholder="select movie" name="movies" id="movies"/>
                    <label for="screens" id="screens">Choose a screen:</label>
                    <select value={this.state.screen} onChange={this.handleScreenChange} name="screens" id="screens">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">VIP Only</option>
                        <option value="5">IMAX</option>
                    </select><br></br>
                    <label for="date" id="date">Choose a date:</label>
                    <DatePicker name="date" selected={moment(this.state.date).toDate()} onChange={this.handleDateChange} dateFormat="dd/MM/yyyy"/><br></br>
                    <label for="time" id="time">Choose a time:</label>
                    {/*<DatePicker name="time" selected={moment(this.state.time).toDate()} onChange={this.handleTimeChange} showTimeSelect timeFormat= "mm:HH" minuteInterval={15}/>*/}
                    <TimePicker name="time" value={this.state.time} onChange= {this.handleTimeChange}/>
                    <button type="submit" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default AddScreening;