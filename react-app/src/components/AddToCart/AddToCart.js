import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { addToOrderThunk} from "../../store/session"
import styles from "../AddToCart/AddToCart.module.css"
export default function AddToOrder({item}){
    const dispatch = useDispatch()
    const history = useHistory()

    function onHandleAddToCartSuccess(){
        history.push("/order");
    }

    async function handleAddToOrder(){

        await dispatch(addToOrderThunk(item, 1, onHandleAddToCartSuccess));

    }
    return (
        <div>
            <button className={styles.addToCartButton} onClick={handleAddToCart}>Add To Cart</button>
        </div>
    )
}
