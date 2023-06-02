import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./tv-details.css";
import { useParams } from "react-router-dom";
export default function TvDetails() {
  let [tvDetail, setTvDetail] = useState(null);
  let { id, type } = useParams();
  useEffect(() => {
    getdata(id, type);
  }, []);
  async function getdata(tvId, type) {
    if (type === "tv") {
      
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvId}?api_key=3772072d6fd76a53c64b2c06092d788d&language=en-US`
      );
      setTvDetail(data);
    }
  }
    console.log(tvDetail);
  return (
    <>
      {tvDetail != null ? (
        <>
          <div className="movie-details row gx-5">
            <div className="col-md-4 col-sm-12">
              <img
                className="w-100"
                src={
                  "https://image.tmdb.org/t/p/w500" + tvDetail.poster_path
                }
                alt=""
              />
            </div>
            <div className="col-md-8 col-sm-12 movie-details-description">
              <h2>{tvDetail.name}.</h2>
              <h4>{tvDetail.tagline}</h4>
              {tvDetail.genres.map((genres, i) => (
                <span key={i} className="genres">
                  {genres.name}
                </span>
              ))}
              <div className="statics">
                <p>vote : {Math.round(tvDetail.vote_average * 10) / 10}</p>
                <p>vote count : {tvDetail.vote_count}</p>
                <p>popularity : {tvDetail.popularity}</p>
                <p>release date : {tvDetail.first_air_date
}</p>
              </div>
              <p className="movie-overview">{tvDetail.overview}</p>
            </div>
          </div>
        </>
      ) : (
        "  "
      )}
    </>
  );
}
