import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Card from "../components/Card";
import {render, fireEvent, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

describe("Card component", () => {
    let getByTestId;
    let getByRole;
    let getByText;

    beforeEach(() => {
        const renderResults = render(
            <MemoryRouter>
                <Card
                    key="0"
                    thumbnail="../img.png"
                    title="Game title"
                    genre="Genre"
                    platform="Platform"
                    short_description="Short description..."
                />
            </MemoryRouter>
        );

        getByTestId = renderResults.getByTestId;
        getByRole = renderResults.getByRole;
        getByText = renderResults.getByText;
    });

    it("has 'card' class", () => {
        const cardElement = getByTestId("game-card").querySelector('.card');
        expect(cardElement).toHaveClass('card');
    });

    it("has game picture", () => {
        const image = getByRole('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('alt', 'Game title');
        expect(image).toHaveAttribute('src', '../img.png');
    })

    it("has title with game name, genre, platform, and short description", () => {
        const title = getByText('Game title');
        expect(title).toBeInTheDocument();

        const genrePlatform = getByText('Genre - Platform');
        expect(genrePlatform).toBeInTheDocument();

        const shortDescription = getByText("Short description...");
        expect(shortDescription).toBeInTheDocument();
    })

    it("links to game details on click", async () => {
        const card = getByTestId('game-card');
        fireEvent.click(card);

        await waitFor(() => expect(getByTestId('game-details')).toBeInTheDocument());
    })
});
