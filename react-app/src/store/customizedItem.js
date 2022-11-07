// Types

const GET_CUS_ITEMS = "customized-items/GET_ITEMS";
const CREATE_CUS_ITEM = "customized-items/CREATE_ITEM";
const EDIT_CUS_ITEM = "customized-items/EDIT_ITEM";
const DELETE_CUS_ITEM = "customized-items/DELETE_ITEM";
const CLEAR_ALL_CUS_ITEMS = "customized-items/CLEAR";
// Action Creators
const getCustomizedItemsAction = (cusItems) => {
  return {
    type: GET_CUS_ITEMS,
    cusItems,
  };
};

const createCustomizedItemAction = (cusItem) => {
  return {
    type: CREATE_CUS_ITEM,
    cusItem,
  };
};

const editCustomizedItemAction = (cusItem) => {
  return {
    type: EDIT_CUS_ITEM,
    cusItem,
  };
};

const deleteCustomizedItemAction = (cusItemId) => {
  return {
    type: DELETE_CUS_ITEM,
    cusItemId,
  };
};

const clearAllCustomizedItems = () => {
  return {
    type: CLEAR_ALL_CUS_ITEMS,
  };
};
// Thunks

export const getAllCustomizedItems = () => async (dispatch) => {
  const res = await fetch("/api/customized_items");

  if (res.ok) {
    const customizedItems = await res.json();
    const data = await dispatch(
      getCustomizedItemsAction(customizedItems.customized_items)
    );
    return data;
  }
};

export const createCustomizedItem =
  (user_id, item_id, name) => async (dispatch) => {
    // if (!itemData.imageUrl) itemData.imageUrl = "https://media.istockphoto.com/photos/scattered-crumbs-of-butter-cookies-on-white-background-picture-id1222390473?k=20&m=1222390473&s=612x612&w=0&h=6UXsl_v8Kp2aG6ykg3l4lSHjoB4biCndCx2OVIiHNSQ="
    const reqBody = { user_id, item_id, name: name.trim() };
    const res = await fetch(`/api/customized_items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });
    if (res.ok) {
      const customizedItem = await res.json();
      const data = await dispatch(createCustomizedItemAction(customizedItem));
      return customizedItem["customized_item"];
    }
  };

export const editCustomizedItem =
  (customizedItemId, item_id, name) => async (dispatch) => {
    const reqBody = { item_id, name: name.trim() };
    const res = await fetch(`/api/customized_items/${customizedItemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });

    if (res.ok) {
      const customizedItem = await res.json();
      const data = await dispatch(editCustomizedItemAction(customizedItem));
      return data;
    }
  };

export const deleteCustomizedItem = (customizedItemId) => async (dispatch) => {
  const res = await fetch(`/api/customized_items/${customizedItemId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const customizedItem = `${customizedItemId}`;
    dispatch(deleteCustomizedItemAction(customizedItem));
    return true;
  }
  return false;
};
export const clearAllCustomizedItemsThunk = () => async (dispatch) => {
  dispatch(clearAllCustomizedItems());
};
const initialState = {};

// Reducer
export default function customizedItemsReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_CUS_ITEMS:
      newState = {};
      action.cusItems.forEach((cusItem) => (newState[cusItem.id] = cusItem));
      //array of all customized items (including the newly create one)
      return newState;
    case CREATE_CUS_ITEM:
      //object of 1 newly created customized item
      newState[action.cusItem.id] = action.cusItem;
      return newState;
    case EDIT_CUS_ITEM:
      newState[action.cusItem.id] = action.cusItem;
      return newState;
    case DELETE_CUS_ITEM:
      delete newState[action.cusItemId];
      return newState;
    case CLEAR_ALL_CUS_ITEMS:
      newState = {};
      return newState;
    default:
      return state;
  }
}
