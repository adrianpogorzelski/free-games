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
    initialState: {
        games: [],
        status: 'idle', // 'loading', 'succeeded', 'failed'
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games = action.payload;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export default allGamesSlice.reducer;