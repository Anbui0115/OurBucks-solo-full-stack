import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

import { getCurrentOrders } from "../../store/orders";
import GetOrderItems from "../GetOrderItem/GetOrderItem";
import styles from "./GetCurrentOrder.module.css";

const GetCurrentOrder = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentOrders());
  }, [dispatch]);

  const currentOrder = Object.values(useSelector((state) => state.orders)).find(
    (el) => el.status === "not placed"
  );

  // console.log("CURRENT ORDER---------------", currentOrder);
  if (!currentOrder) return null;
  return (
    <div className={styles.order_container}>
      <div className={styles.review_order_container}>
        <div className={styles.review_order_header}>
          <h1>Review Order</h1>
        </div>

        <div className={styles.order_item_container}>
          <GetOrderItems currentOrder_id={currentOrder.id} />
        </div>
        <div>Total</div>
        <div className={styles.checkout}>
          <button className={styles.checkout_button}>Checkout</button>
        </div>
      </div>
    </div>
  );
};
export default GetCurrentOrder;
