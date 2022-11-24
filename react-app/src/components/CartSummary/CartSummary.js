import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPurchaseThunk } from "../../store/session";
import styles from "../CartSummary/CartSummary.module.css";

export default function CartSummary({ shoppingCart }) {
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("shoppingCart", shoppingCart);
  const formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  const dollarFormmatter = new Intl.NumberFormat("en-US", formatting_options);
  function handleCheckout() {
    // dispatch(addPurchaseThunk()).then((res) => {
    //     history.push("/purchases-and-reviews")
    // });
  }
  return (
    <div className={styles.cart}>
      <div className={styles}>
        <div>
          <div>
            <div className={styles.subtotal}>
              Subtotal
              <span className={styles.price}>
                {dollarFormmatter.format(
                  Object.values(shoppingCart).reduce(
                    (accum, el) => el.quantity * el.price + accum,
                    0
                  )
                )}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.total}>
            Total
            <span>
              {dollarFormmatter.format(
                Object.values(shoppingCart).reduce(
                  (accum, el) => el.quantity * el.price + accum,
                  0
                )
              )}
            </span>
          </div>
        </div>
        <div>
          {/* <button className={styles.proceedButton} onClick={handleCheckout}>Checkout</button> */}
        </div>
      </div>
    </div>
  );
}
