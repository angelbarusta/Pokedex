import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Card,
  Image,
  Label,
  Segment,
  Dimmer,
  Loader,
  Transition,
} from "semantic-ui-react";

import LoaderComponent from "./LoaderComponent";
import { Lista, SelectPokemon, ColorBack } from "../redux/actions";
import "../components/styles/CartasPokemon.css";

const URL = `https://pokeapi.co/api/v2/pokemon/`;
const URL_SINGU = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;
var arr = [];

class CartasPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      pokeinfo: [],
      miniaturas: [],
      type: [],
      habilidades: [],
      species: [],
      loading: false,
      porceLoad: 0,
      limite: 10,
      visible: true,
    };
  }

  componentWillMount() {
    if (this.props.myList.length == 0) {
      this.fetchAsync();
    } else {
      this.loadingFinish();
    }
  }

  fetchAsync = async () => {
    try {
      const data1 = await this.fetchData();

      const data2 = await this.loadingFinish();
    } catch (error) {
      console.error(error);
    }
  };

  fetchData = () => {
    fetch(`${URL}?limit=${this.state.limite}/`)
      .then((response) => response.json())
      .then((data) => {
        data.results.map((item) => {
          fetch(item.url)
            .then((response) => response.json())
            .then((allpokemon) => arr.push(allpokemon))
            .then(() => {
              this.setState({
                lista: arr,
              });
            })
            // .then(() => {
            //   this.props.Lista(arr);
            // })
            .then(() => {
              if (this.state.lista.length >= this.state.limite) {
                this.loadingFinish();
              } else {
                this.setState({
                  loading: true,
                });
              }
            })
            .catch((err) => console.error(err));
        });
      })

      .catch((err) => console.error(err));
  };

  loadingFinish = () => {
    if (this.props.myList.length == 0) {
      this.props.Lista(arr);
    }
    this.setState({ loading: false, visible: !this.state.visible });
  };

  fetchDataSingle = (i, name, ColorBackgraund) => {
    fetch(`${URL}${i}/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.SelectPokemon(data);
      })
      .then(() => this.props.ColorBack(ColorBackgraund))
      .then(() => {
        this.props.history.push(`/pokemon/${name}`);
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { lista, loading, visible, porceLoad, limite } = this.state;
    const { myList } = this.props;
    console.log("REDUCER :", this.props);
    console.log("state :", this.state);
    // console.log("lista :", lista);

    if (myList.length > 0) {
      var ListaPokemons = myList[0].map((item, i) => {
        var tipos = item.types.map((t) => {
          return t.type.name;
        });

        let ultimoType = tipos[tipos.length - 1];
        let ColoresBack = {
          fire: "#f74c4c",
          water: "rgb(48, 178, 241)",
          grass: "#039a8c",
          bug: "#8bf571",
          poison: "#b501d6",
          electric: "#fbdd08",
          ground: "#c78153",
          fairy: "#ffb8e0",
          flying: "#bcb8ff",
          ghost: "#3f2080",
          fighting: "#f57b2a",
          psychic: "#ff00bc",
          rock: "#cac4c4",
          ice: "#0ef5df",
          dark: "#291e1e",
          steel: "#ece9e9",
          dragon: "#806698",
          normal: "gray",
        };

        const colorBack = (type, Colores) => Colores[type];

        var porci = (lista.length * 100) / this.state.limite;

        return (
          <div
            key={i}
            onClick={(e) =>
              this.fetchDataSingle(
                item.id,
                item.name,
                colorBack(ultimoType, ColoresBack)
              )
            }
            style={{ background: colorBack(ultimoType, ColoresBack) }}
            className='Galeria__Cards'>
            {loading ? (
              <LoaderComponent
                Lista={myList}
                porciento={porci}
                limite={limite}
                visible={visible}
              />
            ) : (
              <>
                <div className='Galeria__Cards--Content'>
                  <section className='Galeria__Cards--Items'>
                    <h1>
                      {item.name} #{item.id}
                    </h1>
                    <Transition
                      visible={visible}
                      animation='jiggle'
                      duration={200}>
                      <Image src={item.sprites.front_default} />
                    </Transition>
                    <Label
                      style={{ marginBottom: 5 }}
                      circular
                      color='green'
                      image>
                      {item.name}
                    </Label>

                    {item.types.map((s) => {
                      return (
                        <div className='Galeria__Cards--Labels'>
                          {s.type.name}
                        </div>
                      );
                    })}
                  </section>

                  <div className='Galeria__Cards--image'>
                    <Image
                      src={`https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        );
      });
    } else {
      <div>Loading...</div>;
    }

    return (
      <>
        <h1 style={{ marginLeft: 15 }}>Pokedex</h1>
        {myList.length > 0 ? (
          <section className='Galeria'>{ListaPokemons}</section>
        ) : (
          <section className='Galeria'>Loading...</section>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myList: state.myList,
  };
};
const mapDispatchToProps = {
  Lista,
  SelectPokemon,
  ColorBack,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CartasPokemon));
