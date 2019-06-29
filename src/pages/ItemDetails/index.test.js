import React from 'react'
import axios from 'axios'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import ItemDetailsContainer from './index';
import { renderWithRouter } from '../../utils/testUtils';
import { AuthContext, AuthProvider } from '../../components/AuthProvider';

jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn()
}))

const data = {
    "id": 1,
    "images": [],
    "category": {
        "id": 1,
        "name": "Books"
    },
    "current_bid": 1505.00,
    "name": "ad",
    "description": "",
    "units": 1,
    "status": "ON_AUCTION",
    "added": "2019-06-28T17:41:56.877894Z",
    "base_price": "0.00",
    "ending": "2019-08-31T01:00:00Z",
    "user": 1
};

const bids = [
    {
        "id": 9,
        "user": {
            "id": 1,
            "username": "meha"
        },
        "amount": "1505.00",
        "added": "2019-06-29T10:12:35.023495Z",
        "item": 1
    },
    {
        "id": 5,
        "user": {
            "id": 1,
            "username": "meha"
        },
        "amount": "1503.00",
        "added": "2019-06-28T13:47:22.541208Z",
        "item": 1
    }
];

const newBid = {
    'id': '100',
    'user': 1,
    'amount': '1600'
}

test('ItemList container makes an API call and displays 3 containers', async () => {
    axios.get
        .mockResolvedValueOnce({ data })
        .mockResolvedValueOnce({ data: bids });
    const { debug, getAllByTestId, getByTestId } = renderWithRouter(
        <AuthContext.Provider value={{ token: 'dummy' }}>
            <ItemDetailsContainer match={{
                params: { id: 1 }
            }} />
        </AuthContext.Provider>)
    const cards = await waitForElement(() => getAllByTestId('item-container'));
    expect(cards.length).toBe(3);
    expect(axios.get).toHaveBeenCalledTimes(2);
})


test('ItemList container makes an API call to place a bid and shows toast message', async () => {
    axios.get
        .mockResolvedValueOnce({ data })
        .mockResolvedValueOnce({ data: bids });
    axios.post
        .mockResolvedValueOnce({ data: newBid });
    const { debug, getAllByTestId, getByTestId } = renderWithRouter(
        <AuthContext.Provider value={{ token: 'dummy' }}>
            <ItemDetailsContainer match={{
                params: { id: 1 }
            }} />
        </AuthContext.Provider>)
    await waitForElement(() => getAllByTestId('item-container'));
    const input = getByTestId('bid-input');
    fireEvent.change(input, {
        target: {
            value: '1600'
        }
    })
    const btn = getByTestId('bid-submit-btn');
    fireEvent.click(btn);
    expect(axios.post).toHaveBeenCalledTimes(1);

    const toast = await waitForElement(() => getByTestId('toast-msg'));
    expect(toast).toHaveTextContent('Your bid is placed!');
})
