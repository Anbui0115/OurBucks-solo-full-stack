import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import styles from "../AddToCart/AddToCart.module.css"
import { createOrder, addToOrderThunk } from "../../store/orders";

export default function AddToOrder({ el }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log("this is el in Add to order!!!!!!!", el, typeof el);
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
  async function handleAddToOrder(e, el) {
    e.preventDefault();
    //   item_id,customized_item_id, order_id, quantity, onHandleAddToOrderSuccess;

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
    <div>
      <button
        //   className={styles.addToCartButton}
        onClick={(e) => handleAddToOrder(e, el)}
      >
        Add To Order
      </button>
    </div>
  );
}
