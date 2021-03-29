import ReactDOM, { render } from 'react-dom';
import React from 'react';
import Seatmap from './Seatmap.jsx';
import main from '../static/main.css';
import './Style/Seatmap.scss';
import Banner from '../components/Banner.js';


class ArbitraryScreen extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props)
        // console.log(this.props.location.state.screening.seatmap)
        this.state = {seatmap: this.props.location.state.screening.seatmap,
                      seatmap_copy: JSON.parse(JSON.stringify(this.props.location.state.screening.seatmap)),
                      selectedSeats: [],  screeningChosen : this.props.location.state.screening};
        this.mountSeatmap = this.mountSeatmap.bind(this);
        this.updateSeatmap = this.updateSeatmap.bind(this);
        this.goToCheckOut = this.goToCheckOut.bind(this);
        
    }

    componentDidMount = () => {
        var i,j;
        let seatmap = this.state.seatmap;
            for (i = 0; i < seatmap.length; i++)  {
                for (j = 0; j < seatmap[i].length; j++) {
                    var isres = 0;
                    var isvip = 0;
                    if (seatmap[i][j] == -1) {
                        seatmap[i][j] = null;
                    }
                    else if (seatmap[i][j] == 0) {
                        seatmap[i][j] = {number: j+1, isReserved: false};
                    }
                    else if (seatmap[i][j] == 2) {
                        seatmap[i][j] = {number: j+1, isReserved: false, isVip: true };
                    }
                    else if (seatmap[i][j] == 1) {
                        seatmap[i][j] = {number: j+1, isReserved: true, isVip: false};
                    }
                    else if (seatmap[i][j] == 3) {
                        seatmap[i][j] = {number: j+1, isReserved: true, isVip: false};
                    }
                }
            }
        // window.addEventListener('load', this.updateSeatmap);
        this.setState({seatmap: seatmap});
        //window.addEventListener('load', this.mountSeatmap);
    }

    componentWillUnmount = () => {
        //window.addEventListener('load', this.mountSeatmap);
    }


    mountSeatmap = async () => {
        var i,j;
        // console.log(this.state.seatmap);
        let seatmap = this.state.seatmap;
        await (async() => {
            for (i = 0; i < seatmap.length; i++)  {
                for (j = 0; j < seatmap[i].length; j++) {
                    var isres = 0;
                    var isvip = 0;
                    if (seatmap[i][j] == -1) {
                        seatmap[i][j] = null;
                    }
                    else if (seatmap[i][j] == 0) {
                        seatmap[i][j] = {number: j+1, isReserved: false};
                    }
                    else if (seatmap[i][j] == 2) {
                        seatmap[i][j] = {number: j+1, isReserved: false, isVip: true };
                    }
                    else if (seatmap[i][j] == 1) {
                        seatmap[i][j] = {number: j+1, isReserved: true, isVip: false};
                    }
                    else if (seatmap[i][j] == 3) {
                        seatmap[i][j] = {number: j+1, isReserved: true, isVip: false};
                    }
                }
            }
            
        })();
        // this.setState({seatmap: seatmap});

    }    


    goToCheckOut = () => {
        console.log(this.state)
        this.props.history.push('/payment', this.state);
    }

    updateSeatmap = (data) => {
        let seatmap = this.state.seatmap_copy;

        if (this.state.seatmap[data.row][data.col] != -1){
            if (data.remove == true){
                let toRemove = {row: String.fromCharCode('A'.charCodeAt(0) + data.row), col: (data.col+1)};
                seatmap[data.row][data.col].isReserved = false;
                let index = this.state.selectedSeats.indexOf(toRemove)
                this.state.selectedSeats.splice(index, 1)
            }
            else{
                let matrixIndex = {row: String.fromCharCode('A'.charCodeAt(0) + data.row), col: (data.col+1)}
                this.setState({selectedSeats: [...this.state.selectedSeats, matrixIndex]});
                //this.state.selectedSeats.push(matrixIndex)
            }
        }

        this.setState({seatmap_copy: seatmap})
        console.log(this.state)
    }


    render() {
        
        return (
            <React.Fragment>
                <body>

                    <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                    </head>
                   
                    <Banner />
                    <div class="header_text">
                        <h1 style={{ marginLeft: '600px', left: '3rem', color: '#4e5b60' }}>SCREEN</h1>
                    </div>
                    <div className="Seatmap" style={{ marginLeft: '350px', marginTop: '50px' }}>
                        <Seatmap rows={this.state.seatmap} maxReservableSeats={10} onChange={this.updateSeatmap} alpha />
                        {/* <Seatmap rows={this.state.seatmap} maxReservableSeats={10} onChange={this.updateSeatmap} alpha /> */}
                    </div>

                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <a className="button_prev" style={{ color: "white" }} tabIndex="-1" aria-disabled="true">

                                </a>
                            </li>
                            <li className="page-item"><a className="buttons_background" style={{ color: "white" }}>MOVIE</a></li>
                            <li className="page-item"><a className="buttons_background" style={{ color: "white" }}>SEATS</a></li>
                            <li className="page-item"><a className="buttons_background" style={{ color: "white" }} onClick={this.goToCheckOut}>CHECKOUT</a></li>

                        </ul>
                    </nav>
                </body>
            </React.Fragment>
        );
    }
}
export default ArbitraryScreen;