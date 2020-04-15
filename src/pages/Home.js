import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import CartasPokemon from "../components/CartasPokemon";

class Home extends Component {
  render() {
    return (
      <div>
        <CartasPokemon />
      </div>
    );
  }
}
export default Home;
