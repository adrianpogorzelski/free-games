import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllGames from '../AllGames';
import fetchData from '../fetchData';

jest.mock('../fetchData');

const mockData = [
    { id: 1, title: 'Game A', thumbnail: '', genre: '' },
    { id: 2, title: 'Game B', thumbnail: '', genre: '' },
];

describe("AllGames", () => {
    it("renders cards", async () => {
        fetchData.mockResolvedValue(mockData);

        render(<AllGames />);
        const cards = await screen.findAllByTestId("game-card");
        expect(cards.length).toBeGreaterThan(1);
    });
});