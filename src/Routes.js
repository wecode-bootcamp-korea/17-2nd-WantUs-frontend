import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import Newintro from './Pages/Newintro/Newintro';
import Main from './Pages/Main/Main';
import Explore from './Pages/Explore/Explore';

function Routes() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/newintro" component={Newintro} />
        <Route exact path="/explore" component={Explore} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
