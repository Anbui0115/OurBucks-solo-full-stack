import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, Link } from "react-router-dom";
import styles from "./EachOrderItem.module.css";

import {
  getOrderItems,
  deleteOrderItem,
  editOrderItem,
} from "../../store/order_items";

const EachOrderItem = ({ order_item_id, currentOrder_id }) => {
  const formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  const dollarFormmatter = new Intl.NumberFormat("en-US", formatting_options);
  
  const dispatch = useDispatch();
  const history = useHistory();

  // console.log("hi");

  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getOrderItems(currentOrder_id));
  }, [dispatch]);

  const orderItems = useSelector((state) => state.order_items);

  if (!orderItems) return null;
  if (!sessionUser) return <Redirect to="/" />;

  function handleEdit(e, order_item, new_quantity) {
    e.preventDefault();
    let item_id;
    let customized_item_id;

    if (order_item.itemId) item_id = order_item.itemId;
    if (order_item.customized_item_id)
      customized_item_id = order_item.customized_item_id;
    // order_item_id, item_id, customized_item_id, quantity;
    if (new_quantity > 0) {
      dispatch(
        editOrderItem(order_item.id, item_id, customized_item_id, new_quantity)
      );
    } else {
      dispatch(deleteOrderItem(order_item.id));
    }
  }

  return (
    <div className={styles.each_order_item_container}>
      <div className={styles.order_item_main_info}>
        <div className={styles.order_item_image_container}>
          <img
            src={orderItems[order_item_id].image_url}
            className={styles.order_item_image}
          ></img>
        </div>
        <h3 className={styles.order_item_name}>
          {orderItems[order_item_id].name}
        </h3>
        <div className={styles.order_item_price}>
          {dollarFormmatter.format(orderItems[order_item_id].price)}
        </div>
      </div>
      <div className={styles.order_item_actions_container}>
        <div className={styles.order_item_edit_buttons}>
          <button
            className={styles.order_item_button}
            onClick={(e) =>
              handleEdit(
                e,
                orderItems[order_item_id],
                orderItems[order_item_id].quantity - 1
              )
            }
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
              <path d="M7.58 12.75h9.266c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H7.58c-.414 0-.75.336-.75.75s.336.75.75.75z"></path>
            </svg>
          </button>
          <button
            className={styles.order_item_button}
            onClick={(e) =>
              handleEdit(
                e,
                orderItems[order_item_id],
                orderItems[order_item_id].quantity + 1
              )
            }
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
              <path d="M11.214 11.25V7.366c0-.434.352-.786.786-.786.434 0 .786.352.786.786v3.884h3.86c.414 0 .75.336.75.75s-.336.75-.75.75h-3.86v3.882c0 .434-.352.786-.786.786-.434 0-.786-.352-.786-.786V12.75H7.38c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.834z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EachOrderItem;
