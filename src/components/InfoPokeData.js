import React from "react";

import "../components/styles/InfoPokeData.css";

export const InfoPokeData = ({ poke, mode }) => {
  return (
    <div className='Informacion__Container'>
      {mode == "Base Stats" ? (
        <div>Base Stats</div>
      ) : mode == "Evolution" ? (
        <div>Evolution</div>
      ) : mode == "Moves" ? (
        <div>Moves</div>
      ) : (
        <div>
          <p>
            Id <h4>{poke.id}</h4>
          </p>
          <p>
            Nombre <h4>{poke.name}</h4>
          </p>

          <p>
            Height <h4>{poke.height}cm</h4>
          </p>
          <p>
            Weigth <h4>{poke.weight}cm</h4>
          </p>
          <p>
            BaseExperiencia <h4>{poke.base_experience}pts</h4>
          </p>
          <p>
            Orden <h4>#{poke.order}</h4>
          </p>
        </div>
      )}
    </div>
  );
};
