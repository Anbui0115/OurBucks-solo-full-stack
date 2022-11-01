// Types

const GET_CUSTOMIZED_SELECTIONS =
  "customize_selections/GET_CUSTOMIZED_SELECTIONS";
const CREATE_CUSTOMIZED_SELECTION =
  "customize_selections/CREATE_CUSTOMIZED_SELECTION";
const EDIT_CUSTOMIZED_SELECTION =
  "customize_selections/EDIT_CUSTOMIZED_SELECTION";
const DELETE_CUSTOMIZED_SELECTION =
  "customize_selections/DELETE_CUSTOMIZED_SELECTION";
const CLEAR_ALL_CUSTOMIZED_SELECTIONS = "customize_selections_items/CLEAR_ALL";
// Action Creators
const getCustomizedSelectionAction = (customized_selections) => {
  return {
    type: GET_CUSTOMIZED_SELECTIONS,
    customized_selections,
  };
};

const createCustomizedSelectionAction = (customized_selection) => {
  return {
    type: CREATE_CUSTOMIZED_SELECTION,
    customized_selection,
  };
};

const editCustomizedSelectionAction = (customized_selection) => {
  return {
    type: EDIT_CUSTOMIZED_SELECTION,
    customized_selection,
  };
};

export const deleteCustomizedSelectionAction = (customized_selectionId) => {
  return {
    type: DELETE_CUSTOMIZED_SELECTION,
    customized_selectionId,
  };
};

const clearAllCustomizedSelectionsAction = () => {
  return {
    type: CLEAR_ALL_CUSTOMIZED_SELECTIONS,
  };
};
// Thunks
export const getCustomizedSelections =
  (customized_item_id) => async (dispatch) => {
    const res = await fetch(
      `/api/customized_selections/customized_item/${customized_item_id}`
    );

    if (res.ok) {
      const customizedSelections = await res.json();
      const data = await dispatch(
        getCustomizedSelectionAction(customizedSelections.customized_selections)
      );
      return data;
    }
  };

export const addCustomizedSelectionToCustomizedItem =
  (customization_id, customized_item_id) => async (dispatch) => {
    const res = await fetch(
      `/api/customized_selections/customized_item/${customized_item_id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customization_id }),
      }
    );
    if (res.ok) {
      const customizedSelection = await res.json();
      const data = await dispatch(
        createCustomizedSelectionAction(customizedSelection)
      );
      return data;
    } else {
      console.log(res.text());
    }
  };

export const editCustomizedSelection =
  (customized_selection_id, customized_item_id, customization_id) =>
  async (dispatch) => {
    const res = await fetch(
      `/api/customized_selections/${customized_selection_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customized_item_id, customization_id }),
      }
    );

    if (res.ok) {
      const customizedSelection = await res.json();
      dispatch(
        editCustomizedSelectionAction(
          customizedSelection["customized_selection"]
        )
      );
      return customizedSelection;
    }
  };

export const deleteCustomizedSelection =
  (customized_selectionId) => async (dispatch) => {
    const res = await fetch(
      `/api/customized_selections/${customized_selectionId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      const customizedSelection = `${customized_selectionId}`;
      await dispatch(deleteCustomizedSelectionAction(customized_selectionId));
    }
  };

export const clearAllCustomizedSelectionsThunk = () => async (dispatch) => {
  dispatch(clearAllCustomizedSelectionsAction());
};

const initialState = {};

// Reducer
export default function customized_selectionsReducer(
  state = initialState,
  action
) {
  let newState = { ...state };
  switch (action.type) {
    case GET_CUSTOMIZED_SELECTIONS:
      newState = {};
      action.customized_selections.forEach(
        (customized_selection) =>
          (newState[customized_selection.id] = customized_selection)
      );
      return newState;
    case CREATE_CUSTOMIZED_SELECTION:
      newState[action.customized_selection.id] = action.customized_selection;
      return newState;
    case EDIT_CUSTOMIZED_SELECTION:
      console.log(action.customized_selection);
      newState[action.customized_selection.id] = action.customized_selection;
      return newState;
    case DELETE_CUSTOMIZED_SELECTION:
      delete newState[action.customized_selectionId];
      return newState;
    case CLEAR_ALL_CUSTOMIZED_SELECTIONS:
      newState = {};
      return newState;
    default:
      return state;
  }
}
