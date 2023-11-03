import React from "react";
import Filters from "../../components/Filters";
import {Provider} from "react-redux";
import {mockStore} from "./mockData";
import {BrowserRouter} from "react-router-dom";
import {getByTestId, render, screen, fireEvent, waitFor} from "@testing-library/react";
import fetchData from "../../utils/fetchData";
import {setFilteredResults} from "../../store/filtersSlice";
jest.mock('../../utils/fetchData', () => ({
    __esModule: true,
    default: jest.fn(() => Promise.resolve('mocked data')),
}));

describe("Filters", () => {
    describe("renders", () => {
        it("itself", () => {
            const {getByTestId} = render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <Filters/>
                    </BrowserRouter>
                </Provider>
            )
            const filtersElement = getByTestId('filters')
            expect(filtersElement).toBeInTheDocument()
        })
        it("platform selector", () => {
            const {getByTestId} = render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <Filters/>
                    </BrowserRouter>
                </Provider>
            )
            const filtersElement = getByTestId('platform')
            expect(filtersElement).toBeInTheDocument()

        })
        it("genre selector", () => {
            const {getByTestId} = render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <Filters/>
                    </BrowserRouter>
                </Provider>
            )
            const filtersElement = getByTestId('genre')
            expect(filtersElement).toBeInTheDocument()

        })
        it("tag selector", () => {

        })
        it("sorting selector", () => {

        })
    })

    describe("Filters", () => {
        it("by platform", async () => {
            const mockFilteredGames = ["filtered game 1", "filtered game 2"];
            fetchData.mockResolvedValue(mockFilteredGames);

            render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <Filters/>
                    </BrowserRouter>
                </Provider>
            );

            const filterButton = screen.getByTestId("filter-button");
            fireEvent.click(filterButton);

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledWith('https://free-to-play-games-database.p.rapidapi.com/api/games', {platform: "all"});
            });
        })

        it("resets filters when the Reset button is clicked", () => {
            // Set some filters
            const filteredGames = ["filtered game 1", "filtered game 2"];
            mockStore.dispatch(setFilteredResults(filteredGames));

            // Verify that filters are not null
            expect(mockStore.getState().filteredGames).not.toBeNull();

            render(
                <Provider store={mockStore}>
                    <BrowserRouter>
                        <Filters/>
                    </BrowserRouter>
                </Provider>
            );

            // Click the Reset button
            const resetButton = screen.getByText("Reset");
            fireEvent.click(resetButton);

            // Verify that filters are now null after clicking Reset
            expect(mockStore.getState().filters.filteredGames).toBeNull();
        })

        it("by genre", () => {

        })
        it("by tags", () => {
            // Single tag
            // Multiple tags
        })

    })
})