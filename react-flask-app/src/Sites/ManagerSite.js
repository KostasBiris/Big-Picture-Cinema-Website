import React from 'react';

import { Route, Switch } from "react-router";
import { Link, BrowserRouter } from "react-router-dom";
import ManagerLogin from "../Pages/ManagerLogin";
import SearchManager from "../components/SearchManager";
import ManagerBanner from "../components/ManagerBanner";
import OverallAnalytics from "../Pages/OverallAnalytics";
import AddScreening from '../Pages/AddScreening';


import {createBrowserHistory} from 'history';


class CustomerSite extends React.Component{

    constructor(props){
        super(props);        
    }

render () {
    const history = createBrowserHistory();
    return(
    <React.Fragment>

        
        {/* <Route path ="/mlogin" component={ManagerLogin}/> */}

        <ManagerBanner history={history}/>
        <Route path ="/addmovies/search/:query" component={SearchManager}/>
        <Route path="/overall_analytics" component={OverallAnalytics}/>
        <Route path="/addscreening" component={AddScreening} />
        
    </React.Fragment>

    );
}
}
export default CustomerSite;