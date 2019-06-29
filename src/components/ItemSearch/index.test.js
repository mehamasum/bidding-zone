import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemSearch from './index';

const categories = [
    { "id": '', "name": "All" },
    { "id": '1', "name": "Books" },
    { "id": '2', "name": "Toys" },
    { "id": '3', "name": "Cars" }];

const handleCategoryChange = jest.fn();
const handleQueryChange = jest.fn();

test('ItemSearch calls handlers properly', () => {
    const { debug, getByTestId, getAllByRole } = render(<ItemSearch
        categories={categories}
        selectedCategory={""}
        onChange={handleCategoryChange}
        onQueryChange={handleQueryChange} />);

    const qInput = getByTestId('query-input');
    fireEvent.change(qInput, {
        target: {
            value: 'apple watch'
        }
    })
    expect(handleQueryChange).toBeCalledTimes(1);
    expect(handleQueryChange).toBeCalledWith('apple watch');

    const selectButton = getAllByRole('button')[0];
    fireEvent.click(selectButton);
    const options = getAllByRole('option');
    fireEvent.click(options[3]); // select cars

    expect(handleCategoryChange).toBeCalledTimes(1);
    expect(handleCategoryChange).toBeCalledWith({
        target: {
            value: '3'
        }
    });
})



