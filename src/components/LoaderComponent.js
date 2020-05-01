import React from "react";
import { Segment, Dimmer, Loader, Image, Transition } from "semantic-ui-react";

export default function LoaderComponent(props) {
  const { porciento, Lista, limite, visible } = props;
  return (
    <div style={{ width: 290, height: 222 }}>
      <Segment style={{ width: 290, height: 222 }}>
        <Dimmer active inverted>
          <Loader
            inverted
            content={`
              Loading...${parseInt(porciento)}%
              ${Lista[0].length} de ${limite}
              `}
          />
        </Dimmer>
        <Transition visible={visible} animation='jiggle' duration={200}>
          <div className='Galeria__Cards--image'>
            <Image src='/images/wireframe/short-paragraph.png' />
          </div>
        </Transition>
      </Segment>
    </div>
  );
}
