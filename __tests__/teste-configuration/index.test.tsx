import React from 'react';

import { render } from '@testing-library/react';

import Home from '../../pages';

describe('Test to verify RTL configuration', () => {
  it('Checks if the index page is rendered', () => {
    render(<Home />);
    const body = document.body;
    expect(body).toBeInTheDocument();
  });
});
