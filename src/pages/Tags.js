import React from "react";
import TAGS_AVAILABLE from "../utils/tags_available";
import { Link } from "react-router-dom";

const Tags = () => {
    return (
        <section className='row'>
            {TAGS_AVAILABLE.map((tag) => (
                <Link to={{ pathname: `/categories/${tag}` }} aria-current="page" key={tag} className="col-6 col-md-4 col-lg-3" tag={tag}>
                    {tag}
                </Link>
            ))}
        </section>
    );
}

export default Tags;
