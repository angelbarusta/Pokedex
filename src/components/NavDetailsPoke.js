import React, { useState, Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { InfoPokeData } from "./infoPokeData";

import "./styles/DetallesPoke.css";

const arrItem = [
  { name: "About" },
  { name: "Base Stats" },
  { name: "Evolution" },
  { name: "Moves" },
];
const NavDetailsPoke = ({ poke, evo }) => {
  const [activeItem, setActiveItem] = useState("About");
  const listItem = arrItem.map((s, i) => (
    <Menu.Item
      name={s.name}
      active={activeItem === s.name}
      onClick={(e, { name }) => setActiveItem(name)}
    />
  ));
  return (
    <div className='NavDetallesPoke__Container'>
      <Menu pointing secondary className='NavDetallesPoke__Container--Menu'>
        {listItem}
      </Menu>
      <Segment className='NavDetallesPoke__Container--SegmentDetails'>
        <InfoPokeData poke={poke} mode={activeItem} evo={evo} />
      </Segment>
    </div>
  );
};
export default NavDetailsPoke;
