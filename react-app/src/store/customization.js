// Types
const GET_CUSTOMIZATIONS = "customizations/GET_CUSTOMIZATIONS";

// Action Creators
const getCustomizationsAction = (customizations) => {
  return {
    type: GET_CUSTOMIZATIONS,
    customizations,
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
      // console.log("FIRST ~~~~~~~~~~~~~~~~~~~~~~~~~~~", newState);

      return newState;
    default:
      return state;
  }
}
