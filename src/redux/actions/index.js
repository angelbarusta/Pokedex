export const Lista = (payload) => ({
  type: "SET_LIST", // cuidado con los nombres al llamr en los reducers debe ser exactam,ente los mismo
  payload,
});
export const SelectPokemon = (payload) => ({
  type: "SET_POKEMON",
  payload,
});
export const ColorBack = (payload) => ({
  type: "SET_COLORBACK",
  payload,
});
export const addEvoPoke = (payload) => ({
  type: "SET_EVO_POKE",
  payload,
});

// export const NewUser = (payload) => ({
//   type: "SET_NEW_USER", // cuidado con los nombres al llamr en los reducers debe ser exactam,ente los mismo
//   payload
// });
