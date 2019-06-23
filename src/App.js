import React from 'react';
import Login from './pages/Login';
import { AuthProvider } from './components/AuthProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login/" component={Login} />
      </AuthProvider>
    </Router>
  );
}

export default App;
