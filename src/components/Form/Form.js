import React from "react";
import "./Form.css";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

function Form() {
  const allPokemons = useOutletContext();
  const [searchPokemons, setSearchPokemons] = useState(allPokemons);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const search = () => {
      const filteredPokemons = allPokemons
        .slice()
        .filter(
          (val) =>
            val.name.includes(searchValue) ||
            val.types.some((type) => type.includes(searchValue))
        );
      console.log(filteredPokemons);
      setSearchPokemons(filteredPokemons);
    };
    if (searchValue != "") search();
    else setSearchPokemons(allPokemons);
  }, [searchValue]);

  return (
    <>
      <div className="main-container">
        <form className="form-container">
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <table className="form-table">
            <thead>
              <tr>
                <td>Name</td>
                <td>Height</td>
                <td>Weight</td>
                <td>Type</td>
              </tr>
            </thead>
            <tbody>
              {searchPokemons.map((val, i) => {
                return (
                  <tr key={i}>
                    <td id="name">
                      {val.name.charAt(0).toUpperCase() + val.name.slice(1)}
                    </td>
                    <td>{val.height}</td>
                    <td>{val.weight}</td>
                    <td>
                      {val.types.map((type, i) =>
                        i != val.types.length - 1
                          ? type.charAt(0).toUpperCase() + type.slice(1) + ", "
                          : type.charAt(0).toUpperCase() + type.slice(1)
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
}

export default Form;
