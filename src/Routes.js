import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Main from './Pages/Main';
import Footer from './Components/Footer/Footer';

function Routes() {
  return (
    <Router>
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/" component={Nav} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
