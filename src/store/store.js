import {configureStore} from "@reduxjs/toolkit";
import allGamesReducer from "./allGamesSlice";
import gameDetailsReducer from "./gameDetailsSlice";
import filtersReducer from "./filtersSlice";

export const store = configureStore({
    reducer: {
        allGames: allGamesReducer,
        gameDetails: gameDetailsReducer,
        filters: filtersReducer
    }
})

export default store;