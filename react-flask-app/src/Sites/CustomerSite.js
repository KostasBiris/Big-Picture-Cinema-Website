import React from 'react';
import Banner from '../components/Banner';
import CustomerHomePage from '../Pages/CustomerHomePage';
import SearchResults from '../components/Search';
import SearchManager from '../components/SearchManager';
import { Route, Switch , Redirect} from "react-router";
import { BrowserRouter } from "react-router-dom";

class CustomerSite extends React.Component{

    constructor(props){
        super(props);
    }

render () {
    // console.log(this.props.history)
    return(
    <body>
        <Banner history={this.props.history}/>
        <CustomerHomePage />
        {/* <SearchResults /> */}
        {/* <SearchManager /> */}
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => (<Redirect to="/home" />)} />
                {/* <Route exact path="/home" component={CustomerHomePage} /> */}
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/search/:query" component={SearchResults}/>
                <Route exact path="/movie/:title/:movieID" component={MoviePage}/>
                <Route exact path="/home" component={CustomerSite}/>
            </Switch>
        </BrowserRouter>

    </body>
    );
}
}
export default CustomerSite;