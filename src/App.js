import React from 'react';
import Login from './pages/Login';
import { AuthProvider } from './components/AuthProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login/" component={Login} />
          <Route render={()=> '404'} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
