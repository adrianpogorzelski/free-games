import React from 'react';
import {getByRole, fireEvent, render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllGames from '../pages/AllGames';
import fetchData from '../utils/fetchData';
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import {Provider, useSelector} from "react-redux";
import allGamesReducer from "../store/allGamesSlice"
import gameDetailsReducer from "../store/gameDetailsSlice"

jest.mock('../utils/fetchData');
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
}));

const mockData = [
    { id: 1, title: 'Game A', thumbnail: '', genre: '' },
    { id: 2, title: 'Game B', thumbnail: '', genre: '' },
];

const mockStore = configureStore({
    reducer: {
        allGames: allGamesReducer,
        gameDetails: gameDetailsReducer
    },
    preloadedState: {
        allGames: mockData
    }
});

beforeEach(() => {
    fetchData.mockClear();
    useSelector.mockClear();
});

describe("AllGames", () => {
    describe("Rendering cards", () => {
        it("renders cards", async () => {
            useSelector.mockReturnValue(mockData)

            render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>
                </Provider>
            );

            const cards = await screen.findAllByTestId("game-card");
            expect(cards).toHaveLength(mockData.length);
        });

        it('displays games based on state', () => {
            // Setting the mock return value for useSelector
            useSelector.mockReturnValue([
                { id: 1, title: 'Game 1' },
                { id: 2, title: 'Game 2' }
            ]);

            const { getByText } = render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>
                </Provider>
            );

            // Assertions
            expect(getByText('Game 1')).toBeInTheDocument();
            expect(getByText('Game 2')).toBeInTheDocument();
        });

    })

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