// Types

const GET_CURRENT_ORDERS = "orders/GET_ITEMS";
const CREATE_ORDER = "orders/CREATE_ITEM";
const CLEAR_ALL_ORDERS = "orders/CLEAR_ALL";
// const EDIT_ORDER = "orders/EDIT_ITEM";
const SUBMIT_ORDER = "order/SUBMIT_ORDER";

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

const clearAllOrdersAction = () => {
  return {
    type: CLEAR_ALL_ORDERS,
  };
};
// const editOrderAction = (order) => {
//   return {
//     type: EDIT_ITEM,
//     order,
//   };
// };

export const submitOrderAction = (orderId) => {
  return {
    type: SUBMIT_ORDER,
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

export const createOrder = () => async (dispatch) => {
  const res = await fetch("/api/orders", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    const item = await res.json();
    const data = await dispatch(createOrderAction(item));
    return item;
  }
};
export const clearAllOrdersThunk = () => async (dispatch) => {
  dispatch(clearAllOrdersAction());
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

export const submitOrderThunk = (orderId) => async (dispatch) => {
  console.log("inside submitorderThunk!~~~~~~~~~~~~~~~~~~~~~~~", orderId);

  // const body = JSON.stringify({ orderId });

  const res = await fetch(`/api/orders/${orderId}`, {
    // method: "DELETE",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: body,
  });

  if (res.ok) {
    const data = await res.json();
    if (data.errors) return data.errors;
    // const orderId = `${orderId}`;
    await dispatch(submitOrderAction(`${orderId}`));
    return data;
  }
};

export const addToOrderThunk =
  (
    item_id,
    customized_item_id,
    order_id,
    quantity,
    onHandleAddToOrderSuccess
  ) =>
  async (dispatch) => {
    const body = JSON.stringify({
      item_id,
      customized_item_id,
      quantity,
    });
    const response = await fetch(`/api/order_items/order/${order_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (response.ok) {
      const data = await response.json();
      // console.log("data inside add to Order Thunk'''''''''''''''", data);
      if (data.errors) {
        return data.errors;
      }
      // await dispatch(updateCartItem(data));
      onHandleAddToOrderSuccess();
      return response;
    } else {
      // console.log(response.text());
    }
  };

const initialState = {};

// Reducer
export default function ordersReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_CURRENT_ORDERS:
      //   console.log('TEST~~~~~~~~~~',action)
      newState[action.order.id] = action.order;
      // console.log("TEST NEW STATE~~~~~~~~~~~~~~~~~~~", newState);
      return newState;
    case CREATE_ORDER:
      newState[action.order.order.id] = action.order.order;
      return newState;
    case CLEAR_ALL_ORDERS:
      newState = {};
      return newState;
    // case EDIT_ITEM:
    //   newState[action.item.id] = action.item;
    //   return newState;
    case SUBMIT_ORDER:
      // delete newState[action.orderId];
      // return newState;
      console.log("TEST action in store ~~~~~~~~~~", action);
    // newState[action.order.order.id] = action.order.orderId;
    // return newState;
    default:
      return state;
  }
}
