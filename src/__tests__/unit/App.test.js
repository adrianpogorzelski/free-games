import '@testing-library/jest-dom/extend-expect';
import App from "../../App";
import {BrowserRouter} from "react-router-dom";
import {render} from "@testing-library/react";
import {mockStore} from "./mockData";
import {Provider} from "react-redux";

describe("App", () => {
    it("renders Header", () => {

        const { getByRole } = render(
            <Provider store={mockStore}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        )

        expect(getByRole("navigation")).toBeInTheDocument();
    })
})