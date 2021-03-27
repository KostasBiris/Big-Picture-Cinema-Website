import ReactDOM, { render } from 'react-dom';
import React from 'react';
import Seatmap from './Seatmap.jsx';
import main from '../static/main.css';
import './Style/Seatmap.scss';
import Banner from '../components/Banner.js';


class ArbitraryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {seatmap: this.props.location.state.screening.seatmap};
        this.mountSeatmap = this.mountSeatmap.bind(this);



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
            
        this.setState({seatmap: seatmap});
        //window.addEventListener('load', this.mountSeatmap);
    }

    componentWillUnmount = () => {
        //window.addEventListener('load', this.mountSeatmap);
    }


    mountSeatmap = async () => {
        var i,j;
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
        this.setState({seatmap: seatmap});

    }    





    render() {
        //console.log(this.state.seatmap);
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
                        <Seatmap rows={this.state.seatmap} maxReservableSeats={10} alpha />
                    </div>

                </body>
            </React.Fragment>
        );
    }
}
export default ArbitraryScreen;