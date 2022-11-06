import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, Link } from "react-router-dom";
import styles from "./OrderItem.module.css";
import {
  getOrderItems,
  deleteOrderItem,
  editOrderItem,
} from "../../store/order_items";
import EachOrderItem from "../EachOrderItem/EachOrderItem";

export default function GetOrderItems({ currentOrder_id }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [editMode, setEditMode] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getOrderItems(currentOrder_id));
  }, [dispatch]);

  const orderItems = useSelector((state) => state.order_items);

  if (!orderItems) return null;
  if (!sessionUser) return <Redirect to="/" />;
  function handleRemove(e, order_item_id) {
    e.preventDefault();
    dispatch(deleteOrderItem(order_item_id)).catch(async (res) => {});
  }

  function enableEdit(e, quantity) {
    e.preventDefault();
    setQuantity(quantity);
    setEditMode(true);
  }

  function handleEdit(e, order_item) {
    e.preventDefault();
    setEditMode(false);
    let item_id;
    let customized_item_id;

    if (order_item.itemId) item_id = order_item.itemId;
    if (order_item.customized_item_id)
      customized_item_id = order_item.customized_item_id;
    // order_item_id, item_id, customized_item_id, quantity;
    dispatch(
      editOrderItem(order_item.id, item_id, customized_item_id, quantity)
    );
  }

  return (
    <div>
      {Object.keys(orderItems).map((order_item_id) =>
        //
        {
          let allOrderItems = [];
          for (let i = 1; i <= orderItems[order_item_id].quantity; i++) {
            allOrderItems.push(
              <EachOrderItem
                order_item_id={order_item_id}
                currentOrder_id={currentOrder_id}
              />
            );
          }
          return allOrderItems;
        }
      )}
      {Object.keys(orderItems).length < 1 && (
        <div className={styles.empty_order}> Your order is empty</div>
      )}
    </div>
  );
}
