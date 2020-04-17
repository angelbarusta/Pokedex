import React from "react";
import { connect } from "react-redux";

const Pokemon = ({ selectPoke }) => {
  return <div>Hola soy {selectPoke.name}</div>;
};
const mapStateToProps = (state) => {
  return {
    selectPoke: state.selectPoke,
  };
};
export default connect(mapStateToProps, null)(Pokemon);
