import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import SendMessage from './components/SendMessage';
import Inbox from './components/Inbox';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/send" component={SendMessage} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/" exact>
          <h1>Welcome to Send Me</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;