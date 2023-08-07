import React, { useState, useEffect } from "react";
import axios from "axios";

function AllGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', {
          headers: {
            'X-RapidAPI-Key': 'fee917f5e9msh48b5dfa1ace4c25p1f2c42jsnedbe7e5cca48',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
          }
        });

        setGames(response.data);
      } catch (error) {
        console.error('Something went wrong!', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <main className="container my-5">
        <section className="row row-cols-3 g-3">
        {games.map((game) => (
          <div className="col" key={game.id}>
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
