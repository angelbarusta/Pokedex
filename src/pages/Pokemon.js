import React from "react";
import { connect } from "react-redux";
import DetailsPoke from "../components/detailsPoke.js";

const Pokemon = ({ selectPoke }) => {
  return (
    <div>
      <DetailsPoke />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    selectPoke: state.selectPoke,
  };
};
export default connect(mapStateToProps, null)(Pokemon);
