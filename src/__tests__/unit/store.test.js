import React from "react";
import '@testing-library/jest-dom/extend-expect';
import {store} from "../../store/store";

describe("Redux store", () => {
    it('should initialize with the correct default state', () => {
        const expectedState = {
            allGames: {
                games: [],
                status: 'idle',
                error: null
            },
            filters: {
                filteredGames: null
            },
            gameDetails: {
                id: null,
                data: null
            }
        };
        const actualState = store.getState();
        expect(actualState).toEqual(expectedState);
    });
})