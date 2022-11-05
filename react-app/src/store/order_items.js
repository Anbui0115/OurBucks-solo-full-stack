// Types

const GET_ORDER_ITEMS = "order_items/GET_ORDER_ITEMS";
const CREATE_ORDER_ITEM = "order_items/CREATE_ORDER_ITEM";
const EDIT_ORDER_ITEM = "order_items/EDIT_ORDER_ITEM";
const DELETE_ORDER_ITEM = "order_items/DELETE_ORDER_ITEM";
const CLEAR_ALL_ORDER_ITEMS = "order_items/CLEAR_ALL";
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

const clearAllOrderItemsAction = () => {
  return {
    type: CLEAR_ALL_ORDER_ITEMS,
  };
};
// Thunks
export const getOrderItems = (orderId) => async (dispatch) => {
  const res = await fetch(`/api/order_items/order/${orderId}`);

  if (res.ok) {
    const orderItems = await res.json();
    const data = await dispatch(getOrderItemAction(orderItems.order_items));
    console.log("DATA INSIDE GET ORDER ITEM THUNK------------", orderItems);
    return data;
  }
};

export const addOrderItemToOrder =
  (orderItemData, orderId) => async (dispatch) => {
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

export const editOrderItem =
  (order_item_id, item_id, customized_item_id, quantity) =>
  async (dispatch) => {
    const bodyJSON = { item_id, customized_item_id, quantity };
    console.log(bodyJSON);
    const res = await fetch(`/api/order_items/${order_item_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyJSON),
    });

    if (res.ok) {
      const orderItem = await res.json();
      dispatch(editOrderItemAction(orderItem["order_item"]));
      return orderItem;
    } else {
      console.log(res.text());
      return res.text();
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

export const clearAllOrderItemsThunk = () => async (dispatch) => {
  dispatch(clearAllOrderItemsAction());
};

const initialState = {};

// Reducer
export default function order_itemsReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ORDER_ITEMS:
      newState = {};
      action.order_items.forEach(
        (order_item) => (newState[order_item.id] = order_item)
      );
      return newState;
    case CREATE_ORDER_ITEM:
      newState[action.order_item.id] = action.order_item;
      return newState;
    case EDIT_ORDER_ITEM:
      // console.log(action.order_item);
      newState[action.order_item.id] = action.order_item;
      return newState;
    case DELETE_ORDER_ITEM:
      delete newState[action.order_itemId];
      return newState;
    case CLEAR_ALL_ORDER_ITEMS:
      newState = {};
      return newState;
    default:
      return state;
  }
}
