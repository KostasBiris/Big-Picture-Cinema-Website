import React from 'react';

import { Route, Redirect } from "react-router";
import { Link, BrowserRouter } from "react-router-dom";
import ManagerLogin from "../Pages/ManagerLogin";
import SearchManager from "../components/SearchManager";
import ManagerBanner from "../components/ManagerBanner";
import OverallAnalytics from "../Pages/OverallAnalytics";
import AddScreening from '../Pages/AddScreening';
import Footer from '../components/Footer';

import {createBrowserHistory} from 'history';


class ManagerSite extends React.Component{

    constructor(props){
        super(props);
        this.whatBanner = this.whatBanner.bind(this);         
    }


    whatBanner = () => { 
        // if (this.props.logged[0] == true)
            return (
                <React.Fragment>
                    <ManagerBanner history={this.props.history} logged={this.props.logged[0]}/>
                    <Route path ="/addmovies/search/:query" component={SearchManager}/>
                    <Route path="/overall_analytics" component={OverallAnalytics}/>
                    <Route path="/addscreening" component={AddScreening} />
                    <Footer/>

                </React.Fragment>)
        // else
        // {
        //     return(
        //         <React.Fragment>
        //             <Route path ="/mlogin" component={ManagerLogin}/>
        //             <Redirect to="/mlogin" />
        //         </React.Fragment>
        //     )
        // }
    }

render () {
    const history = createBrowserHistory();
    return(
    <React.Fragment>
        {this.whatBanner()}
        
        
    </React.Fragment>

    );
}
}
export default ManagerSite;