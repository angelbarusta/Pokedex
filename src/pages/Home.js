import React from "react";
import CartasPokemon from "../components/CartasPokemon";

//const URL = `https://pokeapi.co/api/v2/pokemon/`;
const URL = `https://pokeapi.co/api/v2/`;
const Home = () => <CartasPokemon url={URL} />;
export default Home;
