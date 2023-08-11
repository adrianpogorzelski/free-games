import React, { useState, useEffect } from "react";
import fetchData from "./fetchData";

function AllGames() {

  const ALL_GAMES = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const fetchedGames = await fetchData(ALL_GAMES);
      setGames(fetchedGames);
    };

    getGames();
  }, []);

  return (
    <main className="container my-5">
        <section className="row row-cols-3 g-3">
        {games.map((game) => (
          <div className="col" data-testid="game-card" key={game.id}>
            <div className="card h-100">
              <img className="card-img-top" src={game.thumbnail} alt={game.title} />
              <div className="card-body">
                <h5 className="card-title text-truncate">{game.title}</h5>
                <p>{game.genre}</p>
              </div>
            </div>
          </div>
        ))}
        </section>
    </main>
  );
}

export default AllGames;
