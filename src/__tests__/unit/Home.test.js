import React from "react";
import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Home from "../../pages/Home";

describe("Home page", () => {
    it("renders", () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )

        const title = getByTestId('home-title');
        expect(title).toBeInTheDocument();
        expect(title.textContent).toBe('Free games');
    })
});
