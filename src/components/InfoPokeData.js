import React from "react";

import "../components/styles/InfoPokeData.css";
import ProgressData from "./ProgressData";

export const InfoPokeData = ({ poke, mode, evo }) => {
  const about = ["id", "name", "height", "weight", "base_experience", "order"];

  const LisAbout = about.map((item, i) => {
    var isNum;
    const isNumero = (item) => (item == "order" ? (isNum = "#") : (isNum = ""));
    const Up = (txt) => txt[0].toUpperCase() + txt.slice(1);
    const ValItem = (item) =>
      item == "height"
        ? poke[item] * 10
        : item == "weight"
        ? poke[item] / 10
        : poke[item];

    return (
      <p key={i}>
        {Up(item)}{" "}
        <h4>
          {isNumero(item)}
          {ValItem(item)}
        </h4>
      </p>
    );
  });

  return (
    <div className='Informacion__Container'>
      {mode == "Base Stats" ? (
        <div>
          <p>
            Exp
            <ProgressData
              poke={poke}
              valor={poke.base_experience}
              porci={poke.base_experience + 1 + Math.random()}
            />
          </p>
        </div>
      ) : mode == "Evolution" ? (
        <div>
          {evo.map((item, i) => (
            <p key={i}>
              {i + 1} <h4>{item}</h4>
            </p>
          ))}
        </div>
      ) : mode == "Moves" ? (
        <div>
          {poke.moves.map((item, i) => (
            <p key={i}>
              {i + 1} <h4>{item.move.name}</h4>
            </p>
          ))}
        </div>
      ) : (
        <div>{LisAbout}</div>
      )}
    </div>
  );
};
