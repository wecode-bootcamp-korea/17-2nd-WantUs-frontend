import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import Newintro from './Pages/Newintro/Newintro';
import Main from './Pages/Main/Main';
import Explore from './Pages/Explore/Explore';
import LocationModal from './Pages/Modal/LocationModal';
import TagModal from './Pages/Modal/TagModal';
import CareerModal from './Pages/Modal/CareerModal';

function Routes() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/newintro" component={Newintro} />
        <Route exact path="/explore" component={Explore} />
      </Switch>
      {/* <TagModal />
      <LocationModal />
      <CareerModal /> */}
      <Footer />
    </Router>
  );
}

export default Routes;
