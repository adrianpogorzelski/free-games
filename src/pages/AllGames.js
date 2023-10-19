import React, { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";
import Card from "../components/Card";

function AllGames() {

  const ALL_GAMES = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data
  useEffect(() => {
    const getGames = async () => {
      const fetchedGames = await fetchData(ALL_GAMES);
      setGames(fetchedGames);
    };
    getGames();
  }, []);

  // Pagination
  let cardsPerPage = 20;
  let allPages = Math.ceil(games.length / cardsPerPage);

  const paginate = () => {
    let start = (currentPage - 1) * cardsPerPage;
    let end = start + cardsPerPage;
    return games.slice(start, end);
  }

  return (
    <main className="container my-5">
        <section className="row row-cols-3 g-3">
          {
            paginate().map((game) => (
              <Card key={game.id}
                    id={game.id}
                    thumbnail={game.thumbnail}
                    alt={game.title}
                    title={game.title}
                    genre={game.genre}
                    platform={game.platform}
                    short_description={game.short_description}
              />
            ))
          }
        </section>

      <nav aria-label="Pagination" className="my-5">
        <ul className="pagination justify-content-center">

          <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
            <a className="page-link" aria-label="Previous" href="#" onClick={() => setCurrentPage(currentPage - 1)}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li data-testid="page-button" className={`page-item ${currentPage <= 2 ? 'd-none' : ''}`}><a className="page-link" href="#" onClick={() => setCurrentPage(currentPage -2)}>{currentPage - 2}</a></li>
          <li data-testid="page-button" className={`page-item ${currentPage <= 1 ? 'd-none' : ''}`}><a className="page-link" href="#" onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</a></li>
          <li data-testid="current-page-button" className="page-item"><a className="page-link active" href="#" >{currentPage}</a></li>
          <li data-testid="page-button" className={`page-item ${currentPage >= allPages ? 'd-none' : 'd-block'}`}><a className="page-link" aria-label="plus-one" href="#" onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</a></li>
          <li data-testid="page-button" className={`page-item ${currentPage >= allPages - 1 ? 'd-none' : 'd-block'}`}><a className="page-link" aria-label="plus-two" href="#" onClick={() => setCurrentPage(currentPage + 2)}>{currentPage + 2}</a></li>

          <li className={`page-item ${currentPage === allPages ? 'disabled' : ''}`}>
            <a className="page-link" aria-label="Next" href="#" onClick={() => setCurrentPage(currentPage + 1)}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </main>
  );
}

export default AllGames;
