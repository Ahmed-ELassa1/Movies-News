import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../home/home.css";
export default function People() {
  let [peopleDisplay, setPeolpleDisplay] = useState([]);
  let pages = new Array(10).fill("x").map((el, i) => (el = i + 1));
  let [nextPageNumber, setNextPageNumber] = useState();
  let [prePageNumber, setPrePageNumber] = useState();

  async function getdata(pageNumber = 1) {
    let response = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=3772072d6fd76a53c64b2c06092d788d&language=en-US&page=${pageNumber}`
    );
    setNextPageNumber(Number(pageNumber) + 1);
    setPrePageNumber(pageNumber - 1);
    setPeolpleDisplay(response.data.results);
  }
  function nextPage() {
    getdata(nextPageNumber);
  }
  function prePage() {
    getdata(prePageNumber);
  }
  function setPageNumber(e) {
    let currentPage = e.target.innerText;
    getdata(currentPage);
  }
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <div className="trending row gx-3">
        {peopleDisplay.map((person, i) => (
          <div key={i} className="col-md-2 col-sm-12 trending-display">
            <Link className="link" to={`/peopledetails/${person.id}/people`}>
              <div className="item w-100">
                <img
                  src={"https://image.tmdb.org/t/p/w500" + person.profile_path}
                  alt=""
                />
                <h3>{person.name}</h3>
              </div>
            </Link>
          </div>
        ))}
        <nav aria-label="..." className="page-number">
          <ul className="pagination">
            {prePageNumber !== 0 ? (
              <li className="page-item">
                <button className="page-link" onClick={prePage}>
                  Previous
                </button>
              </li>
            ) : (
              ""
            )}

            {pages.map((el, i) => (
              <li
                onClick={setPageNumber}
                id="pages"
                key={i}
                className="page-item"
              >
                <Link className="page-link" href="#">
                  {el}
                </Link>
              </li>
            ))}
              <li className="page-item">
                <button onClick={nextPage} className="page-link">
                  Next
                </button>
              </li>
           
          </ul>
        </nav>
      </div>
    </>
  );
}
