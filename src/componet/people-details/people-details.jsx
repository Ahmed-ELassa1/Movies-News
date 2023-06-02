import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../movie-details/movie-details.css";
import { useParams } from "react-router-dom";
export default function PeopleDetails() {
  let [peopleDetail, setPeopleDetail] = useState(null);
  let { id, type } = useParams();
  useEffect(() => {
    getdata(id, type);
  }, []);
  async function getdata(peopleId, type) {
    if (type === "people") {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${peopleId}?api_key=3772072d6fd76a53c64b2c06092d788d&language=en-US`
      );
      setPeopleDetail(data);
    }
  }
  return (
    <>
      {peopleDetail != null ? (
        <>
          <div className="movie-details row gx-5">
            <div className="col-md-4 col-sm-12">
              <img
                className="w-100"
                src={
                  "https://image.tmdb.org/t/p/w500" + peopleDetail.profile_path
                }
                alt=""
              />
            </div>
            <div className="col-md-8 col-sm-12 movie-details-description">
              <h2>{peopleDetail.name}.</h2>
              <h4>{peopleDetail.known_for_department}</h4>
              <p className="text-white">{peopleDetail.known_for}</p>
          
              <div className="statics">
                <p>original name : {peopleDetail.name}</p>
                <p>popularity : {peopleDetail.popularity}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        "  "
      )}
    </>
  );
}
