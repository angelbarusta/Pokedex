import React, { Component } from "react";
import { connect } from "react-redux";

class NotFound extends Component {
  Ret = () => {
    this.props.history.push(`/`);
    //alert("retornando NotFound");
  };
  Refres = () => {
    const { selectPoke, history } = this.props;
    history.push(`/pokemon/${selectPoke.name}`);
  };
  componentWillMount() {
    const { selectPoke } = this.props;
    fetch(`${URL}${selectPoke.id}/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.SelectPokemon(data);
      })
      .then(() => this.props.ColorBack(ColorBackgraund))
      .then(() => {
        () => setTimeout(this.Refres(), 500);
      })
      .catch((err) => {
        this.Ret();
        console.error(err);
      });
  }
  render() {
    return <div>NOT FOUND. REGRESA</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    selectPoke: state.selectPoke,
  };
};

export default connect(mapStateToProps, null)(NotFound);
