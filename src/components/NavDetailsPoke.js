import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";

export default class NavDetailsPoke extends Component {
  state = { activeItem: "About" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div className='NavDetallesPoke__Container'>
        <Menu pointing secondary className='NavDetallesPoke__Container--Menu'>
          <Menu.Item
            name='About'
            active={activeItem === "About"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Base Stats'
            active={activeItem === "Base Stats"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Evolution'
            active={activeItem === "Evolution"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Moves'
            active={activeItem === "Moves"}
            onClick={this.handleItemClick}
          />
        </Menu>

        <Segment>
          <img
            style={{ maxWidth: 200 }}
            src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'
          />
        </Segment>
      </div>
    );
  }
}
