import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import pokemonBackground from './assets/pokemon-background.webp'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import Gallery from './components/Gallery/Gallery'
import List from './components/List/List'
import Detail from './components/Detail/Detail'

function App() {
  return(
    <Router>
      <Routes>
        <Route exact path = "/" element = {<Home/>}></Route>
        <Route exact path = "/pokemon" element = {<LayoutsWithNavBar/>}>
            <Route exact path = "/pokemon/gallery" element = {<Gallery/>}/>
            <Route exact path = "/pokemon/list" element = {<List/>}/>
            <Route exact path = "/pokemon/detail/:id" element = {<Detail/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div id = "home-container">
        <img id = "background" src = {pokemonBackground}></img>
        <div class = "button-container">
          <div class = "text-div">
            <h1>Pokemon</h1>
            <h1 id="italic-h1">Catch 'em all!</h1>
            <Button id = "enter-button" onClick={() => navigate("/pokemon/gallery")}>Enter</Button>
          </div>
        </div>
      </div>
    </>
  )
}

function LayoutsWithNavBar() {
  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}

export default App;
