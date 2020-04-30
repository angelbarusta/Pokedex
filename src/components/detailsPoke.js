import React from "react";
import { connect } from "react-redux";

import "../components/styles/DetallesPoke.css";
import NavDetailsPoke from "./NavDetailsPoke";

const DetailsPoke = ({ selectPoke }) => {
  var tipos = selectPoke.types.map((t) => {
    return t.type.name;
  });

  if (tipos[tipos.length - 1] == "fire") {
    var ColorBackgraund = "#f74c4c";
  } else if (tipos[tipos.length - 1] == "water") {
    var ColorBackgraund = "rgb(48, 178, 241)";
  } else if (tipos[tipos.length - 1] == "grass") {
    var ColorBackgraund = "#039a8c";
  } else if (tipos[tipos.length - 1] == "bug") {
    var ColorBackgraund = "#8bf571";
  } else if (tipos[tipos.length - 1] == "poison") {
    var ColorBackgraund = "#b501d6";
  } else if (tipos[tipos.length - 1] == "electric") {
    var ColorBackgraund = "#fbdd08";
  } else if (tipos[tipos.length - 1] == "ground") {
    var ColorBackgraund = "#c78153";
  } else if (tipos[tipos.length - 1] == "fairy") {
    var ColorBackgraund = "#ffb8e0";
  } else if (tipos[tipos.length - 1] == "flying") {
    var ColorBackgraund = "#bcb8ff";
  } else if (tipos[tipos.length - 1] == "ghost") {
    var ColorBackgraund = "#3f2080";
  } else if (tipos[tipos.length - 1] == "fighting") {
    var ColorBackgraund = "#f57b2a";
  } else if (tipos[tipos.length - 1] == "psychic") {
    var ColorBackgraund = "#ff00bc";
  } else if (tipos[tipos.length - 1] == "rock") {
    var ColorBackgraund = "#cac4c4";
  } else if (tipos[tipos.length - 1] == "ice") {
    var ColorBackgraund = "#0ef5df";
  } else if (tipos[tipos.length - 1] == "dark") {
    var ColorBackgraund = "#291e1e";
  } else if (tipos[tipos.length - 1] == "steel") {
    var ColorBackgraund = "#ece9e9";
  } else if (tipos[tipos.length - 1] == "dragon") {
    var ColorBackgraund = "#806698";
  } else {
    var ColorBackgraund = "gray";
  }
  return (
    <div
      className='DetallesPoke__Container'
      style={{ background: ColorBackgraund }}>
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
          {selectPoke.types.map((s) => {
            return (
              <div className='DetallesPoke__Container--TypesData'>
                <p>{s.type.name}</p>
              </div>
            );
          })}
        </div>
      </header>
      <section className='DetallesPoke__Container--Container_PhotoPoke'>
        <img
          className='DetallesPoke__Container--PhotoPoke'
          src={`https://pokeres.bastionbot.org/images/pokemon/${selectPoke.id}.png`}
          alt='PokePhot'
        />
      </section>
      <section className='DetallesPoke__Container--DataEstadistic'>
        <NavDetailsPoke />
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectPoke: state.selectPoke,
  };
};
export default connect(mapStateToProps, null)(DetailsPoke);
