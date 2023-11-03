import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        filteredGames: null
    },
    reducers: {
        setFilteredResults: (state, action) => {
            state.filteredGames = action.payload;
        },
        resetFilters: (state) => {
            state.filteredGames = null;
        }
    },
});

export const { setFilteredResults, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
