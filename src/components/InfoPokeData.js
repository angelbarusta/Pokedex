import React from "react";

import "../components/styles/InfoPokeData.css";
import ProgressData from "./ProgressData";

export const InfoPokeData = ({ poke, mode }) => {
  const altura = poke.height * 10;
  const ancho = poke.weight / 10;

  // const movimientos = poke.moves.map((item) => {

  //   var mov = item.move.name;
  // });

  // var ListaPokemons = myList[0].map((item, i) => {
  //   var tipos = item.types.map((t) => {
  //     return t.type.name;
  //   });
  // });

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
        <div>Evolution</div>
      ) : mode == "Moves" ? (
        <div>
          {poke.moves.map((item, i) => (
            <p>
              {i + 1} <h4>{item.move.name}</h4>
            </p>
          ))}
        </div>
      ) : (
        <div>
          <p>
            Id <h4>{poke.id}</h4>
          </p>
          <p>
            Nombre <h4>{poke.name}</h4>
          </p>

          <p>
            Height <h4>{altura}cm</h4>
          </p>
          <p>
            Weigth <h4>{ancho}cm</h4>
          </p>
          <p>
            Experiencia <h4>{poke.base_experience}pts</h4>
          </p>
          <p>
            Orden <h4>#{poke.order}</h4>
          </p>
        </div>
      )}
    </div>
  );
};
