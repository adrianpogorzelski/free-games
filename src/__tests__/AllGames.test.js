import React from 'react';
import {getByRole, fireEvent, render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllGames from '../pages/AllGames';
import fetchData from '../utils/fetchData';
import {BrowserRouter} from "react-router-dom";

jest.mock('../utils/fetchData');

const mockData = [
    { id: 1, title: 'Game A', thumbnail: '', genre: '' },
    { id: 2, title: 'Game B', thumbnail: '', genre: '' },
];

describe("AllGames", () => {
    it("renders cards", async () => {
        fetchData.mockResolvedValue(mockData);

        render(
            <BrowserRouter>
                <AllGames />
            </BrowserRouter>);

        const cards = await screen.findAllByTestId("game-card");
        expect(cards).toHaveLength(mockData.length);
    });

    describe("Pagination", () => {
        it("navigation buttons are rendered", () => {
            const {getByRole} = render(
                <BrowserRouter>
                    <AllGames />
                </BrowserRouter>);
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
            act(() => {
                fireEvent.click(getByText('2'));
            })
            act(() => {
                fireEvent.click(getByText('3'));
            })
            const backButton = getByText('«');
            expect(backButton.closest('.page-item')).not.toHaveClass('disabled');
        });

        it("back button subtracts 1 from current page", () => {
            const { getByTestId, getByText } = render(<AllGames />);
            expect(getByTestId('current-page-button')).toHaveTextContent('1');

            // go to page 3, then back
            act(() => {
                fireEvent.click(getByText('3'));
            })
            act(() => {
                fireEvent.click(getByText('«'));
            })

            // currentPage should be 2
            expect(getByTestId('current-page-button')).toHaveTextContent('2');

        })
        it("next button adds 1 to current page", () => {
            const { getByTestId, getByText } = render(<AllGames />);
            expect(getByTestId('current-page-button')).toHaveTextContent('1');

            act(() => {
                fireEvent.click(getByText('»'));
            })

            // currentPage should be 2
            expect(getByTestId('current-page-button')).toHaveTextContent('2');
        })
        it("every button goes to that page", async () => {
            fetchData.mockResolvedValue(mockData);
            const { getAllByTestId, getByTestId, getByText } = render(<AllGames />);

            // Click each button and check if current page updates
            const pageButtons = getAllByTestId('page-button')
            for (let i = 1; i < pageButtons.length; i++) {

                act(() => {
                    fireEvent.click(getByText('3'))
                })
                let button = getByText(i)

                act(() => {
                    fireEvent.click(button)
                })
                let currentPage = getByTestId('current-page-button')

                expect(currentPage).toHaveTextContent(i);
            }
        });

        it("plus one page button hidden on last page", () => {
            const { getByLabelText } = render(<AllGames />);
            const plusOneButton = getByLabelText("plus-one");
            expect(plusOneButton.closest('li')).toHaveClass('d-none');
            expect(plusOneButton.closest('li')).not.toHaveClass('d-block');
        })

        it("plus one page button visible when not on last page", async () => {
            const mockGame = { id: 0, title: 'Title', thumbnail: 'Pic', genre: 'Game' };

            fetchData.mockResolvedValue(new Array(40).fill(mockGame));
            const { getByLabelText } = render(<AllGames />);
            const cards = await screen.findAllByTestId("game-card");
            expect(cards).toHaveLength(20);

            const plusOneButton = await getByLabelText("plus-one");
            expect(plusOneButton.closest('li')).not.toHaveClass('d-none');
            expect(plusOneButton.closest('li')).toHaveClass('d-block');
        })

        it("plus two page button hidden on last but one page", () => {
            const { getByLabelText } = render(<AllGames />);
            const plusOneButton = getByLabelText("plus-two");
            expect(plusOneButton.closest('li')).toHaveClass('d-none');
            expect(plusOneButton.closest('li')).not.toHaveClass('d-block');
        })

        it("plus two page button visible when not on last but one page", async () => {
            const mockGame = { id: 0, title: 'Title', thumbnail: 'Pic', genre: 'Game' };

            fetchData.mockResolvedValue(new Array(60).fill(mockGame));
            const { getByLabelText } = render(<AllGames />);
            const cards = await screen.findAllByTestId("game-card");
            expect(cards).toHaveLength(20);

            const plusOneButton = await getByLabelText("plus-two");
            expect(plusOneButton.closest('li')).not.toHaveClass('d-none');
            expect(plusOneButton.closest('li')).toHaveClass('d-block');
        })


    });
});