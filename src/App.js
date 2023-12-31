import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.css";
import pokemonBackground from "./assets/pokemon-background.webp";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Gallery from "./components/Gallery/Gallery";
import List from "./components/List/List";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/pokemon" element={<LayoutsWithNavBar />}>
          <Route exact path="/pokemon/gallery" element={<Gallery />} />
          <Route exact path="/pokemon/list" element={<List />} />
          <Route exact path="/pokemon/detail/:id" element={<Detail />} />
          <Route exact path="/pokemon/form" element={<Form />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div id="home-container">
        <img id="background" src={pokemonBackground}></img>
        <div class="button-container">
          <div class="text-div">
            <h1>Pokemon</h1>
            <h1 id="italic-h1">Catch 'em all!</h1>
            <Button
              id="enter-button"
              onClick={() => navigate("/pokemon/gallery")}
            >
              Enter
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function LayoutsWithNavBar() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllPokemons();
  }, []);

  function getAllPokemons() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then(async (response) => {
        let items = response.data.results;

        const pokeJSONArray = await Promise.all(
          items.map(async (item, index) => {
            const response_1 = await axios.get(item.url);
            item.front = response_1.data.sprites.front_default;
            item.back = response_1.data.sprites.back_default;
            item.height = response_1.data.height;
            item.weight = response_1.data.weight;
            item.experience = response_1.data.base_experience;
            item.types = response_1.data.types.map((x) => x.type.name);
            return item;
          })
        );
        setAllPokemons(pokeJSONArray);
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading..</h1>
      </div>
    );
  }
  return (
    <>
      <NavBar />
      <Outlet context={allPokemons} />
    </>
  );
}

export default App;
