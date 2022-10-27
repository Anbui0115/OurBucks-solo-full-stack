// Types

const GET_CUS_ITEMS = "customized-items/GET_ITEMS";
const CREATE_CUS_ITEM = "customized-items/CREATE_ITEM";
const EDIT_CUS_ITEM = "customized-items/EDIT_ITEM";
const DELETE_CUS_ITEM = "customized-items/DELETE_ITEM";

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

export const deleteCustomizedItemAction = (cusItemId) => {
  return {
    type: DELETE_CUS_ITEM,
    cusItemId,
  };
};

// Thunks
export const getAllCustomizedItems =
  () =>
  async (dispatch) => {
    const res = await fetch('/app/:userId/customized');

    if (res.ok) {
      const customizedItems = await res.json();
      const data = await dispatch(
        getCustomizedItemsAction(customizedItems.items)
      );
      return data;

    }
  };

export const createCustomizedItem = (customizedItemData) => async (dispatch) => {
  // if (!itemData.imageUrl) itemData.imageUrl = "https://media.istockphoto.com/photos/scattered-crumbs-of-butter-cookies-on-white-background-picture-id1222390473?k=20&m=1222390473&s=612x612&w=0&h=6UXsl_v8Kp2aG6ykg3l4lSHjoB4biCndCx2OVIiHNSQ="
  const res = await fetch(`/api/items/:itemId/customize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customizedItemData),
  });
  if (res.ok) {
    const customizedItem = await res.json();
    const data = await dispatch(createCustomizedItemAction(customizedItem));
    return data;
  }
};

export const editCustomizedItem =
  (customizedItemId, editCustomizedItemData) => async (dispatch) => {
    const res = await fetch(`/api/items/${customizedItemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editCustomizedItemData),
    });

    if (res.ok) {
      const customizedItem = await res.json();
      const data = await dispatch(editCustomizedItemAction(customizedItem));
      return data;
    }
  };

export const deleteCustomizedItem = (customizedItemId) => async (dispatch) => {
  const res = await fetch(`/api/items/${customizedItemId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const customizedItem = `${customizedItemId}`;
    await dispatch(deleteCustomizedItemAction(customizedItem));
  }
};

const initialState = {};

// Reducer
export default function itemsReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_CUS_ITEMS:
      newState = {};
      action.cusItems.forEach(
        (cusItem) => (newState[cusItem.id] = cusItem)
      );
      return newState;
    case CREATE_CUS_ITEM:
      newState[action.cusItem.id] = action.cusItem;
      return newState;
    case EDIT_CUS_ITEM:
      newState[action.cusItem.id] = action.cusItem;
      return newState;
    case DELETE_CUS_ITEM:
      delete newState[action.cusItemId];
      return newState;
    default:
      return state;
  }
}
