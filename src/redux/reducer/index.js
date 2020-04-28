const reducer = (state, actions) => {
  switch (actions.type) {
    case "SET_LIST":
      return {
        ...state,
        myList: [actions.payload],
      };
    case "SET_POKEMON":
      return {
        ...state,
        selectPoke: actions.payload,
      };
    case "SET_COLORBACK":
      return {
        ...state,
        colorBackground: actions.payload,
      };
    default:
      //regresamos el estado si todo falla
      return state;
  }
};

export default reducer;
