import React from 'react';

import { Redirect, Route, Switch } from "react-router";
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
import Footer from '../components/Footer';
import {createBrowserHistory} from 'history';


class EmployeeSite extends React.Component{

    constructor(props){
        super(props);
        this.whatBanner = this.whatBanner.bind(this);        
    }

    whatBanner = () => { 
        // if (this.props.logged[0] == true)
            return (<React.Fragment>
                        <EmployeeBanner history={this.props.history} logged={this.props.logged[0]}/>
                        <EMenu />
                        <Route exact path ="/emain" component={EmployeeMain}/>
                        <Route path="/ebook" render={(props) => <BookTickets {...props} isEmployee={true}/> } />
                        <Route path="/eas" render={(props) => <ArbitraryScreen {...props} isEmployee={true}/> }/>
                        <Route path="/emain/search/:query" component={SearchResults}/>
                        <Route path="/emain/view_movies" component={ViewMovies}/>
                        <Route path ="/emain/account" component={CustomerAccountPage}/>
                        <Route path="/movie/:title" render={(props) => <MoviePage {...props} isEmployee={true}/> }/>
                        <Route path="/epayment" component={EPayment}/>
                        <Footer/>

                    </React.Fragment>)
    }




render () {
    // const history = createBrowserHistory();
    console.log(this.props.logged)
    return(
    <React.Fragment>
        {this.whatBanner()}
        
    </React.Fragment>

    );
}
}
export default EmployeeSite;