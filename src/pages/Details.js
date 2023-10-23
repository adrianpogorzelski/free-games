import React, { useEffect} from "react";
import fetchData from "../utils/fetchData";
import {useDispatch, useSelector} from "react-redux";
import { setGameData} from "../store/gameDetailsSlice";

const Details = () => {
    const dispatch = useDispatch();
    const gameId = useSelector(state => state.gameDetails.id)

    const endpoint = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`

    useEffect(() => {
        if (gameId) {
            fetchData(endpoint).then(data => {
                dispatch(setGameData(data));
            });
        }
    }, [gameId, dispatch, endpoint]);

    const gameData = useSelector(state => state.gameDetails.data)

    if (!gameData || gameId !== gameData.id) {
        return (
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    return (
        <main className="container my-3">
            <h2>{gameData.title}</h2>
        </main>
    )
}

export default Details;