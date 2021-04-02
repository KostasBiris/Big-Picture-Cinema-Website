import React from 'react';
import Banner from '../components/Banner';
import CustomerHomePage from '../Pages/CustomerHomePage';
import SearchResults from '../components/Search';
import { Route, Redirect} from "react-router";
import LoginPage from '../Pages/LoginPage';
import MoviePage from "../Pages/MoviePage";
import ArbitraryScreen from "../Seatmap/ArbitraryScreen";
import BookTickets from "../Pages/BookTicketsPage";
import Payment from "../Payment/Payment";
import CustomerAccountPage from "../Pages/CustomerAccountPage";
import CustomerRegister from "../Pages/CustomerRegister";

import {createBrowserHistory} from 'history';


class CustomerSite extends React.Component{

    constructor(props){
        super(props);    
        console.log("heyy")    
    }

render () {
    const history = createBrowserHistory();
    
    return(


    <React.Fragment>
        <Banner history={history}/>
        {/* <Link to={'/home'} /> */}
        <Route exact path="/" render={() => (<Redirect to="/home" />)} />
        <Route exact path ="/home" component={CustomerHomePage}/>
        
        {/* <Link to={'/book'} /> */}
        <Route path="/book" component={BookTickets}/>
        {/* <Link to={'/as'} /> */}
        <Route path="/as" component={ArbitraryScreen}/>
        {/* <Link to={'/payment'} /> */}
        <Route path="/payment" component={Payment}/>
        {/* <Link to={'/search/:query'} /> */}
        <Route path="/search/:query" component={SearchResults}/>
        {/* <Link to={'account'} /> */}
        <Route path ="/account" component={CustomerAccountPage}/>
        {/* <Link to={'/movie/:title'} /> */}
        <Route path ="/movie/:title" component={MoviePage}/>

        <Route path="/register" component={CustomerRegister}/>

        <Route path="/login" component={LoginPage}/>

    </React.Fragment>

    );
}
}
export default CustomerSite;