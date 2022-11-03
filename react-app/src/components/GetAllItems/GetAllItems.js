import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

import { getAllItems } from "../../store/items";
import EachItemCard from "../EachItemCard/EachItemCard";
import styles from "./GetAllItem.module.css";

const GetAllItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  const allItems = useSelector((state) => state.items);
  // console.log("ALL ITEMS ~~~~~~~~~~~~~~~~~~~~~~~~~~~", Object.keys(allItems));
  return (
    <div>
      <div className={styles.menu_text}>Menu</div>
      <div className={styles.outer_container}>
        <div className={styles.middle_container}>
          <div className={styles.inner_container}>
            <div className={styles.all_drinks_container}>
              {Object.keys(allItems).map((item_id) => (
                <Link
                  to={`/items/${allItems[item_id].id}`}
                  key={allItems[item_id].id}
                >
                  <EachItemCard item={allItems[item_id]} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GetAllItems;
