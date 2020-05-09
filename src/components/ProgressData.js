import React from "react";
import { Progress, Segment } from "semantic-ui-react";

const estadoColor = (val, col) => {
  var color;
  if (val <= 25) {
    color = "red";
  } else if (val <= 50) {
    color = "orange";
  } else if (val <= 75) {
    color = "yellow";
  } else {
    color = "green";
  }
  return color;
};

const PogressData = ({
  poke,
  porci,
  valor,
  isProgress,
  textLoad,
  limite,
  porciento,
  cargados,
}) => {
  return (
    <div style={{ width: "100%" }}>
      {isProgress ? (
        <Progress
          active
          progress='percent'
          color={estadoColor(porciento)}
          value={porciento}
          total={limite}>
          Loading...
        </Progress>
      ) : (
        <Progress
          active
          progress='value'
          value={valor}
          total={porci}
          color={estadoColor(porciento)}>
          Exp
        </Progress>
      )}
    </div>
  );
};

export default PogressData;
