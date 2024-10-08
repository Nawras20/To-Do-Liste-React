import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header>
            <div className="container-fluid">
                <nav>
                    <ul className="nav mb-2 justify-content-center mb-md-0">
                        <li>
                            <Link to="/todo-list" className="nav-link px-2">To-Do Liste</Link>
                        </li>
                        <li>
                            <Link to="/about" className="nav-link px-2">Über die App</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;