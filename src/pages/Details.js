import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import fetchData from "../utils/fetchData";

const Details = () => {
    const location = useLocation();
    const gameId = location.state?.gameId;

    console.log(location.state)

    console.log(gameId)

    const [gameData, setGameData] = useState(null)

    const endpoint = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`

    useEffect(() => {
        const getGameData = async () => {
            const response = await fetchData(endpoint);
            setGameData(response)
        }
        getGameData();
    }, [])

    if (!gameData) {
        return <div>Error loading game details</div>;
    }

    return (
        <main className="container my-5">
            <h2>{gameData.title}</h2>
        </main>
    )
}

export default Details;