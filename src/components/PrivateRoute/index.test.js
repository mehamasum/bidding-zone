import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { AuthContext, AuthProvider } from '../AuthProvider';
import PrivateRoute from './index';
import { renderWithRouter } from '../../utils/testUtils';
import { Switch, Route } from 'react-router-dom';

const Login = () => <div>Login Here</div>
const Home = () => <div>You are home</div>


test('PrivateRoute takes to login page if token is not provided', async () => {
    const { container } = renderWithRouter(
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
        </Switch>
    );
    expect(container.innerHTML).toMatch('Login Here')
})

test('PrivateRoute renders private component if token is present', async () => {
    const { container } = renderWithRouter(
        <AuthContext.Provider value={{ token: 'dummy' }}>
            <PrivateRoute exact path="/" component={Home} />
        </AuthContext.Provider>
    );
    expect(container.innerHTML).toMatch('You are home')
})