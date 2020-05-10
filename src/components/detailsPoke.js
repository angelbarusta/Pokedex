import React, { Component } from "react";
import { connect } from "react-redux";

import "../components/styles/DetallesPoke.css";
import NavDetailsPoke from "./NavDetailsPoke";
import LoaderComponent from "./LoaderComponent";
import { addEvoPoke } from "../redux/actions";

const URL = `https://pokeapi.co/api/v2/pokemon/`;
const URL_EVOLUCION = `https://pokeapi.co/api/v2/pokemon-species/`; //https://pokeapi.co/api/v2/pokemon-species/4/

class DetailsPoke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      loading: true,
      limite: 1,
    };
  }

  componentWillMount() {
    const { selectPoke } = this.props;
    const id = selectPoke.id;
    this.fetchAsync(id);
  }

  fetchAsync = async (id) => {
    try {
      const data1 = await this.fetchData(id);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData = (id) => {
    fetch(`${URL_EVOLUCION}${id}/`)
      .then((response) => response.json())
      .then((data) => {
        fetch(data.evolution_chain.url)
          .then((response) => response.json())
          .then((dat) => {
            let arrEvo = dat.chain.evolves_to;
            let evos = arrEvo.map((item) => item);

            var evo1 = dat.chain.species.name;
            var arrEvolu = [evo1];

            if (evos[0]) {
              var evo2 = evos[0].species.name;
              arrEvolu.push(evo2);
              this.props.addEvoPoke(arrEvolu);

              if (evo2[0]) {
                var evo3 = evos[0].evolves_to[0].species.name;
                arrEvolu.push(evo3);
                this.props.addEvoPoke(arrEvolu);
              }
            }

            console.log("OK0 :>> ", arrEvolu);
            this.props.addEvoPoke(arrEvolu);
            //console.log("OK0 :>> ", arrEvolu);
          });
      })
      .catch((err) => {
        console.error("ERROR_API_EVOLUCION", err);
      });
  };

  render() {
    const { selectPoke, evolucionesPoke } = this.props;
    const { limite, visible, loading } = this.state;
    var Pokemon = [[selectPoke]];
    var porci = Pokemon.length * 100;

    setTimeout(
      () => this.setState({ loading: false, visible: !this.state.visible }),
      2000
    );

    var tipos = selectPoke.types.map((t) => {
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

    return (
      <div
        className='DetallesPoke__Container'
        style={{ background: colorBack(ultimoType, ColoresBack) }}>
        <header>
          <section>
            <h1>{selectPoke.name}</h1>
            {selectPoke.id < 100 && selectPoke.id >= 10 ? (
              <p>#0{selectPoke.id}</p>
            ) : selectPoke.id < 10 ? (
              <p>#00{selectPoke.id}</p>
            ) : (
              <p>#{selectPoke.id}</p>
            )}
          </section>
          <div>
            {selectPoke.types.map((s, i) => {
              return (
                <div key={i} className='DetallesPoke__Container--TypesData'>
                  <p>{s.type.name}</p>
                </div>
              );
            })}
          </div>
        </header>
        <section className='DetallesPoke__Container--Container_PhotoPoke'>
          {loading ? (
            <LoaderComponent
              Lista={Pokemon}
              porciento={porci}
              limite={limite}
              visible={visible}
            />
          ) : (
            <img
              className='DetallesPoke__Container--PhotoPoke'
              src={`https://pokeres.bastionbot.org/images/pokemon/${selectPoke.id}.png`}
              alt='PokePhot'
            />
          )}
        </section>
        <section className='DetallesPoke__Container--DataEstadistic'>
          <NavDetailsPoke poke={selectPoke} evo={evolucionesPoke} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectPoke: state.selectPoke,
    evolucionesPoke: state.evolucionesPoke,
  };
};
const mapDispatchToProps = {
  addEvoPoke,
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailsPoke);
