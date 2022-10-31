// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const GET_ALL_ORDERS = "orders/GET_ALL_ORDERS";
const SET_ORDER = "order/setOrderItems";
const REMOVE_ORDER_ITEM = "order/removeOrderItem";
const UPDATE_ORDER_ITEM = "order/addOrderItem";
const CLEAR_ORDER = "order/clearOrder";

// Action Creators
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setOrder = (orderItem) => {
  return {
    type: SET_ORDER,
    payload: orderItem,
  };
};

const removeOrderItem = (orderItemId) => ({
  type: REMOVE_ORDER_ITEM,
  payload: orderItemId,
});

const updateOrderItem = (orderItemId) => ({
  type: UPDATE_ORDER_ITEM,
  payload: orderItemId,
});

const clearOrder = () => ({
  type: CLEAR_ORDER,
});

// Thunks

export const submitOrderThunk = (orderId) => async (dispatch) => {
  const response = await fetch(`/api/orders/${orderId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) return data.errors;
    dispatch(clearOrder());
    return data;
  }
};


export const editOrderThunk = (orderItemId, quantity) => async (dispatch) => {
  const response = await fetch(`/api/order_items${orderItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(updateOrderItem(data));
    return response;
  }
};

export const getOrderItemsThunk = (orderId) => async (dispatch) => {
  const response = await fetch(`/api/order_items/order/${orderId}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(setOrder(data));
    return response;
  }
};

export const removeOrderItemsThunk = (orderItemId) => async (dispatch) => {
  const response = await fetch(`/api/order_items/${orderItemId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(removeOrderItem(orderItemId));
    return response;
  }
};

// const getAllOrders = (orders) => {
//   return {
//     type: GET_ALL_ORDERS,
//     orders,
//   };
// };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// export const getAllOrders = () => async (dispatch) => {
//   const res = await fetch(`/api/orders`);

//   if (res.ok) {
//     const purchases = await res.json();
//     dispatch(getAllOrders(purchases));
//   }
// };

// export const search = (terms) => async (dispatch) => {
//   const res = await fetch("/api/search", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       q: terms,
//     }),
//   });

//   if (res.ok) {
//     const results = await res.json();
//     return results;
//   }
// };

const initialState = { user: null };

//Reducer
export default function reducer(state = initialState, action) {
  const newState = { ...state };

  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    // case GET_ALL_ORDERS:
    //   newState["orders"] = action.orders.orders;
    //   return newState;
    case SET_ORDER:
      newState.orderItem = action.payload.orderItem;
      return newState;
    case UPDATE_ORDER_ITEM:
      newState.order = [...newState.order];
      let orderItem = newState.orderItem.find(
        (i) => i.orderItemId === action.payload.orderItemId
      );
      orderItem.quantity = action.payload.quantity;
      return newState;
    case REMOVE_ORDER_ITEM:
      let order = newState.order.filter(
        (i) => i.orderItemId !== action.payload
      );
      return { ...state, order };
    case CLEAR_ORDER:
      return { ...state, order: null };

    default:
      return state;
  }
}
