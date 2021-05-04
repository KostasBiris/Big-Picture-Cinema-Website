import ReactDOM from 'react-dom';
import React from 'react';
import Seatmap from './Seatmap.jsx';
import main from '../static/main.css';
import './Style/Seatmap.scss';
import Banner from '../components/Banner.js';


const rows = [
    
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ],
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ],
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ],
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ],
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ]
  
];



export default function ScreenVIP() {
    return (
      <React.Fragment>  
      <body>
      <head>
      <link rel="stylesheet" type="text/css" href={main} />
      </head>
      <Banner/>
       <div className="Seatmap" style={{marginLeft:'450px',marginTop:'150px'}}>
      <Seatmap rows={rows} maxReservableSeats={10} alpha />   
      </div>
      <div class="header_text">
        <h1 style={{marginLeft:'620px', left:'3rem', color: '#4e5b60'}}>SCREEN VIP</h1>
    </div>   
      </body>
    </React.Fragment>
    );
  }