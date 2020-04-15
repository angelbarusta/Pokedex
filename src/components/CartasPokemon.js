import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Image } from "semantic-ui-react";

import { LA_LISTA } from "../redux/actions";

const URL = `https://pokeapi.co/api/v2/pokemon/`;

class CartasPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      pokeinfo: [],
      pokePhotSelect: "",
      miniaturas: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          lista: data.results,
        });
        console.log("DataPokedex", data.results);
      })
      .catch((err) => console.error(err));
  };

  fetchDataSingle = (i) => {
    fetch(`${URL}${i + 1}/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          miniaturas: data.sprites,
        });
        console.log("miniaturass :", data.sprites);
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { lista, pokeinfo, miniaturas } = this.state;
    console.log("state :", this.state);
    console.log("lista :", this.state.lista);
    console.log("miniaturass :", miniaturas);
    console.log("pokeinfo :", pokeinfo);

    const ListaPokemons = lista.map((item, i) => {
      // console.log("I", i);
      return (
        <Card
          key={i}
          onClick={(e) => this.fetchDataSingle(i)}
          style={{ color: "black", display: "flex" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
            }}>
            <h1>{item.name}</h1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}>
            <div>
              <p>Type: {item.name}</p>
              <p>id: {i}</p>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  i + 1
                }.png`}
              />
            </div>
            <div>
              <Image
                src={`https://pokeres.bastionbot.org/images/pokemon/${
                  i + 1
                }.png`}
              />
            </div>
          </div>
        </Card>
      );
    });

    return <div>{ListaPokemons}</div>;
  }
}

const mapDispatchToProps = {
  LA_LISTA,
};
export default connect(null, mapDispatchToProps)(CartasPokemon);
