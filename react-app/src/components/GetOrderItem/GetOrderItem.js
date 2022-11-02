import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, Link } from "react-router-dom";
import styles from "./OrderItem.module.css";
// import {
//   editOrderThunk,
//   getOrderItemsThunk,
//   removeOrderItemsThunk,
// } from "../../store/session";
import {
  getOrderItems,
  deleteOrderItem,
  editOrderItem,
} from "../../store/order_items";

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
  // console.log("ORDER ITEM INSIDE GET ORDER ITEM----------------", orderItems);

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
          <div>
            Quantity:
            {editMode && (
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                required
              />
            )}
            {!editMode && orderItems[order_item_id].quantity}
          </div>
          <div>Price: ${orderItems[order_item_id].price}</div>
          {!editMode && (
            <button
              onClick={(e) => enableEdit(e, orderItems[order_item_id].quantity)}
            >
              Edit
            </button>
          )}
          {editMode && (
            <button onClick={(e) => handleEdit(e, orderItems[order_item_id])}>
              Confirm Edit
            </button>
          )}
          <button onClick={(e) => handleRemove(e, order_item_id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
