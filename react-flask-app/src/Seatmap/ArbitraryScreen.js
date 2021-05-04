import ReactDOM, { render } from 'react-dom';
import React from 'react';
import Seatmap from './Seatmap.jsx';
import main from '../static/main.css';
import './Style/Seatmap.scss';
import Banner from '../components/Banner.js';


class ArbitraryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {seatmap: this.props.location.state.screening.seatmap,
                      seatmap_copy: [],
                      selectedSeats: [],  
                      screeningChosen : this.props.location.state.screening};
        this.mountSeatmap = this.mountSeatmap.bind(this);
        this.updateSeatmap = this.updateSeatmap.bind(this);
        this.goToCheckOut = this.goToCheckOut.bind(this);
        
    }
    
    componentDidCatch(TypeError){}

    componentDidMount = async () => {
        // window.addEventListener('load', this.updateSeatmap);

        var i,j;
        let seatmap = [];
        await (async() => {
            seatmap = this.state.seatmap;
            for (i = 0; i < seatmap.length; i++)  {
                for (j = 0; j < seatmap[i].length; j++) {
                    if (seatmap[i][j] == -1) {
                        seatmap[i][j] = null;
                    }
                    else if (seatmap[i][j] == 0) {
                        seatmap[i][j] = {number: j+1, isReserved: false, isVip: false};
                    }
                    else if (seatmap[i][j] == 2) {
                        seatmap[i][j] = {number: j+1, isReserved: false, isVip: true };
                    }
                    else if (seatmap[i][j] == 1) {
                        seatmap[i][j] = {number: j+1, isReserved: true, isVip: false};
                    }
                    else if (seatmap[i][j] == 3) {
                        seatmap[i][j] = {number: j+1, isReserved: true, isVip: true};
                    }
                }
            }
            this.setState({seatmap: seatmap});
            this.setState({seatmap_copy: JSON.parse(JSON.stringify(this.props.location.state.screening.seatmap))})
        })();
        // window.addEventListener('load', this.updateSeatmap);
        
        // window.addEventListener('load', this.mountSeatmap);
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
                        seatmap[i][j] = {number: j+1, isReserved: false, isVip: false};
                    }
                    else if (seatmap[i][j] == 2) {
                        seatmap[i][j] = {number: j+1, isReserved: false, isVip: true };
                    }
                    else if (seatmap[i][j] == 1) {
                        seatmap[i][j] = {number: j+1, isReserved: true, isVip: false};
                    }
                    else if (seatmap[i][j] == 3) {
                        seatmap[i][j] = {number: j+1, isReserved: true, isVip: true};
                    }
                }
            }
            
        })();
        this.setState({seatmap: seatmap});

    }    


    goToCheckOut = () => {
        // console.log(this.state)
        // this.props.history.push('/payment', this.state);
        if (this.props.isEmployee)
            this.props.history.push('/epayment', this.state);
        else
            this.props.history.push('/payment', this.state);
    }

    updateSeatmap = (data) => {
        let seatmap = this.state.seatmap_copy;
        console.log(this.state.seatmap_copy)
        console.log(seatmap);
        if (this.state.seatmap[data.row][data.col] != -1){
            if (data.remove == true){
                let toRemove = {row: String.fromCharCode('A'.charCodeAt(0) + data.row), col: (data.col+1)};
                console.log([data.row][data.col]);
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
        // console.log(this.state)
    }


    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                 <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                        <link rel="icon" href="data:;base64,iVBORw0KGgo" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    </head>
                    <body id = 'grad1'>
                   
                    
                    <div className="header_text">
                        <h1 className="container text-center" style={{ color: '#4e5b60', padding:'3rem' }}>SCREEN</h1>
                    </div>
                    <div className="container-fluid seatmap">
                    <div className="Seatmap" style={{padding:'2rem'}}>
                        <Seatmap rows={this.state.seatmap} maxReservableSeats={10} onChange={this.updateSeatmap} alpha />
                        {/* <Seatmap rows={this.state.seatmap} maxReservableSeats={10} onChange={this.updateSeatmap} alpha /> */}
                    </div>
                    </div>

                    <br />
                    <br />
                    
                    <nav>
                        <div className="container justify-content-center text-center">
                            
                            <button className="page-item buttons_background mr-3">MOVIE</button>
                            <button className="page-item buttons_background mr-3" >SEATS</button>
                            <button className="page-item buttons_background mr-3" onClick={this.goToCheckOut}>CHECKOUT</button>
                            
                        </div>
                    </nav>
                    <br />
                    <br />
                    {/* <footer className="bg-light text-center">
                        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                            All rights reserved. © 2021 Copyright:
                    <a className="text-dark">The Big Picture</a>
                        </div>
                    </footer> */}

                </body>
            </React.Fragment>
        );
    }
}
export default ArbitraryScreen;