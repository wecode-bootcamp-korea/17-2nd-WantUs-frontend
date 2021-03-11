import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import Newintro from './Pages/Newintro/Newintro';
import Main from './Pages/Main/Main';
import Explore from './Pages/Explore/Explore';
import LocationModal from './Pages/Modal/LocationModal';
import TagModal from './Pages/Modal/TagModal';
import Login from './Pages/Login/Login';
import CV from './Pages/CV/CV';
import CVwrite from './Pages/CV/CVwrite';
import JobDetail from './Pages/JobDetail/JobDetail';
import Mypage from './Pages/Mypage/Mypage';
import MyProfile from './Pages/Mypage/MyProfile';

function Routes() {
  return (
    <Router>
      <Nav />
      <Login />
      <Switch>
        <Route exact path="/newintro" component={Main} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/" component={Newintro} />
        <Route exact path="/cv" component={CV} />
        <Route exact path="/cv/write" component={CVwrite} />
        <Route exact path="/detail/" component={JobDetail} />
        <Route exact path="/detail/:id" component={JobDetail} />
        <Route exact path="/" component={Main} />
        <Route exact path="/newintro" component={Newintro} />
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/myprofile" component={MyProfile} />
      </Switch>
      <TagModal />
      <LocationModal />
      <Footer />
    </Router>
  );
}

export default Routes;
