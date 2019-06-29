import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { AuthContext, AuthProvider } from './index';


test('AuthProvider provides context from localstorage', async () => {
    localStorage.setItem('bidding-zone-token', 'dummy');
    const { container } = render(
        <AuthProvider>
            <AuthContext.Consumer>
                {({ token }) => {
                    return <div> Token is {token}</div>;
                }}
            </AuthContext.Consumer>
        </AuthProvider>
    );
    expect(container.innerHTML).toMatch('Token is dummy');
    localStorage.removeItem('bidding-zone-token');
})


test('AuthProvider saves token to localstorage after login', async () => {
    expect(localStorage.getItem('bidding-zone-token')).toBeNull();
    const { container } = render(
        <AuthProvider>
            <AuthContext.Consumer>
                {({ token, onLoginSuccess }) => {
                    onLoginSuccess('new-token');
                    if (token) return <div> Token is {token}</div>;
                    else return <div>No token</div>
                }}
            </AuthContext.Consumer>
        </AuthProvider>
    );
    expect(container.innerHTML).toMatch('Token is new-token');
    expect(localStorage.getItem('bidding-zone-token')).toBe('new-token');
    localStorage.removeItem('bidding-zone-token');
})


test('AuthProvider removes token from localstorage after logout', async () => {
    localStorage.setItem('bidding-zone-token', 'dummy');
    expect(localStorage.getItem('bidding-zone-token')).toBe('dummy');
    const { container, getByText } = render(
        <AuthProvider>
            <AuthContext.Consumer>
                {({ token, onLogoutSuccess }) => {
                    onLogoutSuccess();
                    if (token) return <div> Token is {token}</div>;
                    else return <div>No token</div>
                }}
            </AuthContext.Consumer>
        </AuthProvider>
    );


    expect(container.innerHTML).toMatch('No token');
    expect(localStorage.getItem('bidding-zone-token')).toBeNull();
    localStorage.removeItem('bidding-zone-token');
})
