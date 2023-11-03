import React from "react";
import { render, screen } from "@testing-library/react";
import Details from "../../pages/Details";
import { Provider, useSelector } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import { mockGame, mockStore, mockDetails } from "./mockData";

// Mock the fetchData module
jest.mock('../../utils/fetchData');

// Mocking react-redux's useSelector and useDispatch
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

// Mock react-router-dom's useParams
const mockUseParams = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useParams: () => mockUseParams()
    };
});


describe('Details page', () => {

    beforeEach(() => {
        // Reset all mocks
        jest.resetAllMocks();
    });

    it('renders a spinner if store is empty', () => {
        useSelector.mockReturnValueOnce(null);
        mockUseParams.mockReturnValue({ gameId: '123' });

        fetchData.mockResolvedValue(null);

        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={['/details/1']}>
                    <Details/>
                </MemoryRouter>
            </Provider>
        );

        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
    });

    it('renders game details if game data is present', async () => {
        useSelector.mockReturnValueOnce(mockDetails.data);
        mockUseParams.mockReturnValue({ gameId: mockDetails.data.id.toString() });

        fetchData.mockResolvedValue(mockGame);

        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={['/details/1']}>
                    <Details/>
                </MemoryRouter>
            </Provider>
        );

        const gameDetails = await screen.findByTestId('game-details');
        const gameData = useSelector(state => state.gameDetails.data);
        expect(gameData).not.toBeNull();
        expect(gameDetails).toBeInTheDocument();
    });

});
