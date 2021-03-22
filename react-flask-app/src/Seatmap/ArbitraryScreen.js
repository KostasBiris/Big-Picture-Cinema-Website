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
    }
    render() {
        console.log(this.state.seatmap);
        return (
            <React.Fragment>
                <body>
                    <head>
                        <link rel="stylesheet" type="text/css" href={main} />
                    </head>
                    <Banner />
                    <div className="Seatmap" style={{ marginLeft: '350px', marginTop: '50px' }}>
                        <Seatmap rows={[[1]]} maxReservableSeats={10} alpha />
                    </div>
                    <div class="header_text">
                        <h1 style={{ marginLeft: '600px', left: '3rem', color: '#4e5b60' }}>SCREEN</h1>
                    </div>
                </body>
            </React.Fragment>
        );
    }
}
export default ArbitraryScreen;