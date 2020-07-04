import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
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

const arr = [];
const CartasPokemon = ({ url, history }) => {
  const [LISTA, setLISTA] = useState([]);
  const [LIMITE, setLIMITE] = useState(20);
  const [LOADING, setLOADING] = useState(true);
  const [VISIBLE, setVISIBLE] = useState(true);
  const myList = useSelector((state) => state.myList);
  const dispatch = useDispatch();

  useEffect(() => {
    const cargar = async () => {
      await fetchData();
      await loadingFinish();
    };
    const fetchData = () => {
      fetch(`${url}pokemon/?limit=${LIMITE}/`)
        .then((response) => response.json())
        .then((data) => {
          data.results.map((item) => {
            fetch(item.url)
              .then((response) => response.json())
              .then((allpokemon) => arr.push(allpokemon))
              .then(() => setLISTA(arr))
              .then(() => {
                fetch(`${url}pokemon/${1}/`)
                  .then((response) => response.json())
                  .then((data) => dispatch(SelectPokemon(data)));
              })
              .then(() =>
                arr.length >= LIMITE ? loadingFinish() : setLOADING(true)
              )
              .catch((err) => console.error(err));
          });
        })
        .catch((err) => console.error(err));
    };
    const loadingFinish = () => {
      LISTA.length === 0 && dispatch(Lista(arr));
      setLOADING(false);
      setVISIBLE(!VISIBLE);
    };
    arr.length === 0 ? cargar() : loadingFinish();
    //return () =>
  }, [url]);
  const fetchDataSingle = (i, name, ColorBackgraund) => {
    fetch(`${url}pokemon/${i}/`)
      .then((response) => response.json())
      .then((data) => dispatch(SelectPokemon(data)))
      .then(() => dispatch(ColorBack(ColorBackgraund)))
      .then(() => history.push(`/pokemon/${name}`))
      .catch((err) => console.error(err));
  };

  if (myList.length > 0) {
    var ListaPokemons = myList[0].map((item, i) => {
      var tipos = item.types.map((t) => t.type.name);
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
      const colorBack = (ultimoType, ColoresBack) => ColoresBack[ultimoType];
      var porci = (LISTA.length * 100) / LIMITE;
      return (
        <div
          key={i}
          onClick={(e) =>
            fetchDataSingle(
              item.id,
              item.name,
              colorBack(ultimoType, ColoresBack)
            )
          }
          style={{ background: colorBack(ultimoType, ColoresBack) }}
          className='Galeria__Cards'>
          {LOADING ? (
            <LoaderComponent
              Lista={myList}
              porciento={porci}
              limite={LIMITE}
              visible={VISIBLE}
            />
          ) : (
            <>
              <div key={i} className='Galeria__Cards--Content'>
                <section className='Galeria__Cards--Items'>
                  <h1>
                    {item.name} #{item.id}
                  </h1>
                  <Transition
                    visible={VISIBLE}
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
  console.log("LISTA :>> ", LISTA);
  console.log("myList :>> ", myList);
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
};

export default withRouter(CartasPokemon);
