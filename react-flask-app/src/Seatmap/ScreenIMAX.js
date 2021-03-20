import ReactDOM from 'react-dom';
import React from 'react';
import Seatmap from './Seatmap.jsx';
import main from '../static/main.css';
import './Style/Seatmap.scss';
import Banner from '../components/Banner.js';

const rows = [


    [{ number: 1,}, {number: 2}, {number: '3'}, {number: '4'},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20},null,{number: 21}, {number: 22}, {number: 23}, {number: 24}],
    [{ number: 1,}, {number: 2}, {number: '3'}, {number: '4'},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20},null,{number: 21}, {number: 22}, {number: 23}, {number: 24}],
    [{ number: 1,}, {number: 2}, {number: '3'}, {number: '4'},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20},null,{number: 21}, {number: 22}, {number: 23}, {number: 24}],
    [{ number: 1,}, {number: 2}, {number: '3'}, {number: '4'},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20},null,{number: 21}, {number: 22}, {number: 23}, {number: 24}],
    [{ number: 1,}, {number: 2}, {number: '3'}, {number: '4'},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20},null,{number: 21}, {number: 22}, {number: 23}, {number: 24}],
    [{ number: 1,}, {number: 2}, {number: '3'}, {number: '4'},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20},null,{number: 21}, {number: 22}, {number: 23}, {number: 24}],
    [{ number: 1,}, {number: 2}, {number: '3'}, {number: '4'},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20},null,{number: 21}, {number: 22}, {number: 23}, {number: 24}],
    [{ number: 1,}, {number: 2}, {number: '3'}, {number: '4'},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20},null,{number: 21}, {number: 22}, {number: 23}, {number: 24}],
    [{ number: 1,}, {number: 2}, {number: '3'}, {number: '4'},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20},null,{number: 21}, {number: 22}, {number: 23}, {number: 24}],
    [{ number: 1,}, {number: 2}, {number: '3'}, {number: '4'},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20},null,{number: 21}, {number: 22}, {number: 23}, {number: 24}],
    [{ number: 1,}, {number: 2}, {number: '3'}, {number: '4'},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20},null,{number: 21}, {number: 22}, {number: 23}, {number: 24}],
    [null,{number: 1}, {number: '2'}, {number: '3'}, {number: 4},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18},null, {number: 19},{number: 20}, {number: 21}, {number: 22}],
    [null,null,{number: 1}, {number: '2'}, {number: '3'}, {number: 4},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16},null, {number: 17}, {number: 18}, {number: 19},{number: 20}],
    [null,null,null,{number: 1}, {number: '2'}, {number: '3'}, {number: 4},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14},null, {number: 15}, {number: 16}, {number: 17}, {number: 18}],
    [null,null,null,null,{number: 1}, {number: '2'}, {number: '3'}, {number: 4},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12},null, {number: 13}, {number: 14}, {number: 15}, {number: 16}],
    [null,null,null,null,null,{number: 1}, {number: '2'}, {number: '3'}, {number: 4},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10},null, {number: 11}, {number: 12}, {number: 13}, {number: 14}]
    
   
    
    
    
];


export default function ScreenIMAX() {
    return (
      <React.Fragment>  
      <body>
      <head>
      <link rel="stylesheet" type="text/css" href={main} />
      </head>
      <Banner/>
      <div className="Seatmap" style={{marginLeft:'230px',marginTop:'50px'}}>
      <Seatmap rows={rows} maxReservableSeats={10} alpha />   
      </div>
      <div class="header_text">
        <h1 style={{marginLeft:'640px', left:'3rem', color: '#4e5b60'}}>SCREEN</h1>
    </div>   
      </body>
    </React.Fragment>
    );
  }