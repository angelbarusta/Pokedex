import React, { useState, useEffect, Component } from "react";
import { connect, useSelector, useDispatch } from "react-redux";

import "../components/styles/DetallesPoke.css";
import NavDetailsPoke from "./NavDetailsPoke";
import LoaderComponent from "./LoaderComponent";
import { addEvoPoke } from "../redux/actions";

const URL = `https://pokeapi.co/api/v2/pokemon/`;
const URL_EVOLUCION = `https://pokeapi.co/api/v2/pokemon-species/`; //https://pokeapi.co/api/v2/pokemon-species/4/

const DetailsPoke = () => {
  const [VISIBLE, setVISIBLE] = useState(true);
  const [LOADING, setLOADING] = useState(true);
  const [LIMITE, setLIMITE] = useState(1);
  const selectPoke = useSelector((state) => state.selectPoke);
  const evolucionesPoke = useSelector((state) => state.evolucionesPoke);
  const dispatch = useDispatch();
  useEffect(() => {
    const cargar = async () => {
      try {
        await fetchData();
      } catch (error) {
        console.error(error);
      }
    };
    cargar();
    //return () =>
  }, [selectPoke]);
  const fetchData = () => {
    fetch(`${URL_EVOLUCION}${selectPoke.id}/`)
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
              dispatch(addEvoPoke(arrEvolu));
              if (evo2[0]) {
                var evo3 = evos[0].evolves_to[0].species.name;
                arrEvolu.push(evo3);
                dispatch(addEvoPoke(arrEvolu));
              }
            }
            dispatch(addEvoPoke(arrEvolu));
          });
      })
      .catch((err) => console.error("ERROR_API_EVOLUCION", err));
  };
  var Pokemon = [[selectPoke]];
  var porci = Pokemon.length * 100;
  setTimeout(
    () => (setLOADING(false), setVISIBLE(!VISIBLE)), //this.setState({ loading: false, visible: !this.state.visible }),
    1000
  );
  var tipos = selectPoke.types.map((t) => t.type.name);
  let ultimoType = tipos[0];
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
        {LOADING ? (
          <LoaderComponent
            Lista={Pokemon}
            porciento={porci}
            limite={LIMITE}
            visible={VISIBLE}
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
};

export default DetailsPoke;
