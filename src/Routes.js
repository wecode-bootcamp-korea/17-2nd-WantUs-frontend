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
import Login from './Pages/Login/Login';
import CV from './Pages/CV/CV';
import CVwrite from './Pages/CV/CVwrite';

function Routes() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/newintro" component={Main} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/explore/posting/posting_list=:id?category=id" />
        <Route exact path="/" component={Newintro} />
        <Route exact path="/cv" component={CV} />
        <Route exact path="/cv/write" component={CVwrite} />
      </Switch>
      {/* 
      <Login />
      <TagModal />
      <LocationModal />
    */}
      <Footer />
    </Router>
  );
}

export default Routes;
