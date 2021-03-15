import ReactDOM from 'react-dom';
import React from 'react';
import Seatmap from './Seatmap.jsx';
import './Style/Seatmap.scss';


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
      <div className="Seatmap">
      <Seatmap rows={rows} maxReservableSeats={10} alpha />   
      </div>
    );
  }