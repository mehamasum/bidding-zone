import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { AuthContext } from '../AuthProvider';
import Navbar from './index';


test('Navbar shows login option by default', async () => {
    const { getByTestId, debug } = render(
        <Navbar />
    );
    const profileButton = getByTestId('profile-menu-btn');
    fireEvent.click(profileButton);
    await waitForElement(() => getByTestId('profile-menu'));
    expect(getByTestId('login-btn')).toBeInTheDocument();
})


test('Navbar shows login option when token is not present', async () => {
    const { getByTestId } = render(
        <AuthContext.Provider value={{ token: null }}>
            <Navbar />
        </AuthContext.Provider>
    );
    const profileButton = getByTestId('profile-menu-btn');
    fireEvent.click(profileButton);
    await waitForElement(() => getByTestId('profile-menu'));
    expect(getByTestId('login-btn')).toBeInTheDocument();
})


test('Navbar shows logout and profile menu when token is present', async () => {
    const { getByTestId } = render(
        <AuthContext.Provider value={{ token: 'dummy' }}>
            <Navbar />
        </AuthContext.Provider>
    );
    const profileButton = getByTestId('profile-menu-btn');
    fireEvent.click(profileButton);
    await waitForElement(() => getByTestId('profile-menu'));
    expect(getByTestId('logout-btn')).toBeInTheDocument();
    expect(getByTestId('profile-btn')).toBeInTheDocument();
})


