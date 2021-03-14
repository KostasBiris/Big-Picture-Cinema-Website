import ReactDOM from 'react-dom';
import React from 'react';
import Seatmap from './Seatmap.jsx';
import './Style/Seatmap.scss';


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
    
    
    
    /*[{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ],
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ],
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ],
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ],
    [{ number: '1', isVip: true},  {number: '2', isVip: true}, { number: '3', isVip: true},  {number: '4', isVip: true},{ number: '5', isVip: true},null,null,null,  {number: '6', isVip: true},{ number: '7', isVip: true},  {number: '8', isVip: true},{ number: '9', isVip: true},  {number: '10', isVip: true}, ]*/

    /*[{ number: 1,}, {number: 2}, {number: '3'}, {number: '4'},null, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20},null,{number: 21}, {number: 22}, {number: 23}, {number: 24}],
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
    
   */
    
    
    
];

/*ReactDOM.render(
    <Seatmap rows={rows} maxReservableSeats={10} alpha />,
    document.getElementById('root')
);*/

export default function Screen1() {
    return (
      <div className="Seatmap">
      <Seatmap rows={rows} maxReservableSeats={10} alpha />   
      </div>
    );
  }