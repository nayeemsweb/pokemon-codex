import { useEffect, useState } from "react";
import PokemonThumbnail from "./components/PokemonThumbnail";
import {Button, Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async() => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject (result){
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        setAllPokemons(currentList => [...currentList, data])       
        
      })      
    }
    createPokemonObject(data.results)
    await console.log(allPokemons);
  }

  useEffect(() => {
    getAllPokemons()
  }, [])

  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) =>
            <PokemonThumbnail 
            id = {pokemon.id}
            name = {pokemon.name}
            image = {pokemon.sprites.other.dream_world.front_default}
            type = {pokemon.types[0].type.name}
            key = {index}
            />
          )}
        </div>
        <Button variant="danger mt-4 col-md-6" size="lg" className="" onClick = {() => getAllPokemons()}>Load More</Button>
      </div>
    </div>
  );
}

export default App;
