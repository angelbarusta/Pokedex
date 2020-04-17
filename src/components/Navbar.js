import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./styles/Navbar.css";

import logo from "../images/az-nuevo_circular.png";
import { Icon } from "semantic-ui-react";
// import { Icon } from "semantic-ui-react";

export const Navbar = (props) => {
  const { myList } = props;
  return (
    <div className='Navbar'>
      <Link className='Navbar__brand' to='/'>
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
  };
};

export default connect(mapStateToProps, null)(Navbar);
