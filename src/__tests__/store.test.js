import React from "react";
import '@testing-library/jest-dom/extend-expect';
import {store} from "../store/store";

describe("Redux store", () => {
    it('should initialize with the correct default state', () => {
        const expectedState = {
            allGames: [],  // Assuming this is your allGamesReducer's initial state
            gameDetails: { id: null, data: null } // Assuming this is your gameDetailsReducer's initial state
        };
        const actualState = store.getState();
        expect(actualState).toEqual(expectedState);
    });
})