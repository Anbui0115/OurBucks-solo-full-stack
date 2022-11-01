// Types
const GET_CUSTOMIZATIONS = "customizations/GET_CUSTOMIZATIONS";
const EDIT_CUSTOMIZATIONS = "customizations/EDIT_CUSTOMIZATIONS";
const CLEAR_ALL_CUSTOMIZATIONS = "customizations/CLEAR";
// Action Creator
const getCustomizationsAction = (customizations) => {
  return {
    type: GET_CUSTOMIZATIONS,
    customizations,
  };
};
const editCustomizationsAction = (customization) => {
  return {
    type: EDIT_CUSTOMIZATIONS,
    customization,
  };
};
const clearAllCustomizations = () => {
  return {
    type: CLEAR_ALL_CUSTOMIZATIONS,
  };
};
// Thunks
export const getAllCustomizations = () => async (dispatch) => {
  const res = await fetch("/api/customizations");

  if (res.ok) {
    const customizations = await res.json();
    let data = dispatch(getCustomizationsAction(customizations.customizations));
    return data;
  }
};
// export const editCustomizationThunk =
//   () => async (dispatch) => {
//     const res = await fetch(`}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(),
//     });

//     if (res.ok) {
//       const customization = await res.json();
//       const data = await dispatch(editCustomizationsAction(customization));
//       return data;
//     }
//   };
export const clearAllCustomizationsThunk = () => async (dispatch) => {
  dispatch(clearAllCustomizations());
};
const initialState = {};

// Reducer
export default function customizationsReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_CUSTOMIZATIONS:
      newState = {};
      action.customizations.forEach(
        (customization) => (newState[customization.id] = customization)
      );
      return newState;
    // case EDIT_CUSTOMIZATIONS:
    //   newState[action.customization.id] = action.customization;
    //   return newState;
    case CLEAR_ALL_CUSTOMIZATIONS:
      newState = {};
      return newState;
    default:
      return state;
  }
}
