import React from 'react';

import { Route } from "react-router";
import { Link } from "react-router-dom";
import ArbitraryScreen from "../Seatmap/ArbitraryScreen";
import BookTickets from "../Pages/BookTicketsPage";
import EmployeeBanner from "../components/EmployeeBanner";
import SearchResults from '../components/Search';
import EmployeeMain from '../Pages/EmployeeMain';
import Payment from "../Payment/Payment";


import {createBrowserHistory} from 'history';


class CustomerSite extends React.Component{

    constructor(props){
        super(props);        
    }

render () {
    const history = createBrowserHistory();
    return(
    <React.Fragment>
        <EmployeeBanner history={history}/>
        <Link to={'/emain'} />
        {/* <Route exact path="/" render={() => (<Redirect to="/emain" />)} /> */}
        <Route path ="/emain" component={EmployeeMain}/>
        <Link to={'/book'} />
        <Route path="/book" component={BookTickets}/>
        <Link to={'/as'} />
        <Route path="/as" component={ArbitraryScreen}/>
        <Link to={'/payment'} />
        <Route path="/payment" component={Payment}/>
        <Link to={'/search/:query'} />
        <Route path="/search/:query" component={SearchResults}/>
        
    </React.Fragment>

    );
}
}
export default CustomerSite;