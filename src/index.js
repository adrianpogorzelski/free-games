import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";
import Home from "./pages/Home";
import AllGames from "./pages/AllGames";
import Details from "./pages/Details";
import Tags from "./pages/Tags";
import GamesByTag from "./pages/GamesByTag";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<App />}>
                      <Route index path="/" element={<Home />} />
                      <Route path="games" element={<AllGames />} />
                      <Route path="games/:gameId" element={<Details />} />
                      <Route path="categories" element={<Tags />} />
                      <Route path="categories/:tag" element={<GamesByTag />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);