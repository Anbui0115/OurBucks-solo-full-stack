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

// import "./GetCustomizedItems.css";

const GetCustomizedItems = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [requestData, setRequestData] = useState(new Date());
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
  const onClickEdit = async (e, customizedItemId) => {
    e.preventDefault();

    setRequestData(new Date());
  };

  return (
    <div>
      {customizedItems &&
        Object.keys(customizedItems).map((el) => (
          <div key={`el.${customizedItems[el].id}`}>
            <div>
              <img
                src={customizedItems[el].image_url}
                width="100"
                height="100"
              ></img>
            </div>
            <div>Name: {customizedItems[el].name}</div>
            <button onClick={(e) => onClickDelete(e, customizedItems[el].id)}>
              Delete this drink
            </button>
            <button onClick={(e) => onClickEdit(e, customizedItems[el].id)}>
              Edit this drink
            </button>
            <AddToCart el={customizedItems[el]} />
          </div>
        ))}
    </div>
  );
};
export default GetCustomizedItems;
