import React from "react";
import { Link } from "react-router-dom";

const Card = ({id, thumbnail, title, genre, platform, short_description}) => {

    return (
        <div className="col" data-testid="game-card">
            <Link to={{
                    pathname: `/games/${id}`
                }}
                className="text-decoration-none">
                <div className="card h-100">
                    <img className="card-img-top" src={thumbnail} alt={title} />
                    <div className="card-body bg-secondary-subtle">
                        <h5 className="card-title text-truncate">{title}</h5>
                        <p>{genre} - {platform}</p>
                        <p>{short_description}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Card;