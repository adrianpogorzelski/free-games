import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../Header';

describe('Header component', () => {
  it('renders an <h1> tag with the text "Free games"', () => {
    const { getByText } = render(<Header />);

    const h1Element = getByText(/Free games/i);
    
    expect(h1Element).toBeInTheDocument();
  });
});
