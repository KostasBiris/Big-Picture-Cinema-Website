import ReactDOM from 'react-dom';
import React from 'react';
import Seatmap from './Seatmap.jsx';
import style from './index.scss';


const rows = [
    [{ number: 1 }, {number: 2}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6},{number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1 }, {number: 2}, {number: 3}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1, isReserved: true }, {number: 2}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6, isReserved: true}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [],
    [{ number: 1 }, {number: 2}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6},{number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1 }, {number: 2}, {number: 3}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1, isReserved: true }, {number: 2}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6, isReserved: true}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}]
];

ReactDOM.render(
    <Seatmap rows={rows} maxReservableSeats={10} alpha />,
    document.getElementById('root')
);