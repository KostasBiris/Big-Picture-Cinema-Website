import React from "react";
import { Route, Switch , Redirect} from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import  CustomerHomePage from './Pages/CustomerHomePage';
import LoginPage from './Pages/LoginPage';
import ReactDom from 'react-dom';
import SearchResults from "./components/Search";
import MoviePage from "./Pages/MoviePage";
import CustomerRegister from "./Pages/CustomerRegister";
import CustomerAccountPage from "./Pages/CustomerAccountPage";
import Payment from "./Payment/Payment";
import Screen1 from "./Seatmap/Screen1"
import Screen2 from "./Seatmap/Screen2"
import Screen3 from "./Seatmap/Screen3"
import ScreenVIP from "./Seatmap/ScreenVIP"
import ScreenIMAX from "./Seatmap/ScreenIMAX"
import BookTickets from "./Pages/BookTicketsPage";
//import AddScreenings from "./Pages/AddScreenings";
import AddScreening from './Pages/AddScreening';
import ArbitraryScreen from "./Seatmap/ArbitraryScreen";
import OverallAnalytics from "./Pages/OverallAnalytics";
import ScreeningResults from "./components/ScreeningResults";
import EmployeeLogin from "./Pages/EmployeeLogin";
import ManagerLogin from "./Pages/ManagerLogin";
import EPayment from "./Payment/Employee_Payment";
// import EmployeeMain from "./Pages/EmployeeMain";
import EmployeeBook from "./Pages/EmployeeBook";
import CustomerSite from "./Sites/CustomerSite";
import EmployeeSite from "./Sites/EmployeeSite";
import ManagerSite from "./Sites/ManagerSite";
import NotFoundPage from './NotFound/NotFoundPage'
import {useAuth} from "./auth"

import {createBrowserHistory} from 'history';
const history = createBrowserHistory();

const customerRoutes = ['/', '/home', '/search/', '/book', '/payment', '/account', '/register', '/login']
const employeeRoutes = ['/emain', '/ebook', '/eas', '/emain/search/', '/emain/view_movies', '/movie/:title', '/epayment', '/elogin']
const managerRoutes = ['/addmovies/search/', '/overall_analytics', '/addscreening','/mlogin']


function SiteType() {
  let location = history.location.pathname;

  var logged = useAuth();
  console.log(logged)

  // This if else statement block is only a quick fix for now
  if (location.includes("search"))
  {
    location = location.split("/");
    
    if (location.length == 4)
      location = "/" + location[1] + "/" + location[2] + "/"
    else
      location = "/" + location[1] + "/"
    console.log(location)
  }


  if (customerRoutes.includes(location)){
    console.log("customer")
    return <Route render={(props) => <CustomerSite {...props} logged={logged}/> }/>
  }
  else if (employeeRoutes.includes(location))
  {
    console.log("employee")
    return <Route render={(props) => <EmployeeSite {...props} logged={logged}/> }/>
  }
  else if (managerRoutes.includes(location))
  {
    console.log("manager")
    return <Route render={(props) => <ManagerSite {...props} logged={logged}/> }/>
  }
  else
    return <Route component={NotFoundPage} />

}


const App = (props) => (
    // Set up routing for our web application.
    // Redirce '/' to '/home' by default.
    
    
    
    <React.Fragment>
    <BrowserRouter>
      <Switch>
        <SiteType />
        
        


        {/* <Route exact path="/home" component={CustomerHomePage} /> 
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/search/:query" component={SearchResults}/> 
        <Route exact path="/movie/:title/:movieID" component={MoviePage}/>
        <Route exact path="/register" component={CustomerRegister}/>
        <Route exact path="/movie/:title" component={MoviePage}/>
        <Route exact path ="/account" component={CustomerAccountPage}/>
        <Route exact path="/payment" component={Payment}/>
        <Route exact path="/screen1" component={Screen1}/>
        <Route exact path="/screen2" render={Screen2}/>
        <Route exact path="/screen3" render={Screen3}/>
        <Route exact path="/screenVIP" render={ScreenVIP}/>
        <Route exact path="/screenIMAX" render={ScreenIMAX}/>
        <Route exact path="/book" component={BookTickets}/>
        <Route exact path="/addscreening" component={AddScreening} />
        <Route exact path="/as" component={ArbitraryScreen}/>
        <Route exact path="/overall_analytics" component={OverallAnalytics}/>
        <Route exact path="/searchscreenings/:query" component={ScreeningResults}/>
        <Route exact path="/elogin" component={EmployeeLogin}/>
        <Route exact path="/mlogin" component={ManagerLogin}/>
        <Route exact path="/epayment" component={EPayment}/>
        <Route exact path="/emain" component={EmployeeMain}/>
        <Route exact path="/ebook" component={EmployeeBook}/> */}
        <Route exact path="/ebook" component={EmployeeBook}/>
        <Route render={() => <Redirect to={{pathname: "/"}}/>}/>

      </Switch>
    </BrowserRouter>

    
    
    </React.Fragment>
  
);
export default App;
