import 'core-js/es/map';
import 'core-js/es/set';
import React from 'react';
import { Map, Set } from 'immutable';
import Row from './Row';
import Seat from './Seat';
import Blank from './Blank';
import { PropTypes as T } from 'prop-types';


export default class Seatmap extends React.Component {
    static propTypes = {
        addSeatCallback: T.func,
        alpha: T.bool,
        removeSeatCallback: T.func,
        maxReservableSeats: T.number,
        rows: T.arrayOf(T.arrayOf(T.shape({
            number: T.oneOfType([
                T.string,
                T.number
            ]).isRequired,
            isReserved: T.bool,
            isVip: T.bool
        }))).isRequired,
        seatWidth: T.number
    };

    static defaultProps = {
        addSeatCallback: (row, number) => {
            
  
            console.log(`Added seat ${number}, row ${row}`);

        },
        removeSeatCallback: (row, number) => {
            

            console.log(`Removed seat ${number}, row ${row}`);
        },
        seatWidth: 35
    };

    constructor(props) {
        super(props);
        const { rows, seatWidth } = props;
        this.state = {
            selectedSeats: Map(),
            size: 0,
            width: seatWidth * (1 + Math.max.apply(null, rows.map(row => row.length)))
        };
    }

    updateSeatmap = (data) => { 
        var seatmap = this.props.rows;

        if (this.state.seatmap[data.row][data.col] != -1){
            if (data.remove == true)
                seatmap[data.row][data.col].isReserved = false;
            else
                seatmap[data.row][data.col].isReserved = true;
        }

        console.log(this.state.seatmap)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
        return nextState.selectedSeats !== this.state.selectedSeats;
    }

    selectSeat = (row, number) => {
        const { selectedSeats, size } = this.state;
        const { maxReservableSeats, addSeatCallback, removeSeatCallback } = this.props;
        const seatAlreadySelected = selectedSeats.get(row, Set()).includes(number);

        if (size < maxReservableSeats && !seatAlreadySelected) {
            this.setState({
                selectedSeats: selectedSeats.mergeDeep({[row]: Set([number])}),
                size: size + 1
            }, () => {
                var r = parseInt(row)-1;
                var col = parseInt(number)-1;
                this.props.onChange({row:r, col:col, remove: false});
                addSeatCallback(row, number)
                
                // console.log({row:r, col:col, remove: false})
            });
        } else if (selectedSeats.has(row) && seatAlreadySelected) {
            this.setState({
                selectedSeats: selectedSeats.update(row, seats => seats.delete(number)),
                size: size - 1
            }, () => {
                var r = parseInt(row)-1;
                var col = parseInt(number)-1;
                this.props.onChange({row:r, col:col, remove: true});
                removeSeatCallback(row, number)
                
                // console.log({row:r, col:col, remove: true})
                
            })
        }
    }

    render() {
        const { width } = this.state;
        return <div style={{ width }}>{ this.renderRows() }</div>;
    };

    renderRows() {
        const { selectedSeats: seats } = this.state;
        const { alpha } = this.props;
        return this.props.rows.map((row, index) => {
            // const rowNumber = alpha ?
            //     String.fromCharCode('A'.charCodeAt(0) + index) :
            //     (index + 1).toString();
            const rowNumber = (index + 1).toString();
            const isSelected = !seats.get(rowNumber, Set()).isEmpty();
            const props = {
                rowNumber,
                isSelected,
                selectedSeat: null,
                seats: row,
                key: `Row${rowNumber}`,
                selectSeat: this.selectSeat
            };

            return (
                <Row  {...props}>
                    {this.renderSeats(row, rowNumber, isSelected)}
                </Row>
            );
        });
    };

    renderSeats(seats, rowNumber, isRowSelected) {
        console.log(this.state)
        const { selectedSeats, size } = this.state;
        const { maxReservableSeats } = this.props;
        return seats.map((seat, index) => {
            if (seat === null) return <Blank key={index}/>;
            const isSelected = isRowSelected && selectedSeats.get(rowNumber).includes(seat.number);
            const props = {
                isSelected,
                isReserved: seat.isReserved,
                isEnabled: size < maxReservableSeats,
                isVip: seat.isVip,
                selectSeat: this.selectSeat.bind(this, rowNumber, seat.number),
                seatNumber: seat.number,
                key: index
            };
            return <Seat {...props} />;
        });
    }

    
}
