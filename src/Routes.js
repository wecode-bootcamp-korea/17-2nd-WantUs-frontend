import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import Newintro from './Pages/Newintro/Newintro';

function Routes() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/newintro" component={Newintro} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
