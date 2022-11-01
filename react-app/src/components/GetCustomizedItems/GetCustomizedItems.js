import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useHistory, Redirect } from "react-router-dom";
import {
  getAllCustomizedItems,
  deleteCustomizedItem,
  editCustomizedItem,
} from "../../store/customizedItem";
import AddToCart from "../AddToCart/AddToCart";
import { getAllItems } from "../../store/items";
import GetCustomizedSelections from "../GetCustomizedSelections/GetCustomizedSelections";

// import "./GetCustomizedItems.css";

const GetCustomizedItems = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [requestData, setRequestData] = useState(new Date());
  const [editMode, setEditMode] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);
  const customizedItems = useSelector((state) => state.customized_items);
  console.log("CUSTOMIZED ITEMS----------------", customizedItems);

  useEffect(() => {
    dispatch(getAllCustomizedItems());
  }, [requestData, dispatch]);
  //check for array of items || check for object of newly created item
  if (!customizedItems || Object.keys(customizedItems).length < 1) return null;
  if (!sessionUser) return <Redirect to="/" />;

  const onClickDelete = async (e, customizedItemId) => {
    e.preventDefault();
    await dispatch(deleteCustomizedItem(customizedItemId));

    setRequestData(new Date());
  };
  function enableEdit(e) {
    e.preventDefault();

    setEditMode(true);
    // dispatch(editOrderItem(order_item_id)).catch(async (res) => {});
  }

  function handleEdit(e) {
    e.preventDefault();
    setEditMode(false);
    // dispatch(editOrderItem(order_item.id, order_item.itemId, quantity)).catch(
    //   async (res) => {}
    // );
  }

  return (
    <div>
      {customizedItems &&
        Object.keys(customizedItems).map((el) => (
          <div key={`el.${customizedItems[el].id}`}>
            {console.log("TEST!!!!!!!!!!!!",[el])}
            <div>
              <img
                src={customizedItems[el].image_url}
                width="100"
                height="100"
              ></img>
            </div>
            <div>Name: {customizedItems[el].name}</div>
            <GetCustomizedSelections
              customized_item_id={el}
              editMode={editMode}
            />
            <button onClick={(e) => onClickDelete(e, customizedItems[el].id)}>
              Delete this drink
            </button>
            {!editMode && <button onClick={(e) => enableEdit(e)}>Edit</button>}
            {editMode && (
              <button onClick={(e) => handleEdit(e)}>Confirm Edit</button>
            )}
            {/* <Link to={`/:itemId/customize`}>Edit this drink</Link> */}
            <AddToCart el={customizedItems[el]} />
          </div>
        ))}
    </div>
  );
};
export default GetCustomizedItems;
