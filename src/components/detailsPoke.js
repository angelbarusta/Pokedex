import React from "react";
import { connect } from "react-redux";

const DetailsPoke = ({ selectPoke }) => {
  return (
    <div>
      <header>
        <h1>{selectPoke.name}</h1>
        {selectPoke.id < 100 && selectPoke.id >= 10 ? (
          <p>#0{selectPoke.id}</p>
        ) : selectPoke.id < 10 ? (
          <p>#00{selectPoke.id}</p>
        ) : (
          <p>#{selectPoke.id}</p>
        )}
        <div>
          {selectPoke.types.map((s) => {
            return <p>{s.type.name}</p>;
          })}
        </div>
      </header>
      <section>
        <img
          src={`https://pokeres.bastionbot.org/images/pokemon/${selectPoke.id}.png`}
          alt='PokePhot'
        />
      </section>
      <section>
        <header>
          <p>uno</p>
          <p>dos</p>
          <p>tre</p>
          <p>cuatre</p>
        </header>
        <section>
          <div>uno</div>
          <div>dos</div>
        </section>
        <section>
          <div>uno</div>
          <div>dos</div>
        </section>
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
