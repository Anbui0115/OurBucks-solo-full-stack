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

export default function GetOrderItems({ currentOrder_id }) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOrderItems(currentOrder_id));
  }, [dispatch]);
  const orderItems = useSelector((state) => state.order_items)["order_items"];
  // const [quantity, setQuantity] = useState(item.quantity);

  console.log("ORDER ITEM INSIDE GET ORDER ITEM----------------", orderItems);
  const formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };
  const dollarFormmatter = new Intl.NumberFormat("en-US", formatting_options);

  function handleRemove(orderItemId) {
    dispatch(deleteOrderItem(orderItemId)).catch(async (res) => {});
  }
  function handleItemCount(count) {
    if (parseInt(count) < 1 || isNaN(parseInt(count))) {
      count = 1;
      alert("Quantity should be greater than 0");
    }
    // setQuantity(count)
    // dispatch(editOrderThunk(item.id, count)).catch(async (res) => {});
  }
  // if (!item) return null
  return (
    // <div className={styles.itemCard}>
    //     <div className={styles.shoppingImageContainer}><img src={item.item.images[0].image_url} className={styles.image} onClick={()=> history.push(`/items/${item.item.id}`)}></img></div>

    //     <div className={styles.descDiv}>
    //         <div className={styles.descText} onClick={()=> history.push(`/items/${item.item.id}`)}>{item.item.title}</div>
    //         <div className={styles.remove} key={item.id} value={item.id} onClick={()=>{handleRemove(item.id)}}><b>Remove</b></div>

    //     </div>

    //     <form>
    //         <input type="number" min="1" value={item.quantity} className={styles.itemCount} onChange={(e)=> handleItemCount(e.target.value)} />
    //     </form>

    //     <div className={styles.price}>
    //         <div ><b> {dollarFormmatter.format(item.quantity * item.item.price)}</b></div>
    //         <div>({dollarFormmatter.format(item.item.price)}&nbsp;each)</div>
    //     </div>

    // </div>
    <div>TEST</div>
  );
}
