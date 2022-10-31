import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

import { getCurrentOrders } from "../../store/orders";
import GetOrderItems from "../GetOrderItem/GetOrderItem";

const GetCurrentOrder = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentOrders());
  }, [dispatch]);

  const currentOrder = Object.values(useSelector((state) => state.order)).find(
    (el) => el.status === "not placed"
  );

  // console.log("CURRENT ORDER---------------", currentOrder);
  if (!currentOrder) return null;
  return (
    <>
      <h1>here's current Order</h1>
      <div>currentOrder.id: {currentOrder.id}</div>
      <div>currentOrder.status: {currentOrder.status}</div>
      <div>currentOrder.userId: {currentOrder.user_id}</div>
      <div>order item inside your order:</div>
      <GetOrderItems currentOrder_id={currentOrder.id} />
    </>
  );
};
export default GetCurrentOrder;
