import React from 'react';
import { AuthProvider } from './components/AuthProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import ItemDetails from './pages/ItemDetails';
import Profile from './pages/Profile';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/login/" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/items/:id?" component={ItemDetails} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route render={() => '404'} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
