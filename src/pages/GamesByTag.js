import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../utils/fetchData";
import Card from "../components/Card";

const GamesByTag = () => {
    const { tag } = useParams();
    const [games, setGames] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const endpoint = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${tag}`;
                const data = await fetchData(endpoint);
                setGames(data);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, [tag]);

    // Pagination
    let cardsPerPage = 20;
    let allPages = games ? Math.ceil(games.length / cardsPerPage) : 0;

    const paginate = () => {
        let start = (currentPage - 1) * cardsPerPage;
        let end = start + cardsPerPage;
        return (games || []).slice(start, end);
    };


    return (
        <>
        <section id="top" className="row row-cols-3 g-3">
            <div className="card">
                <img src="../img.png" alt="Advertisement" />
            </div>
            {paginate().map((game) => (
                <Card key={game.id} {...game} />
            ))}
        </section>
        <nav aria-label="Pagination" className="my-5">
        <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                <a
                    className="page-link"
                    aria-label="Previous"
                    href="#top"
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li
                data-testid="page-button"
                className={`page-item ${currentPage <= 2 ? 'd-none' : ''}`}
            >
                <a
                    className="page-link"
                    href="#top"
                    onClick={() => setCurrentPage(currentPage - 2)}
                >
                    {currentPage - 2}
                </a>
            </li>
            <li
                data-testid="page-button"
                className={`page-item ${currentPage <= 1 ? 'd-none' : ''}`}
            >
                <a
                    className="page-link"
                    href="#top"
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    {currentPage - 1}
                </a>
            </li>
            <li data-testid="current-page-button" className="page-item">
                <a className="page-link active" href="#top">
                    {currentPage}
                </a>
            </li>
            <li
                data-testid="page-button"
                className={`page-item ${currentPage >= allPages ? 'd-none' : 'd-block'}`}
            >
                <a
                    className="page-link"
                    aria-label="plus-one"
                    href="#top"
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    {currentPage + 1}
                </a>
            </li>
            <li
                data-testid="page-button"
                className={`page-item ${currentPage >= allPages - 1 ? 'd-none' : 'd-block'}`}
            >
                <a
                    className="page-link"
                    aria-label="plus-two"
                    href="#top"
                    onClick={() => setCurrentPage(currentPage + 2)}
                >
                    {currentPage + 2}
                </a>
            </li>
            <li className={`page-item ${currentPage === allPages ? 'disabled' : ''} `}>
                <a
                    className="page-link"
                    aria-label="Next"
                    href="#top"
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
        </>
);
};

export default GamesByTag;
