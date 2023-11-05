import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./List.css";

function List() {
  const allPokemons = useOutletContext();
  const [sortedPokemons, setSortedPokemons] = useState(allPokemons);
  const [sortType, setSortType] = useState("ascending");
  const [sortAttr, setSortAttr] = useState("height");

  useEffect(() => {
    const sortPokemons = () => {
      let sorted = [];
      if (sortType === "ascending") {
        sorted = allPokemons
          .slice()
          .sort((a, b) => parseInt(a[sortAttr]) - parseInt(b[sortAttr]));
      } else {
        sorted = allPokemons
          .slice()
          .sort((a, b) => parseInt(b[sortAttr]) - parseInt(a[sortAttr]));
      }
      setSortedPokemons([...sorted]);
    };
    sortPokemons();
  }, [sortType, sortAttr]);

  return (
    <>
      <div className="outer-container">
        <div className="sort-container">
          <div className="radio-container">
            <input
              type="radio"
              id="height"
              value="height"
              name="sort_attr"
              checked={sortAttr === "height" ? true : false}
              onChange={() => setSortAttr("height")}
            />
            <label htmlFor="height">Height</label>
          </div>
          <div className="radio-container">
            <input
              type="radio"
              id="weight"
              value="weight"
              name="sort_attr"
              checked={sortAttr === "weight" ? true : false}
              onChange={() => setSortAttr("weight")}
            />
            <label htmlFor="weight">Weight</label>
          </div>
        </div>
        <div className="sort-container">
          <div className="radio-container">
            <input
              type="radio"
              id="asc"
              value="ascending"
              name="sort_type"
              checked={sortType === "ascending" ? true : false}
              onChange={() => setSortType("ascending")}
            />
            <label htmlFor="asc">Ascending</label>
          </div>
          <div className="radio-container">
            <input
              type="radio"
              id="desc"
              value="descending"
              name="sort_type"
              checked={sortType === "descending" ? true : false}
              onChange={() => setSortType("descending")}
            />
            <label htmlFor="desc">Descending</label>
          </div>
        </div>
      </div>
      <div className="main-container-list">
        <ul className="list-container">
          {sortedPokemons.map((val) => {
            return (
              <li key={val.name} className="list-item">
                <div>
                  <img src={val.front}></img>
                  <h5>
                    {val.name.charAt(0).toUpperCase() + val.name.slice(1)}
                  </h5>
                  <h5>Height: {val.height}</h5>
                  <h5>Weight: {val.weight}</h5>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default List;
