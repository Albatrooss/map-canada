import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Map, Teacher } from './components';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Teacher} />
        <Route path='/:id' component={Map} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
