import React from 'react';
import  { Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AllGames from "./pages/AllGames";
import Details from "./pages/Details";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Header />}>
                <Route index path="/" element={<Home />} />
                <Route path="games" element={<AllGames />} />
                <Route path="games/:id" element={<Details />} />
            </Route>
        </Routes>
    )
}

export default App;