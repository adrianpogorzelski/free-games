import React from 'react';
import  {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AllGames from "./pages/AllGames";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index path="/" element={<Home />} />
                    <Route path="all-games" element={<AllGames />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;