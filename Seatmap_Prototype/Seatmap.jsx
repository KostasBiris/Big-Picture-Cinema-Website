import 'core-js/es/map';
import 'core-js/es/set';
import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import Row from './Row';
import Immutable, { Map, Set } from 'immutable/dist/immutable.min.js';
import Seat from './Seat';
import Blank from './Blank';

export default class Seatmap extends React.Component {
    static PropTypes = {
        addSeatCallback: T.func,
        alpha: T.bool,
        removeSeatCallback: T.func,
        maxReservableSeats: T.number,
        rows: T.arrayOf(T.arrayOf(T.shape({
            number: T.oneOfType([
                T.string,
                T.number
            ]).isRequired,
            isReserved: T.bool
        }))).isRequired,
        seatWidth: T.number
    }
}