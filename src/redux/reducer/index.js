const reducer = (state, actions) => {
  switch (actions.type) {
    case "SET_LIST":
      return {
        ...state,
        myList: [...state.myList, actions.payload],
      };
    default:
      //regresamos el estado si todo falla
      return state;
  }
};

export default reducer;
