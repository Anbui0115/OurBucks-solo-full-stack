import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import styles from "../AddToCart/AddToCart.module.css";
import { createOrder, addToOrderThunk } from "../../store/orders";

export default function AddToOrder({ el }) {
  const dispatch = useDispatch();
  const history = useHistory();

  let item_id = undefined;
  let customized_item_id = undefined;
  if (typeof el === "number") {
    item_id = el;
  } else {
    customized_item_id = el;
  }
  function onHandleAddToCartSuccess() {
    history.push("/order");
  }

  async function handleAddToOrder(e) {
    e.preventDefault();

    const order = await dispatch(createOrder());
    await dispatch(
      addToOrderThunk(
        item_id,
        customized_item_id,
        order.order.id,
        1,
        onHandleAddToCartSuccess
      )
    );
  }
  return (

      <div className={styles.addToCartButton_wrapper}>
        <div
          className={styles.addToCartButton}
          onClick={(e) => handleAddToOrder(e)}
        >
          Add To Order
        </div>
      </div>

  );
}
