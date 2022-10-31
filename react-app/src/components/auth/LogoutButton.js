import React from "react";
import { useDispatch } from "react-redux";
import { clearAllCustomizedItemsThunk } from "../../store/customizedItem";
import { clearAllOrdersThunk } from "../../store/orders";
import { clearAllOrderItemsThunk } from "../../store/order_items";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearAllCustomizedItemsThunk());
    await dispatch(clearAllOrdersThunk());
    await dispatch(clearAllOrderItemsThunk());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
