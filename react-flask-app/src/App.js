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



const App = () => (
    //Set up routing for our web application.
    //Redirce '/' to '/home' by default.
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/home" />)} />
        <Route exact path="/home" component={CustomerHomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/search/:query" component={SearchResults}/>
        <Route exact path="/movie/:title" component={MoviePage}/>
        <Route exact path="/register" component={CustomerRegister}/>
      </Switch>
    </BrowserRouter>
  
);
export default App;
