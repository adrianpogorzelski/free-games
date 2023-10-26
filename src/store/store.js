import {configureStore} from "@reduxjs/toolkit";
import allGamesReducer from "./allGamesSlice";
import gameDetailsReducer from "./gameDetailsSlice";

export const store = configureStore({
    reducer: {
        allGames: allGamesReducer,
        gameDetails: gameDetailsReducer
    }
})

export default store;