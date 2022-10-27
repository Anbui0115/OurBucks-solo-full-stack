// Types
const GET_ITEMS = "items/GET_ITEMS";

// Action Creators
const getItemsAction = (items) => {
  return {
    type: GET_ITEMS,
    items,
  };
};

// Thunks
export const getAllItems = () => async (dispatch) => {
  const res = await fetch("/api/items");

  if (res.ok) {
    const items = await res.json();
    let data = dispatch(getItemsAction(items.items));
    return data;
  }
};

const initialState = {};

// Reducer
export default function itemsReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ITEMS:
      newState = [];
      action.items.forEach((item) => (newState[item.id] = item));
      console.log("FIRST ~~~~~~~~~~~~~~~~~~~~~~~~~~~", newState);

      return newState;
    default:
      return state;
  }
}
