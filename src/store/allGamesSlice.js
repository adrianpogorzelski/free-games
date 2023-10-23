import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import fetchData from "../utils/fetchData";

const ALL_GAMES = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

export const fetchGames = createAsyncThunk(
    'allGames/fetchGames',
    async () => {
        return await fetchData(ALL_GAMES);
    }
);

const allGamesSlice = createSlice({
    name: 'allGames',
    initialState: [],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchGames.fulfilled, (state, action) => {
            return [...state, ...action.payload]
        })
    }
})

export default allGamesSlice.reducer;