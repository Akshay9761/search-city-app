import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Shortlist from './components/Shortlist/Shortlist';
import Header from './components/Header/Header';
import ErrorPage from './components/Error/Error';

import './App.css';

function App() {
  return (
    <main>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/shorlisted-cities" component={Shortlist} />
        <Route component={ErrorPage} />
      </Switch>
    </main>
  );
}

export default App;
