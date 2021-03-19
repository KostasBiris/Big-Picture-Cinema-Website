import ReactDOM, { render } from 'react-dom';
import React from 'react';
import Seatmap from './Seatmap.jsx';
import main from '../static/main.css';
import './Style/Seatmap.scss';
import Banner from '../components/Banner.js';




const rows = [
    [{ number: 1,}, {number: 2}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6},{number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [],
    [null, null, {number: '1', isVip: true}, {number: '2', isVip: true}, {number: 3, isVip: true}, {number: 4, isVip: true}, {number: 5, isVip: true}, {number: 6, isVip: true}, {number: 7, isVip: true}, {number: 8, isVip: true}, {number: 9, isVip: true}, {number: 10, isVip: true}, {number: 11, isVip: true}, {number: 12, isVip: true}, {number: 13, isVip: true}, {number: 14, isVip: true}, {number: 15, isVip: true}, {number: 16, isVip: true}, null, null],
    [],
    [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6},{number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1 }, {number: 2}, {number: 3}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1, isReserved: true }, {number: 2}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6, isReserved: true}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}]
      
];
class Screen1 extends React.Component{

render(){
    return (
      <React.Fragment>  
      <body>
      <head>
      <link rel="stylesheet" type="text/css" href={main} />
      </head>
      <Banner/>
      <div className="Seatmap" style={{marginLeft:'350px',marginTop:'50px'}}>
      <Seatmap rows={rows} maxReservableSeats={10} alpha />   
      </div>
      <div class="header_text">
        <h1 style={{marginLeft:'650px', left:'3rem', color: '#4e5b60'}}>SCREEN</h1>
    </div>   
      </body>
    </React.Fragment>  
    );
  }
}
export default Screen1;