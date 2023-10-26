import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import allGamesReducer from '../../store/allGamesSlice';
import AllGames from '../../pages/AllGames';

const renderWithRedux = (
    component,
    { initialState, store = configureStore({ reducer: { allGames: allGamesReducer }, preloadedState: initialState }) } = {}
) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    };
};

describe("??...", () => {
    it("...", () => {})
})
