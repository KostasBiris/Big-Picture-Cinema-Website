import React from "react";
import { Route, Switch , Redirect} from "react-router";
import { BrowserRouter } from "react-router-dom";
import  CustomerHomePage from './Pages/CustomerHomePage';
import LoginPage from './Pages/LoginPage';
import reactDom from 'react-dom';
import Search from './components/Search'
import SearchResults from "./components/Search";
import MoviePage from "./Pages/MoviePage";
import CustomerRegister from "./Pages/CustomerRegister";
import CustomerAccountPage from "./Pages/CustomerAccountPage";
import Payment from "./Payment/Payment";
import Seatmap from "./Seatmap/SeatRender"



const App = () => (
    // Set up routing for our web application.
    // Redirce '/' to '/home' by default.
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/home" />)} />
        <Route exact path="/home" component={CustomerHomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/search/:query" component={SearchResults}/>
        <Route exact path="/movie/:title/:movieID" component={MoviePage}/>
        <Route exact path="/register" component={CustomerRegister}/>
        <Route exact path ="/account" component={CustomerAccountPage}/>
        <Route exact path="/payment" render={Payment}/>
        <Route exact path="/screen" render={Seatmap}/>
      </Switch>
    </BrowserRouter>
  
);
export default App;
