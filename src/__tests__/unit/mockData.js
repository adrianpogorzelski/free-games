import {configureStore} from "@reduxjs/toolkit";
import allGamesReducer from "../../store/allGamesSlice";
import gameDetailsReducer from "../../store/gameDetailsSlice";

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

describe("Mock", () => {
    it("is present", () => {})
})

export {mockData, mockStore }