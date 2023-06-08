import React from 'react'
import Main from './Main'
import About from './About';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import View from './View';


const App = () => {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/about" component={About} />
      <Route path="/view/:id" component={View} />
    </Switch>
  </Router>
  )
}

export default App
