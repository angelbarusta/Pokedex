import React from "react";
import {
  Segment,
  Dimmer,
  Loader,
  Image,
  Transition,
  Card,
} from "semantic-ui-react";

import ProgresData from "./ProgressData";

export default function LoaderComponent(props) {
  const { porciento, Lista, limite, visible } = props;
  return (
    <div style={{ width: "100", background: "red" }}>
      {/* <Card style={{ width: 290, height: 222, background: background }}> */}
      <Dimmer active inverted>
        <Loader
          style={{
            width: "100vw",
            height: "auto",
            margin: "auto",
          }}
          size='large'
          inverted
          content={
            <ProgresData
              isProgress={true}
              textLoad={`
               Loading...${parseInt(porciento)}%
               ${Lista[0].length} de ${limite}
               `}
              limite={limite}
              cargados={Lista[0].length}
              porciento={porciento}
            />
          }
        />
      </Dimmer>

      <Transition visible={visible} animation='jiggle' duration={200}>
        <div className='Galeria__Cards--image'>
          <Image src='/images/wireframe/short-paragraph.png' />
        </div>
      </Transition>
      {/* </Card> */}
    </div>
  );
}
