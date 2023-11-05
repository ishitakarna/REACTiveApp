import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./Gallery.css";
import Modal from "../Modal/Modal";

function Gallery() {
  const allPokemons = useOutletContext();
  const [showModal, setShowModal] = useState(false);
  const [pokeClicked, setPokeClicked] = useState({});
  const [typeValues, setTypeValues] = useState([]);
  const [filterValues, setFilterValues] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState(allPokemons);

  useEffect(() => {
    let temp = new Set();
    allPokemons.map((item) => {
      item.types.forEach((type) => temp.add(type));
    });
    setTypeValues(Array.from(temp));
  }, []);

  useEffect(() => {
    const filter = () => {
      let tempItems = filterValues.map((el) => {
        let temp = allPokemons.filter((item) => item.types.includes(el));
        return temp;
      });
      setFilteredPokemons(tempItems.flat());
    };
    if (filterValues.length != 0) filter();
    else setFilteredPokemons(allPokemons);
  }, [filterValues]);

  function handleCardClick(val) {
    setPokeClicked(val);
    setShowModal(true);
  }

  function handleFilterValues(e, type) {
    let index = filterValues.indexOf(type);
    if (index == -1) {
      filterValues.push(type);
      e.target.style.backgroundColor = "brown";
      e.target.style.color = "white";
      setFilterValues([...filterValues]);
    } else {
      filterValues.splice(index, 1);
      e.target.style.backgroundColor = "lightgoldenrodyellow";
      e.target.style.color = "black";
      setFilterValues([...filterValues]);
    }
  }

  return (
    <>
      <div className="type-container">
        <div className="type-content">
          {typeValues.map((type, i) => {
            return (
              <div
                key={i}
                className="type-div"
                onClick={(e) => handleFilterValues(e, type)}
              >
                {type}
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid-container">
        {filteredPokemons.map((val) => {
          return (
            <div
              className="card-container"
              key={val.name}
              onClick={() => handleCardClick(val)}
            >
              <img
                src={val.front}
                onMouseOver={(e) => (e.currentTarget.src = val.back)}
                onMouseLeave={(e) => (e.currentTarget.src = val.front)}
              ></img>
            </div>
          );
        })}
        <Modal
          data={pokeClicked}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </>
  );
}

export default Gallery;
