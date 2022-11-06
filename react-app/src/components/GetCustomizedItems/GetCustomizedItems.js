import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useHistory, Redirect, Link } from "react-router-dom";
import {
  getAllCustomizedItems,
  deleteCustomizedItem,
  editCustomizedItem,
} from "../../store/customizedItem";
import AddToCart from "../AddToCart/AddToCart";
import { getAllItems } from "../../store/items";
import GetCustomizedSelections from "../GetCustomizedSelections/GetCustomizedSelections";

import styles from "./GetCustomizedItems.module.css";
import button_styles from "../AddToCart/AddToCart.module.css";

const GetCustomizedItems = () => {
  const formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  const dollarFormmatter = new Intl.NumberFormat("en-US", formatting_options);

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
  if (!customizedItems) return null;
  if (!sessionUser) return <Redirect to="/" />;

  const onClickDelete = async (e, customizedItemId) => {
    e.preventDefault();
    await dispatch(deleteCustomizedItem(customizedItemId));

    setRequestData(new Date());
  };
  // function enableEdit(e) {
  //   e.preventDefault();

  //   setEditMode(true);
  //   // dispatch(editOrderItem(order_item_id)).catch(async (res) => {});
  // }
  {
    /* {!editMode && <button onClick={(e) => enableEdit(e)}>Edit</button>} */
  }
  {
    /* {editMode && (
              <button onClick={(e) => handleEdit(e)}>Confirm Edit</button>
            )} */
  }
  function handleEdit(e, customizedItem_id) {
    e.preventDefault();
    setEditMode(true);
    history.push(`/${customizedItem_id}/customize/edit`);
  }
  console.log("customizedItems=======================", customizedItems);
  return (
    <div className={styles.cus_item_body}>
      <div className={styles.cus_item_inner_body}>
        <div className={styles.title}>Your Customized Items</div>

        <div className={styles.items_body}>
          {Object.keys(customizedItems).length < 1 && (
            <div className={styles.no_customized_items}>
              You haven't created any customized items yet
            </div>
          )}
          {customizedItems &&
            Object.keys(customizedItems).map((el) => (
              <div
                key={`el.${customizedItems[el].id}`}
                className={styles.each_item}
              >
                <div className={styles.left_div}>
                  <div className={styles.each_item_img_wrapper}>
                    <img
                      src={customizedItems[el].image_url}
                      className={styles.each_item_img}
                    ></img>
                  </div>
                  {console.log(
                    "customizedItems~~~~~~~~~~~~~~~~~~~~~~~~~~",
                    Object.keys(customizedItems)
                  )}
                  <div className={styles.each_item_details}>
                    <div className={styles.item_name}>
                      {customizedItems[el].name}
                    </div>
                    <div className={styles.item_price}>
                      {dollarFormmatter.format(customizedItems[el].price)}
                    </div>
                    <div className={styles.each_item_customization}></div>
                    <GetCustomizedSelections
                      customized_item_id={el}
                      editMode={editMode}
                    />
                  </div>
                </div>

                <div className={styles.right_div}>
                  <div className={styles.each_button}>
                    <button
                      className={button_styles.addToCartButton_wrapper}
                      onClick={(e) => onClickDelete(e, customizedItems[el].id)}
                    >
                      <div className={button_styles.addToCartButton}>
                        Delete this drink
                      </div>
                    </button>
                  </div>
                  <div className={styles.each_button}>
                    <Link to={`/${customizedItems[el].id}/customize/edit`}>
                      <div className={button_styles.addToCartButton_wrapper}>
                        <div
                          onClick={(e) => handleEdit(e, customizedItems[el].id)}
                          className={button_styles.addToCartButton}
                        >
                          Edit this drink
                        </div>
                      </div>
                    </Link>
                  </div>

                  <AddToCart el={el} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default GetCustomizedItems;
