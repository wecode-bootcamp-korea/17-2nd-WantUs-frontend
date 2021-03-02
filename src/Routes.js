import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav'

function Routes() {
  return (
    <Router>
      <Nav />
      <Switch>
      <Route exact path="/" component={Nav} />
    </Switch>
  </Router>
  )
}

export default Routes
