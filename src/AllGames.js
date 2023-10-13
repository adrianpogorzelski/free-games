import React, { useState, useEffect } from "react";
import fetchData from "./fetchData";

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

  console.log(allPages)

  return (
    <main className="container my-5">
        <section className="row row-cols-3 g-3">
          {
            paginate().map((game) => (
              <div className="col" data-testid="game-card" key={game.id}>
                <div className="card h-100">
                  <img className="card-img-top" src={game.thumbnail} alt={game.title} />
                  <div className="card-body">
                    <h5 className="card-title text-truncate">{game.title}</h5>
                    <p>{game.genre} - {game.platform}</p>
                    <p>{game.short_description}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </section>

      <nav aria-label="Page navigation example" className="my-5">
        <ul className="pagination justify-content-center">

          <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
            <a className="page-link" aria-label="Previous" onClick={() => setCurrentPage(currentPage - 1)}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li className={`page-item ${currentPage <= 2 ? 'd-none' : ''}`}><a className="page-link" onClick={() => setCurrentPage(currentPage -2)}>{currentPage - 2}</a></li>
          <li className={`page-item ${currentPage <= 1 ? 'd-none' : ''}`}><a className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</a></li>
          <li className="page-item"><a className="page-link active">{currentPage}</a></li>
          <li className={`page-item ${currentPage >= allPages ? 'd-none' : ''}`}><a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</a></li>
          <li className={`page-item ${currentPage >= allPages - 1 ? 'd-none' : ''}`}><a className="page-link" onClick={() => setCurrentPage(currentPage + 2)}>{currentPage + 2}</a></li>

          <li className={`page-item ${currentPage == allPages ? 'disabled' : ''}`}>
            <a className="page-link" aria-label="Next" onClick={() => setCurrentPage(currentPage + 1)}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </main>
  );
}

export default AllGames;
