import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import  CustomerHomePage from './Pages/CustomerHomePage';
import LoginPage from './Pages/LoginPage';
import reactDom from 'react-dom';
import Search from './components/Search'

const App = () => {
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={CustomerHomePage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </BrowserRouter>

   return (
    <div className="container">
      <Search />
    </div>
   );

};

export default App