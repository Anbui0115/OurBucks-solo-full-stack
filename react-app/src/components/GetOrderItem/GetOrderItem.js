import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import styles from "./OrderItem.module.css";
// import {
//   editOrderThunk,
//   getOrderItemsThunk,
//   removeOrderItemsThunk,
// } from "../../store/session";
import { getOrderItems, deleteOrderItem } from "../../store/order_items";

export default function GetOrderItems({ currentOrder_id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getOrderItems(currentOrder_id));
  }, [dispatch]);

  const orderItems = useSelector((state) => state.order_items);
  console.log("ORDER ITEM INSIDE GET ORDER ITEM----------------", orderItems);

  if (!orderItems) return null;
  if (!sessionUser) return <Redirect to="/" />;
  function handleRemove(orderItemId) {
    dispatch(deleteOrderItem(orderItemId)).catch(async (res) => {});
  }
  function handleItemCount(count) {
    if (parseInt(count) < 1 || isNaN(parseInt(count))) {
      count = 1;
      alert("Quantity should be greater than 0");
    }
  }

  return (
    <div>
      {Object.keys(orderItems).map((order_item_id) => (
        <div>
          <div>
            <img
              src={orderItems[order_item_id].image_url}
              width="100"
              height="100"
            ></img>
          </div>
          <div>Name: {orderItems[order_item_id].name}</div>
          <div>Quantity: {orderItems[order_item_id].quantity}</div>
          <div>Price: ${orderItems[order_item_id].price}</div>
        </div>
      ))}
    </div>
  );
}
