import React from "react";
import { Progress, Segment } from "semantic-ui-react";

// let colores = {
//   red: 20,
//   yellow: 50,
//   green: 100,
// };

// let colores = {
//   20: "red",
//   50: "yellow",
//   100: "green",
// };
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
  porcen,
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
          {/* {textLoad} */}
          Loading...
        </Progress>
      ) : (
        <Progress
          active
          progress
          color={estadoColor(valor, colores)}
          porcent={valor}
          total={100}>
          Active
        </Progress>
      )}
    </div>
  );
};

export default PogressData;
