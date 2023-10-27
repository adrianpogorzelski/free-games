import React, { useEffect} from "react";
import fetchData from "../utils/fetchData";
import {useDispatch, useSelector} from "react-redux";
import { setGameData} from "../store/gameDetailsSlice";
import {useParams} from "react-router-dom";

const Details = () => {
    const dispatch = useDispatch();
    const {gameId} = useParams();
    const gameData = useSelector(state => state.gameDetails.data)


    useEffect(() => {
        const endpoint = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`

        // Only fetch data if the game hasn't been checked previously
        if (!gameData || gameData.id !== parseInt(gameId, 10)) {
            fetchData(endpoint).then(data => {
                dispatch(setGameData(data));
            });
        }
    }, [gameId, dispatch, gameData]);

    // Loading spinner
    if (!gameData || parseInt(gameId, 10) !== gameData.id) {
        return (
            <div className="spinner-border text-light" role="status" data-testid='spinner'>
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    return (
        <section data-testid="game-details">
            <div className="row">
                <img alt={gameData.title} className="col-4" src={gameData.thumbnail} />
                <div className="col">
                    <h2>{gameData.title} <span className="small float-end">{gameData.status}</span></h2>
                    <p>{gameData.developer} & {gameData.publisher} / {gameData.release_date}</p>
                    <p className="lead">{gameData.short_description}</p>
                    <p>{gameData.genre} - {gameData.platform}</p>
                    <a href={gameData.game_url}>Game website</a>
                </div>
            </div>
            <p className="mt-3">{gameData.description}</p>
            <div className="row">
                {gameData.screenshots.map((screenshot) => (
                    <img alt={gameData.title} className="col-4" src={screenshot.image}/>
                ))}
            </div>
            <div>
                { gameData.minimum_system_requirements ?
                    (
                        <>
                        <h3>Minimum system requirements</h3>
                        <ul>
                            <li>OS: {gameData.minimum_system_requirements.os}</li>
                            <li>Processor: {gameData.minimum_system_requirements.processor}</li>
                            <li>RAM: {gameData.minimum_system_requirements.memory}</li>
                            <li>Graphics: {gameData.minimum_system_requirements.graphics}</li>
                            <li>Storage: {gameData.minimum_system_requirements.storage}</li>
                        </ul>
                        </>
                    ) : null
                }
            </div>
        </section>
    )
}

export default Details;