import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Image,
  Label,
  Segment,
  Dimmer,
  Loader,
  Transition,
} from "semantic-ui-react";

import { LA_LISTA } from "../redux/actions";
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
      limite: 50,
      visible: true,
    };
  }

  componentDidMount() {
    this.fetchAsync();
  }

  fetchAsync = async () => {
    try {
      const data1 = await this.fetchData(`${URL}?limit=${this.state.limite}/`);
      const data2 = await this.loadingFinish();
    } catch (error) {
      console.error(error);
    }
  };

  fetchData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.results.map((item) => {
          fetch(item.url)
            .then((response) => response.json())
            .then((allpokemon) => arr.push(allpokemon))
            .then(() => {
              this.setState({
                lista: arr,
                loading: true,
              });
            })
            .then(() => {
              if (this.state.lista.length == this.state.limite) {
                this.loadingFinish();
              }
            });
        });
      })
      .catch((err) => console.error(err));
  };

  loadingFinish = () =>
    this.setState({ loading: false, visible: !this.state.visible });

  fetchDataSingle = (i) => {
    fetch(`${URL}${i + 1}/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          pokeinfo: data,
          type: data.types,
          habilidades: data.abilities,
        });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { lista, loading, visible } = this.state;
    console.log("state :", this.state);
    console.log("lista :", lista);

    const ListaPokemons = lista.map((item, i) => {
      return (
        <div
          key={i}
          onClick={(e) => this.fetchDataSingle(i)}
          className='Galeria__Cards'>
          {loading ? (
            <div style={{ width: 290, height: 222 }}>
              <Segment style={{ width: 290, height: 222 }}>
                <Dimmer active inverted>
                  <Loader inverted content='Loading' />
                </Dimmer>
                <Transition visible={visible} animation='jiggle' duration={200}>
                  <Image src='/images/wireframe/short-paragraph.png' />
                </Transition>
              </Segment>
            </div>
          ) : (
            <>
              <div className='Galeria__Cards--Content'>
                <section className='Galeria__Cards--Items'>
                  <h1>{item.name}</h1>
                  <Transition
                    visible={visible}
                    animation='jiggle'
                    duration={200}>
                    <Image src={`${URL_SINGU}${i + 1}.png`} />
                  </Transition>
                  <Label
                    style={{ marginBottom: 5 }}
                    circular
                    color='green'
                    image>
                    {item.name}
                  </Label>
                  <Label style={{ marginBottom: 5 }} circular color='green'>
                    #{i}
                  </Label>
                  <Label style={{ marginBottom: 5 }} circular color='green'>
                    {}
                  </Label>
                </section>

                <div className='Galeria__Cards--image'>
                  <Image
                    src={`https://pokeres.bastionbot.org/images/pokemon/${
                      i + 1
                    }.png`}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      );
    });

    return (
      <>
        <h1 style={{ marginLeft: 15 }}>Pokedex</h1>
        <section className='Galeria'>{ListaPokemons}</section>
      </>
    );
  }
}

const mapDispatchToProps = {
  LA_LISTA,
};
export default connect(null, mapDispatchToProps)(CartasPokemon);
