import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
// import { addToOrderThunk} from "../../store/orders"
// import styles from "../AddToCart/AddToCart.module.css"



export default function AddToOrder({ el }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function onHandleAddToCartSuccess() {
    history.push("/order");
  }
  async function handleAddToOrder(e,el) {
      e.preventDefault();
    //   orderItemId, order_id, quantity, onHandleAddToOrderSuccess;
    // //how do we find order_id?
    // await dispatch(addToOrderThunk(el, 1, onHandleAddToCartSuccess));
  }
  return (
    <div>
      <button
    //   className={styles.addToCartButton}
      onClick={e =>handleAddToOrder(e,el)}>
        Add To Order
      </button>
    </div>
  );
}
