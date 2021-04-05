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
import EmployeeLogin from "../Pages/EmployeeLogin";
import EPayment from "../Payment/Employee_Payment";
import EMenu from "../components/EmployeeMenu";

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

        <EMenu />
        
        {/* <Link to={'/emain'} /> */}
        {/* <Route exact path="/" render={() => (<Redirect to="/emain" />)} /> */}
        <Route exact path ="/emain" component={EmployeeMain}/>
        {/* <Link to={'/book'} /> */}
        <Route path="/ebook" render={(props) => <BookTickets {...props} isEmployee={true}/> } />
        {/* <Route path="/ebook" component={BookTickets}/> */}
        {/* <Link to={'/as'} /> */}
        {/* <Route path="/eas" render={(props) => <ArbitraryScreen {...props} isEmployee={true}/> } /> */}
        <Route path="/eas" render={(props) => <ArbitraryScreen {...props} isEmployee={true}/> }/>
        {/* <Link to={'/payment'} /> */}
        {/* <Route path="/payment" component={Payment}/> */}
        {/* <Link to={'emain/search/:query'} /> */}
        <Route path="/emain/search/:query" component={SearchResults}/>

        <Route path="/register" component={CustomerRegister}/>

        <Route path="/emain/view_movies" component={ViewMovies}/>

        <Route path ="/emain/account" component={CustomerAccountPage}/>

        {/* <Route path ="/movie/:title" component={MoviePage}/> */}
        <Route path="/movie/:title" render={(props) => <MoviePage {...props} isEmployee={true}/> }/>

        <Route path ="/elogin" component={EmployeeLogin}/>

        <Route path="/epayment" component={EPayment}/>
    </React.Fragment>

    );
}
}
export default CustomerSite;