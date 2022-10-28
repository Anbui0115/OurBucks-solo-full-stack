import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderItems, deleteOrderItem } from "../../store/order_items";
import { useHistory } from "react-router-dom";
import { getAllItems } from "../../store/items";

const EachOrderItem = ({ eachOrderItem }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => [dispatch(getAllItems())], [dispatch]);

  const [quantity, setQuantity] = useState(eachOrderItem.quantity);

  //   console.log("each order item ``````````````````", eachOrderItem);

  function handleRemove(orderItemId) {
    dispatch(deleteOrderItem(orderItemId)).catch(async (res) => {});
  }
  function handleItemCount(count) {
    if (parseInt(count) < 1 || isNaN(parseInt(count))) {
      count = 1;
      alert("Quantity should be greater than 0");
    }
  }
  const allItems = useSelector((state) => state.items);
  const thisItem = allItems.filter((item) => item.id === +eachOrderItem.itemId);
//   console.log("THIS ITEM !!!!!!!!!!!!!!", thisItem);
  let itemImg;
  if (thisItem.length >0 ) {
    itemImg = thisItem[0].image_url;
    // console.log("---------------", itemImg);
  }

  return (
    <div>
      <div>
        <img src={itemImg} width="100" height="100"></img>
      </div>
      <div>Order Id{eachOrderItem.orderId}</div>
      {eachOrderItem.customized_item_id && (
        <div>Customized item id{eachOrderItem.customized_item_id}</div>
      )}
      {eachOrderItem.itemId && <div>Item id{eachOrderItem.itemId}</div>}

      <div>Quantity{eachOrderItem.quantity}</div>

      <div>-----------</div>
    </div>
  );
};
export default EachOrderItem;
