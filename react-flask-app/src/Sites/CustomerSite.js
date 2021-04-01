import React from 'react';
import Banner from '../components/Banner';
import CustomerHomePage from '../Pages/CustomerHomePage';
import SearchResults from '../components/Search';
import SearchManager from '../components/SearchManager';
import { Route, Switch , Redirect} from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import LoginPage from '../Pages/LoginPage';
import MoviePage from "../Pages/MoviePage";
import ArbitraryScreen from "../Seatmap/ArbitraryScreen";
import BookTickets from "../Pages/BookTicketsPage";



class CustomerSite extends React.Component{

    constructor(props){
        super(props);

        
    }

render () {
    // console.log(this.props.history)
    return(


    <React.Fragment>
        <Banner history={this.props.history}/>
        <CustomerHomePage />
        <Link to={'/book'} />
        <Route path="/book" component={BookTickets}/>
            {/* <BrowserRouter>
                    <Switch>
                        <Route exact path="/book" component={BookTickets}/>
                        <Route exact path="/as" component={ArbitraryScreen}/>
                    </Switch>
            </BrowserRouter> */}
    </React.Fragment>

    );
}
}
export default CustomerSite;