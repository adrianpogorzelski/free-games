import { Outlet, Link} from "react-router-dom";

function Header() {
    return (
        <>
        <header className="bg-secondary">
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="/">Free games</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/all-games">All games</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        <Outlet />
        </>
    )
}

export default Header;