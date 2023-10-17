import React from 'react';
import { getByRole, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllGames from '../pages/AllGames';
import fetchData from '../utils/fetchData';

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
    describe("Pagination", () => {
        it("navigation buttons are rendered", () => {
            const {getByRole} = render(<AllGames/>)
            const navElement = getByRole('navigation')
            expect(navElement).toBeInTheDocument();
        })
        it("back button disabled on 1st page", () => {
            const { getByLabelText } = render(<AllGames />);
            const backButton = getByLabelText("Previous");
            expect(backButton.closest('.page-item')).toHaveClass('disabled');
        })
        it("back button enabled on 3rd page", async () => {
            const { getByText } = render(<AllGames />);
            fireEvent.click(getByText('2'));
            fireEvent.click(getByText('3'));
            const backButton = getByText('«');
            expect(backButton.closest('.page-item')).not.toHaveClass('disabled');
        });
    });
});