import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import styles from "../AddToCart/AddToCart.module.css"
import { createOrder, addToOrderThunk } from "../../store/orders";

export default function AddToOrder({ el }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function onHandleAddToCartSuccess() {
    history.push("/order");
  }
  async function handleAddToOrder(e, el) {
    e.preventDefault();
    //   orderItemId, order_id, quantity, onHandleAddToOrderSuccess;
    // //how do we find order_id?
    const order = await dispatch(createOrder());
    await dispatch(
      addToOrderThunk(el, order.order.id, 1, onHandleAddToCartSuccess)
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
