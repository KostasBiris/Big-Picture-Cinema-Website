import ReactDOM from 'react-dom';
import React from 'react';
import Seatmap from './Seatmap.jsx';
import './Style/Seatmap.scss';


const rows = [
    
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ],
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ],
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ],
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ],
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ]
  
];



export default function ScreenVIP() {
    return (
      <div className="Seatmap">
      <Seatmap rows={rows} maxReservableSeats={10} alpha />   
      </div>
    );
  }