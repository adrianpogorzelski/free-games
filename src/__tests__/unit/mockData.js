import {configureStore} from "@reduxjs/toolkit";
import allGamesReducer from "../../store/allGamesSlice";
import gameDetailsReducer from "../../store/gameDetailsSlice";
import filtersReducer from "../../store/filtersSlice";

const mockData = [
    { id: 1, title: 'Game A', thumbnail: '', genre: '' },
    { id: 2, title: 'Game B', thumbnail: '', genre: '' },
];

const mockGame = {
    id: 123,
    title: 'Title',
    thumbnail: 'Pic',
    genre: 'Game',
    status: 'live',
    platform: 'PC',
    description: 'Description',
    short_description: 'Short...',
    screenshots: [
        {
            id: 5,
            url: 'url'
        },
        {
            id: 5,
            url: 'url'
        },
    ]
};

const mockDetails = {
    id: 1,
    data: mockGame
}

const mockStore = configureStore({
    reducer: {
        allGames: allGamesReducer,
        gameDetails: gameDetailsReducer,
        filters: filtersReducer
    },
    filters: {
        filteredGames: null
    },
    preloadedState: {
        allGames: mockData,
        gameDetails: mockDetails
    }
});

describe("Mock", () => {
    it("is present", () => {})
})

export {mockData, mockGame, mockStore, mockDetails }