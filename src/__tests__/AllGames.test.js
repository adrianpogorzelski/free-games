import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllGames from '../AllGames';

describe("AllGames", () => {
    it("renders cards", () => {
        render(<AllGames />);
        const cards = screen.queryAllByClassName('card');
        expect(cards.length).toBeGreaterThan(1);
    })
})