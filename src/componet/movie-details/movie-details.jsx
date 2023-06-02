import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./movie-details.css";
import { useParams } from "react-router-dom";
export default function MovieDetails() {
  let [movieDetail, setMovieDetail] = useState(null);
  let { id, type } = useParams();
  useEffect(() => {
    getdata(id, type);
  }, []);
  async function getdata(movieId, type) {
    if (type === "movie") {
      
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=3772072d6fd76a53c64b2c06092d788d&language=en-US`
      );
      setMovieDetail(data);
    }
  }
  //   console.log(movieDetail);
  return (
    <>
      {movieDetail != null ? (
        <>
          <div className="movie-details row gx-5">
            <div className="col-md-4 col-sm-12">
              <img
                className="w-100"
                src={
                  "https://image.tmdb.org/t/p/w500" + movieDetail.poster_path
                }
                alt=""
              />
            </div>
            <div className="col-md-8 col-sm-12 movie-details-description">
              <h2>{movieDetail.title}.</h2>
              <h4>{movieDetail.tagline}</h4>
              {movieDetail.genres.map((genres, i) => (
                <span key={i} className="genres">
                  {genres.name}
                </span>
              ))}
              <div className="statics">
                <p>vote : {Math.round(movieDetail.vote_average * 10) / 10}</p>
                <p>vote count : {movieDetail.vote_count}</p>
                <p>popularity : {movieDetail.popularity}</p>
                <p>release date : {movieDetail.release_date}</p>
              </div>
              <p className="movie-overview">{movieDetail.overview}</p>
            </div>
          </div>
        </>
      ) : (
        "  "
      )}
    </>
  );
}
