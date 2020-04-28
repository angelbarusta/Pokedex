import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./styles/Navbar.css";

import { ColorBack } from "../redux/actions";

import logo from "../images/az-nuevo_circular.png";
import { Icon } from "semantic-ui-react";
// import { Icon } from "semantic-ui-react";

const handleResetColorB = (props) => {
  props.ColorBack("transparent");
};

export const Navbar = (props) => {
  const { myList, colorBackground } = props;

  return (
    <div className='Navbar' style={{ background: colorBackground }}>
      <Link
        className='Navbar__brand'
        to='/'
        onClick={(e) => handleResetColorB(e)}>
        <Icon
          name='arrow left'
          className='Navbar__brand-back'
          width={30}
          height={30}
        />
      </Link>
      <Link className='Navbar__brand' to='/'>
        <Icon
          name='bars'
          className='Navbar__brand-menu'
          width={30}
          height={30}
        />
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    colorBackground: state.colorBackground,
  };
};

const mapDispatchToProps = {
  ColorBack,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
