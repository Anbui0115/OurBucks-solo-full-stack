// Types

const GET_ORDER_ITEMS = "orders/GET_ORDER_ITEMS";
const CREATE_ORDER_ITEM = "orders/CREATE_ORDER_ITEM";
const EDIT_ORDER_ITEM = "orders/EDIT_ORDER_ITEM";
const DELETE_ORDER_ITEM= "orders/DELETE_ORDER_ITEM";

// Action Creators
const getOrderItemAction = (order_items) => {
  return {
    type: GET_ORDER_ITEMS,
    order_items,
  };
};

const createOrderItemAction = (order_item) => {
  return {
    type: CREATE_ORDER_ITEM,
    order_item,
  };
};

const editOrderItemAction = (order_item) => {
  return {
    type: EDIT_ORDER_ITEM,
    order_item,
  };
};

export const deleteOrderItemAction = (order_itemId) => {
  return {
    type: DELETE_ORDER_ITEM,
    order_itemId,
  };
};

// Thunks
export const getOrderItems = (orderId) => async (dispatch) => {
  const res = await fetch(`/api/order_items/order/${orderId}`);

  if (res.ok) {
    const orderItems = await res.json();
    const data = await dispatch(getOrderItemAction(orderItems.order_items));
    // console.log("DATA INSIDE GET ORDER ITEM THUNK------------", data);
    return data;
  }
};

export const addOrderItemToOrder = (orderItemData, orderId) => async (dispatch) => {
  const res = await fetch(`/api/order_items/order/${orderId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderItemData),
  });
  if (res.ok) {
    const orderItem = await res.json();
    const data = await dispatch(createOrderItemAction(orderItem));
    return data;
  }
};


export const editOrderItem = (order_itemId, editOrderItemData) => async (dispatch) => {
  const res = await fetch(`/api/order_items/${order_itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editOrderItemData),
  });

  if (res.ok) {
    const orderItem = await res.json();
    dispatch(editOrderItemAction(orderItem));
    return orderItem;
  }
};

export const deleteOrderItem = (order_itemId) => async (dispatch) => {
  const res = await fetch(`/api/order_items/${order_itemId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const orderItem = `${order_itemId}`;
    await dispatch(deleteOrderItemAction(order_itemId));
  }
};

const initialState = {};

// Reducer
export default function order_itemsReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ORDER_ITEMS:
        // console.log('TEST~~~~~~~~~~',action)
      newState["order_items"] = action.order_items;
      // console.log("TEST NEW STATE~~~~~~~~~~~~~~~~~~~", newState);
      return newState;
    case CREATE_ORDER_ITEM:
      newState[action.order_item.id] = action.order_item;
      return newState;
    case EDIT_ORDER_ITEM:
      newState[action.order_item.id] = action.order_item;
      return newState;
    case DELETE_ORDER_ITEM:
      delete newState[action.order_itemId];
      return newState;
    default:
      return state;
  }
}
