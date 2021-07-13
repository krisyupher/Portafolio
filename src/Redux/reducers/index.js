const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VIEW_RENDER": {
      return { ...state, viewRender: action.payload };
    }
    case "SET_DATA_SKILL": {
      return { ...state, skills: action.payload };
    }
    default: {
      return state;
    }
  }
};
export default reducer;
