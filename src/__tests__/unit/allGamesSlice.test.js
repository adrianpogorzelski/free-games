import React from "react";
import {mockStore} from "./mockData";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import AllGames from "../../pages/AllGames";
import fetchData from "../../utils/fetchData";
import allGamesReducer, {fetchGames} from "../../store/allGamesSlice";

jest.mock('../../utils/fetchData')

describe("All Games slice", () => {
    describe("states", () => {
        describe('allGamesSlice', () => {
            it('should handle initial state', () => {
                expect(allGamesReducer(undefined, {})).toEqual({
                    games: [],
                    status: 'idle',
                    error: null
                });
            });

            it('should handle fetchGames.pending', () => {
                expect(allGamesReducer(undefined, { type: fetchGames.pending.type })).toEqual({
                    games: [],
                    status: 'loading',
                    error: null
                });
            });

            it('should handle fetchGames.fulfilled', () => {
                const mockGames = [
                    { id: 1, name: 'Game 1' },
                    { id: 2, name: 'Game 2' }
                ];
                expect(allGamesReducer(undefined, {
                    type: fetchGames.fulfilled.type,
                    payload: mockGames
                })).toEqual({
                    games: mockGames,
                    status: 'succeeded',
                    error: null
                });
            });

            it('should handle fetchGames.rejected', () => {
                const mockError = "An error occurred";
                expect(allGamesReducer(undefined, {
                    type: fetchGames.rejected.type,
                    error: { message: mockError }
                })).toEqual({
                    games: [],
                    status: 'failed',
                    error: mockError
                });
            });
        });

        describe('fetchGames async thunk', () => {
            it('should dispatch fulfilled when fetch is successful', async () => {
                const mockGames = [
                    { id: 1, name: 'Game 1' },
                    { id: 2, name: 'Game 2' }
                ];

                fetchData.mockResolvedValue(mockGames);

                const dispatch = jest.fn();
                const getState = () => ({ allGames: { status: 'idle', games: [], error: null } });

                await fetchGames()(dispatch, getState, {});

                expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'allGames/fetchGames/pending' }));

                expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({
                    type: 'allGames/fetchGames/fulfilled',
                    payload: mockGames
                }));
            });

            it('should dispatch rejected when fetch fails', async () => {
                const mockError = new Error('Failed to fetch games');
                fetchData.mockRejectedValue(mockError);

                const dispatch = jest.fn();
                const getState = () => ({ allGames: { status: 'idle', games: [], error: null } });

                await fetchGames()(dispatch, getState, {});

                expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'allGames/fetchGames/pending' }));
                expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
                    type: 'allGames/fetchGames/rejected',
                    error: expect.objectContaining({
                        message: 'Failed to fetch games',
                        name: 'Error'
                    })
                }));

            });
        });
    })
})