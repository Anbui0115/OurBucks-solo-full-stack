// Types

const GET_CURRENT_ORDERS = "orders/GET_ITEMS";
const CREATE_ORDER = "orders/CREATE_ITEM";
// const EDIT_ORDER = "orders/EDIT_ITEM";
const DELETE_ORDER = "orders/DELETE_ITEM";

// Action Creators
const getCurrentOrderAction = (order) => {
  return {
    type: GET_CURRENT_ORDERS,
    order,
  };
};

const createOrderAction = (order) => {
  return {
    type: CREATE_ORDER,
    order,
  };
};

// const editOrderAction = (order) => {
//   return {
//     type: EDIT_ITEM,
//     order,
//   };
// };

export const deleteOrderAction = (orderId) => {
  return {
    type: DELETE_ORDER,
    orderId,
  };
};

// Thunks
export const getCurrentOrders = () => async (dispatch) => {
  const res = await fetch("/api/orders");

  if (res.ok) {
    const currentOrder = await res.json();
    const data = await dispatch(getCurrentOrderAction(currentOrder.order));
    // console.log("DATA INSIDE GET CUURENT ORDER THUNK------------", data);
    return data;
  }
};

export const createOrder = (orderData) => async (dispatch) => {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (res.ok) {
    const item = await res.json();
    const data = await dispatch(createOrderAction(item));
    return data;
  }
};

//we don't edit Order - we edit order items
// export const editOrder = (orderId, editOrderData) => async (dispatch) => {
//   const res = await fetch(`/api/items/${itemId}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(editItemData),
//   });

//   if (res.ok) {
//     const item = await res.json();
//     dispatch(editItemAction(item));
//     return item;
//   }
// };

export const deleteOrder = (orderId) => async (dispatch) => {
  const res = await fetch(`/api/orders/${orderId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const order = `${orderId}`;
    await dispatch(deleteOrderAction(order));
  }
};

const initialState = {};

// Reducer
export default function ordersReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_CURRENT_ORDERS:
      //   console.log('TEST~~~~~~~~~~',action)
      newState["order"] = action.order;
      // console.log("TEST NEW STATE~~~~~~~~~~~~~~~~~~~", newState);
      return newState;
    case CREATE_ORDER:
      newState[action.order.id] = action.order;
      return newState;
    // case EDIT_ITEM:
    //   newState[action.item.id] = action.item;
    //   return newState;
    case DELETE_ORDER:
      delete newState[action.orderId];
      return newState;
    default:
      return state;
  }
}
