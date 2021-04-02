import React from 'react';

import { Route, Switch } from "react-router";
import { Link, BrowserRouter } from "react-router-dom";
import ArbitraryScreen from "../Seatmap/ArbitraryScreen";
import BookTickets from "../Pages/BookTicketsPage";
import EmployeeBanner from "../components/EmployeeBanner";
import SearchResults from '../components/Search';
import EmployeeMain from '../Pages/EmployeeMain';
import Payment from "../Payment/Payment";
import CustomerRegister from "../Pages/CustomerRegister";
import ViewMovies from "../Pages/ViewMovies";
import CustomerAccountPage from "../Pages/CustomerAccountPage";
import MoviePage from "../Pages/MoviePage";


import {createBrowserHistory} from 'history';


class CustomerSite extends React.Component{

    constructor(props){
        super(props);        
    }

render () {
    const history = createBrowserHistory();
    console.log("INSIDE THE EMPLOYEE SITE !")
    return(
    <React.Fragment>

        <EmployeeBanner history={history}/>
        {/* <Link to={'/emain'} /> */}
        {/* <Route exact path="/" render={() => (<Redirect to="/emain" />)} /> */}
        <Route exact path ="/emain" component={EmployeeMain}/>
        {/* <Link to={'/book'} /> */}
        <Route path="/emain/book" component={BookTickets}/>
        {/* <Link to={'/as'} /> */}
        <Route path="/emain/as" component={ArbitraryScreen}/>
        {/* <Link to={'/payment'} /> */}
        <Route path="/emain/payment" component={Payment}/>
        {/* <Link to={'emain/search/:query'} /> */}
        <Route path="/emain/search/:query" component={SearchResults}/>

        <Route path="/emain/register" component={CustomerRegister}/>

        <Route path="/emain/view_movies" component={ViewMovies}/>

        <Route path ="/emain/account" component={CustomerAccountPage}/>

        <Route path ="/movie/:title" component={MoviePage}/>

    </React.Fragment>

    );
}
}
export default CustomerSite;