import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar({ user, logOut }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Movies new's
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {user !== null ? (
              <div className="w-100">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/home"}
                    >
                      Home
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to={"/about"}>
                      about
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link className="nav-link" to={"/movies"}>
                      movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/people"}>
                      people
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/tvshow"}>
                      tv show
                    </Link>
                  </li>
                  <button
                    className="logout ms-auto"
                    type="button"
                    onClick={logOut}
                  >
                    log out
                  </button>
                </ul>
              </div>
            ) : (
              <div className=" ms-auto">
                <Link id="login" to={"/login"}>
                  login
                </Link>
                <Link id="register" to={"/register"}>
                  register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
