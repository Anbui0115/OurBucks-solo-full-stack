import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./OrderItem.module.css";
// import {
//   editOrderThunk,
//   getOrderItemsThunk,
//   removeOrderItemsThunk,
// } from "../../store/session";
import { getOrderItems, deleteOrderItem } from "../../store/order_items";
import { useHistory } from "react-router-dom";
import EachOrderItem from "../EachOrderItemCard/EachOrderItemCard";

export default function GetOrderItems({ currentOrder_id }) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOrderItems(currentOrder_id));
  }, [dispatch]);

  const orderItems = useSelector((state) => state.order_items)["order_items"];
//   console.log("ORDER ITEM INSIDE GET ORDER ITEM----------------", orderItems);

  if (!orderItems) return null;

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
      {orderItems.map((eachOrderItem) => (
        // <div>
        //   {console.log("each order item ``````````````````", eachOrderItem)}
        //   <div>Order Id{eachOrderItem.orderId}</div>
        //   <div>Customized item id{eachOrderItem.customized_item_id}</div>
        //   <div>Item id{eachOrderItem.itemId}</div>
        //   <div>Quantity{eachOrderItem.quantity}</div>
        // </div>
        <EachOrderItem eachOrderItem={(eachOrderItem)}/>
      ))}
    </div>
  );
}
