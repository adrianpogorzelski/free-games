import React from 'react';
import {fireEvent, getByRole, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../../components/Header';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {mockStore} from "./mockData";
import {setFilteredResults} from "../../store/filtersSlice";

describe('Header component', () => {
  it('renders an <h1> tag with the text "Free games"', () => {
    const { getByText } = render(
        <Provider store={mockStore}>
            <BrowserRouter>
                <Header />
            </BrowserRouter>);
        </Provider>
    )

    const h1Element = getByText(/Free games/i);
    
    expect(h1Element).toBeInTheDocument();
  });

  describe('Navigation', () => {
    it('renders a nav element', () => {
      const { getByRole } = render(
          <Provider store={mockStore}>
              <BrowserRouter>
                  <Header />
              </BrowserRouter>);
          </Provider>
      );

      const navElement = getByRole('navigation')

      expect(navElement).toBeInTheDocument();
    });
    it('renders "All games" nav item', () => {
      const { getByText } = render(
          <Provider store={mockStore}>
              <BrowserRouter>
                  <Header />
              </BrowserRouter>);
          </Provider>);

      const allGamesButton = getByText(/All games/i)

      expect(allGamesButton).toBeInTheDocument();
    })
      it("clicking All Games resets the filters", () => {
          const filteredGames = ["filtered game 1", "filtered game 2"];
          mockStore.dispatch(setFilteredResults(filteredGames));

          // Verify that filters are not null
          expect(mockStore.getState().filteredGames).not.toBeNull();

          render(
              <Provider store={mockStore}>
                  <BrowserRouter>
                      <Header/>
                  </BrowserRouter>
              </Provider>
          );

          // Click the Reset button
          const allGamesButton = screen.getByText("All games");
          fireEvent.click(allGamesButton);

          // Verify that filters are now null after clicking Reset
          expect(mockStore.getState().filters.filteredGames).toBeNull();
      })
  })
});
