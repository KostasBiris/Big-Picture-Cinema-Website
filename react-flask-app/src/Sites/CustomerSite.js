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
import {withHooksHOC} from "../auth/withHooksHOC";
import Footer from '../components/Footer';
import ScreeningResults from '../components/ScreeningResults'
import {createBrowserHistory} from 'history';

class CustomerSite extends React.Component{
    

    constructor(props){
        super(props);     
        this.whatBanner = this.whatBanner.bind(this);        
    }

    
    whatBanner = (hist) => { 
        // console.log(this.props.logged[0])
        if (this.props.logged[0])
            return <Banner history={this.props.history} logged={this.props.logged[0]}/>
        else
            return <Banner history={hist}/>
    }

render () {
    const history = createBrowserHistory();

    return(

    <React.Fragment>
        {this.whatBanner(history)}
        <Route exact path="/" render={() => (<Redirect to="/home" />)} />
        <Route exact path ="/home" component={CustomerHomePage}/>
        <Route path="/book" component={BookTickets}/>
        {/* <Route path="/book" render = {(props) => <BookTickets {...props} isAuthed={this.props.logged[0]}/>}/> */}
        <Route path="/as" component={ArbitraryScreen}/>
        {/* <Route path="/payment" component={Payment}/> */}
        <Route path="/payment" render = {(props) => <Payment {...props} isAuthed={this.props.logged[0]}/>}/>
        <Route path="/search/:query" component={SearchResults}/>
        <Route path="/searchscreenings/:query" component={ScreeningResults}/>
        <Route path ="/account" component={CustomerAccountPage}/>
        <Route path ="/movie/:title" component={MoviePage}/>
        <Route path="/register" component={CustomerRegister}/>
        <Route path="/login" component={LoginPage}/>
        <Footer/>

    </React.Fragment>

    );
}
}
export default withHooksHOC(CustomerSite);