import React from 'react';


class BottomNavButtons extends React.Component{

    constructor(props){
        super(props);

    }

render () {
    // console.log(this.props.history)
    return(


    <React.Fragment>
        <nav>
        <div className="container text-center">
            <button className="tab_background text mr-3 btn-lg">{'<'}</button>
            <button className="tab_background text mr-3 btn-lg">MOVIE</button>
            <button className="tab_background text mr-3 btn-lg" onClick={this.props.goToSeatMap}>SEATS</button>
            <button className="tab_background text mr-9 btn-lg">CHECKOUT</button>
            <button className="tab_background text mr-3 btn-lg" style={{marginLeft:'12px'}}>{'>'}</button>
        </div>
        </nav>
        <br />
        <br />
        <br />
    </React.Fragment>

    );
}
}
export default BottomNavButtons;