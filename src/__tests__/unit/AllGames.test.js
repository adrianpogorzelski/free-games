import React from 'react';
import {getByRole, fireEvent, render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllGames from '../../pages/AllGames';
import fetchData from '../../utils/fetchData';
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import {Provider, useSelector} from "react-redux";
import allGamesReducer from "../../store/allGamesSlice"
import gameDetailsReducer from "../../store/gameDetailsSlice"
import {mockData, mockGame, mockStore} from "./mockData";

jest.mock('../../utils/fetchData');
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
}));

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

        it("does not render any cards if store is empty", () => {
            const emptyStore = configureStore({
                reducer: {
                    allGames: allGamesReducer,
                },
                preloadedState: {
                    allGames: {
                        games: [],
                        currentStatus: 'idle',
                        error: null
                    }
                }
            });

            const { queryAllByTestId } = render(
                <Provider store={emptyStore}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>
                </Provider>
            );

            const cards = queryAllByTestId("game-card");
            expect(cards).toHaveLength(0);
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
        beforeEach(() => {
            useSelector.mockReturnValue(mockData)
        })

        it("navigation buttons are rendered", () => {
            const {getByRole} = render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>);
                </Provider>
            );

            const navElement = getByRole('navigation')
            expect(navElement).toBeInTheDocument();
        })
        it("back button disabled on 1st page", () => {
            const { getByLabelText } = render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>);
                </Provider>
            );
            const backButton = getByLabelText("Previous");
            expect(backButton.closest('.page-item')).toHaveClass('disabled');
        })
        it("back button enabled on 3rd page", async () => {
            const { getByText } = render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>);
                </Provider>
            );
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
            const { getByTestId, getByText } = render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>);
                </Provider>
            );
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
            const { getByTestId, getByText } = render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>);
                </Provider>
            );
            expect(getByTestId('current-page-button')).toHaveTextContent('1');

            act(() => {
                fireEvent.click(getByText('»'));
            })

            // currentPage should be 2
            expect(getByTestId('current-page-button')).toHaveTextContent('2');
        })
        it("every button goes to that page", async () => {
            fetchData.mockResolvedValue(mockData);
            const { getAllByTestId, getByTestId, getByText } = render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>);
                </Provider>
            );

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
            const { getByLabelText } = render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>);
                </Provider>
            );
            const plusOneButton = getByLabelText("plus-one");
            expect(plusOneButton.closest('li')).toHaveClass('d-none');
            expect(plusOneButton.closest('li')).not.toHaveClass('d-block');
        })

        it("plus one page button visible when not on last page", async () => {
            useSelector.mockImplementation(callback => callback({
                allGames: {
                    games: new Array(60).fill(mockGame),
                    currentStatus: 'idle',
                    error: null
                },
                filters: {
                    filteredGames: null
                }
            }));

            const mockStore40 = configureStore({
                reducer: {
                    allGames: allGamesReducer,
                    gameDetails: gameDetailsReducer
                },
                filters: {
                    filteredGames: null
                },
                preloadedState: {
                    allGames: {
                        games: new Array(60).fill(mockGame),
                        currentStatus: 'idle',
                        error: null
                    }
                }
            });

            const { getByLabelText } = render(
                <Provider store={mockStore40}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>);
                </Provider>
            );

            const cards = await screen.findAllByTestId("game-card");
            expect(cards).toHaveLength(20);

            const plusOneButton = await getByLabelText("plus-one");
            expect(plusOneButton.closest('li')).not.toHaveClass('d-none');
            expect(plusOneButton.closest('li')).toHaveClass('d-block');
        })

        it("plus two page button hidden on last but one page", () => {
            const { getByLabelText } = render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>);
                </Provider>
            );
            const plusOneButton = getByLabelText("plus-two");
            expect(plusOneButton.closest('li')).toHaveClass('d-none');
            expect(plusOneButton.closest('li')).not.toHaveClass('d-block');
        })

        it("plus two page button visible when not on last but one page", async () => {

            useSelector.mockImplementation(callback => callback({
                allGames: {
                    games: new Array(60).fill(mockGame),
                    currentStatus: 'idle',
                    error: null
                },
                filters: {
                    filteredGames: null
                }
            }));

            const mockStore60 = configureStore({
                reducer: {
                    allGames: allGamesReducer,
                    gameDetails: gameDetailsReducer
                },
                filters: {
                    filteredGames: null
                },
                preloadedState: {
                    allGames: {
                        games: new Array(60).fill(mockGame),
                        currentStatus: 'idle',
                        error: null
                    }
                }
            });

            const { getByLabelText } = render(
                <Provider store={mockStore60}>
                    <BrowserRouter>
                        <AllGames />
                    </BrowserRouter>);
                </Provider>
            );

            const cards = screen.getAllByTestId("game-card");
            expect(cards).toHaveLength(20);

            const plusOneButton = await getByLabelText("plus-two");
            expect(plusOneButton.closest('li')).not.toHaveClass('d-none');
            expect(plusOneButton.closest('li')).toHaveClass('d-block');
        })


    });
});