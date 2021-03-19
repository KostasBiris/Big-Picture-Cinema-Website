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
import Screen1 from "./Seatmap/Screen1"
import Screen2 from "./Seatmap/Screen2"
import Screen3 from "./Seatmap/Screen3"
import ScreenVIP from "./Seatmap/ScreenVIP"
import ScreenIMAX from "./Seatmap/ScreenIMAX"
import BookTickets from "./Pages/BookTicketsPage";


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
        <Route exact path="/payment" component={Payment}/>
        <Route exact path="/screen1" component={Screen1}/>
        <Route exact path="/screen2" render={Screen2}/>
        <Route exact path="/screen3" render={Screen3}/>
        <Route exact path="/screenVIP" render={ScreenVIP}/>
        <Route exact path="/screenIMAX" render={ScreenIMAX}/>
        <Route exact path="/book" component={BookTickets}/>
      </Switch>
    </BrowserRouter>
  
);
export default App;
