import { createSlice } from "@reduxjs/toolkit";

const gameDetailsSlice = createSlice({
    name: 'gameDetails',
    initialState: {
        id: null,
        data: null
    },
    reducers: {
        setCurrentGameId: (state, action) => {
            state.id = action.payload;
        },
        setGameData: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const { setCurrentGameId, setGameData } = gameDetailsSlice.actions;
export default gameDetailsSlice.reducer;