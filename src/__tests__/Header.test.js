import React from 'react';
import {getByRole, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../components/Header';

describe('Header component', () => {
  it('renders an <h1> tag with the text "Free games"', () => {
    const { getByText } = render(<Header />);

    const h1Element = getByText(/Free games/i);
    
    expect(h1Element).toBeInTheDocument();
  });
  describe('Navigation', () => {
    it('renders a nav element', () => {
      const { getByRole } = render(<Header />);

      const navElement = getByRole('navigation')

      expect(navElement).toBeInTheDocument();
    });
    it('renders "All games" nav item', () => {
      const { getByText } = render(<Header />);

      const allGamesButton = getByText(/All games/i)

      expect(allGamesButton).toBeInTheDocument();
    })
  })
});
