import React from 'react'
import axios from 'axios'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import ItemListContainer from './index';
import { renderWithRouter } from '../../utils/testUtils';
import { AuthContext, AuthProvider } from '../AuthProvider';

jest.mock('axios', () => ({ get: jest.fn() }))

const data = {
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "images": [],
            "category": {
                "id": 1,
                "name": "Books"
            },
            "current_bid": 1.0,
            "name": "ad",
            "description": "",
            "units": 1,
            "status": "ON_AUCTION",
            "added": "2019-06-28T17:41:56.877894Z",
            "base_price": "0.00",
            "ending": "2019-08-31T01:00:00Z",
            "user": 1
        },
        {
            "id": 2,
            "images": [],
            "category": {
                "id": 1,
                "name": "Books"
            },
            "current_bid": 1.0,
            "name": "ad",
            "description": "",
            "units": 1,
            "status": "ON_AUCTION",
            "added": "2019-06-28T17:41:56.877894Z",
            "base_price": "0.00",
            "ending": "2019-08-31T01:00:00Z",
            "user": 1
        }
    ]
};

test('ItemList container makes an API call and displays the list', async () => {
    axios.get.mockResolvedValueOnce({ data });

    const url = `/api/auctionables/`;

    const { debug, getAllByTestId } = renderWithRouter(
        <AuthContext.Provider value={{ token: 'dummy' }}>
            <ItemListContainer url={url} />
        </AuthContext.Provider>)

    const header = { "headers": { "Authorization": "Token dummy" } };

    const cards = await waitForElement(() => getAllByTestId('item-preview-card'));
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url, header)
    expect(cards.length).toBe(data['results'].length);
})
