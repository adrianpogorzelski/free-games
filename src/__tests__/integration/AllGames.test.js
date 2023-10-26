import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import AllGames from "../../pages/AllGames";
import { fetchGames} from "../../store/allGamesSlice";
import {BrowserRouter} from "react-router-dom";

const mockStore = configureMockStore();
jest.mock('../../store/AllGamesSlice'); // Mock the action creator

describe('AllGames component', () => {
    it('dispatches the fetchGames action if games are empty', () => {
        const store = mockStore({
            allGames: {
                games: [],
                currentStatus: 'idle',
                error: null
            }
        });

        fetchGames.mockReturnValue({ type: 'fetchGames' }); // Mock return of the action

        render(
            <Provider store={store}>
                <AllGames />
            </Provider>
        );

        expect(store.getActions()).toContainEqual({ type: 'fetchGames' });
    });

    it('does not dispatch the fetchGames action if games are already fetched', () => {
        const store = mockStore({
            allGames: {
                games: [{ id: 1, title: 'Game A' }],
                currentStatus: 'succeeded',
                error: null
            }
        });

        fetchGames.mockReturnValue({ type: 'fetchGames' }); // Mock return of the action

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AllGames />
                </BrowserRouter>
            </Provider>
        );

        expect(store.getActions()).not.toContainEqual({ type: 'fetchGames' });
    });
});
