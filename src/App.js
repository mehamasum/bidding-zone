import React from 'react';
import { AuthProvider } from './components/AuthProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import ItemDetails from './pages/ItemDetails';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login/" component={Login} />
          <PrivateRoute exact path="/items/:id?" component={ItemDetails} />
          <PrivateRoute exact path="/profiles/:id?" render={() => 'Profile page'} />
          <Route render={() => '404'} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
