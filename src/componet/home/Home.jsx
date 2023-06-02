import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./home.css";
import avatar from "../../images/avatar.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  let [moviesDisplay, setMoviesDisplay] = useState([]);
  let [tvShowsDisplay, setTvShowsDisplay] = useState([]);
  let [PeopleDisplay, setPeopleDisplay] = useState([]);

  async function getdata(type, callback) {
    let response = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=3772072d6fd76a53c64b2c06092d788d`
    );
    callback(response.data.results.slice(0, 10));
  }
  useEffect(() => {
    getdata("movie", setMoviesDisplay);
    getdata("tv", setTvShowsDisplay);
    getdata("person", setPeopleDisplay);
  }, []);
  return (
    <>
      <div className="home">
        <div className="trending row gx-3">
          <div className="col-md-4 col-sm-12 trending-title">
            <div className="top-line"></div>
            <h2>
              tredning <br /> movies <br /> to watch now
            </h2>
            <p>Most watched movies by days</p>
            <div className="bottom-line"></div>
          </div>

          {moviesDisplay.map((movie, i) => (
            <div key={i} className="col-md-2 col-sm-12 trending-display">
              <Link className="link" to={`/Moviedetails/${movie.id}/movie`}>
                <div className="item w-100">
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt=""
                  />
                  <h3>{movie.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="trending row gx-3">
          <div className="col-md-4 col-sm-12 trending-title">
            <div className="top-line"></div>
            <h2>
              tredning <br /> tv show <br /> to watch now
            </h2>
            <p>Most watched tv show by days</p>
            <div className="bottom-line"></div>
          </div>

          {tvShowsDisplay.map((tvShow, i) => (
            <div key={i} className="col-md-2 col-sm-12 trending-display">
              <Link className="link" to={`/tvdetails/${tvShow.id}/tv`}>
                <div className="item w-100">
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + tvShow.poster_path}
                    alt=""
                  />
                  <h3>{tvShow.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="trending row gx-3">
          <div className="col-md-4 col-sm-12 trending-title">
            <div className="top-line"></div>
            <h2>
              tredning <br /> people <br /> to watch now
            </h2>
            <p>Most watched people by days</p>
            <div className="bottom-line"></div>
          </div>

          {PeopleDisplay.map((people, i) => (
            <div key={i} className="col-md-2 col-sm-12 trending-display">
              \
              <Link className="link" to={`/peopledetails/${people.id}/people`}>
                <div className="item w-100">
                  {people.profile_path != null ? (
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500" + people.profile_path
                      }
                      alt={people.name}
                    />
                  ) : (
                    <img
                      className="avatar-img"
                      src={avatar}
                      alt={people.name}
                    />
                  )}
                  <h3>{people.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
