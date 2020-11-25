import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Participant from './Pages/Participant/Participant';
import Host from './Pages/Host/Host';

function Home() {
  return (
    <h3>Go to /host and /participant</h3>
  )
}

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/host" component={Host} />
      <Route exact path="/participant" component={Participant} />
    </Router>
  );
}

export default App;
