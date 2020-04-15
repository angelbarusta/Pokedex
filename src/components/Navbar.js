import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import faker from "faker";

import "./styles/Navbar.css";

import logo from "../images/az-nuevo_circular.png";
import { Icon } from "semantic-ui-react";

export const Navbar = (props) => {
  const { myList } = props;
  let email_random = faker.internet.exampleEmail();
  return (
    <div className='Navbar'>
      <Link className='Navbar__brand' to='/'>
        <img
          className='Navbar__brand-logo'
          src={logo}
          alt='Logo'
          width={30}
          height={30}
        />
        {/* <span className='font-weight-light'>Pokedex angel</span>
        <span className='font-weight-bold'>App</span> */}
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
