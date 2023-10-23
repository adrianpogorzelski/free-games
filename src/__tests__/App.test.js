import '@testing-library/jest-dom/extend-expect';
import App from "../App";
import {BrowserRouter} from "react-router-dom";
import {render} from "@testing-library/react";

describe("App", () => {
    it("renders Header", () => {

        const { getByRole } = render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        )

        expect(getByRole("navigation")).toBeInTheDocument();
    })
})