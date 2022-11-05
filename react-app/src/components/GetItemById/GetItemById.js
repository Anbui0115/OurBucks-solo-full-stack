import { useSelector, useDispatch } from "react-redux";
import { getAllItems } from "../../store/items";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AddToCart from "../AddToCart/AddToCart";
import styles from "./GetItemById.module.css";

const GetItemById = (props) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // console.log("sessionUser !!!!!!!", sessionUser);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  const allItems = useSelector((state) => state.items);
  const { itemId } = useParams();

  if (!itemId) return null;

  const item = allItems[itemId];
  // console.log("ITEM BY ID---------------------------", item);
  //   console.log("ALL ITEMS ~~~~~~~~~~~~~~~~~~~~~~~~~~~", Object.keys(allItems));
  if (!allItems) return null;
  if (!item) return null;

  return (
    <>
      <div className={styles.item_container}>
        <div className={styles.item_top_page}>
          <div className={styles.item_img_container}>
            <img src={item.image_url} className={styles.item_img}></img>
          </div>

          <div className={styles.item_name_calories}>
            <div className={styles.item_name}>
              <div>{item.name}</div>
            </div>
            <div className={styles.item_calories}>{item.calories} calories</div>
          </div>
        </div>

        <div className={styles.item_page_body}>
          <div className={styles.item_inner_boy}>
            <div className={styles.upper_body}>
              <div className={styles.drink_description}>{item.description}</div>
              <div className={styles.drink_category}>{item.drink_category}</div>
              <div className={styles.drink_price}>${item.price}</div>
            </div>
          </div>

          <div className={styles.bottom_body}>
            {sessionUser && (
              <div className={styles.inner_bottom_body}>
                {/* <div className={styles.drink_customize_wrapper}>
                  <Link to={`/${item.id}/customize`} key={item.id} s>
                  <div className={styles.drink_customize}>Customize your drink</div>
                  </Link>
                </div> */}
                <div className={styles.bottom_buttons}>
                  <Link to={`/${item.id}/customize`} key={item.id}>
                    <div className={styles.drink_customize_wrapper}>
                      <div className={styles.drink_customize}>
                        Customize your drink
                      </div>
                    </div>
                  </Link>

                  <div>
                    <AddToCart el={item.id} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default GetItemById;
