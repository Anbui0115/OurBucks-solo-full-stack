import { useSelector, useDispatch } from "react-redux";
import { getAllItems } from "../../store/items";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  const allItems = useSelector((state) => state.items);
  const item1 = allItems[38];
  const item2 = allItems[16];
  const item3 = allItems[21];
  if (!item1 || !item2 || !item3) return null;
  return (
    <div className={styles.landing_body}>
      <div className={styles.body_div}>
        <div className={styles.inner_body}>
          <div className={styles.each_div}>
            <div className={styles.img_div}>
              <img
                src={
                  "https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-81152.jpg"
                }
                className={styles.landing_img}
                alt="drink"
              ></img>
            </div>
            <div className={styles.name_description}>
              <div className={styles.inner_des}>
                <div className={styles.item_name}>{item1.name}</div>
                <div className={styles.item_des}> {item1.description}</div>
                <div className={styles.order_now_wrapper}>
                  <Link to={`/items/${item1.id}`}>
                    <div className={styles.order_now}>Order Now</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.each_div}>
            <div className={styles.name_description}>
              <div className={styles.inner_des}>
                <div className={styles.item_name}>{item2.name}</div>
                <div className={styles.item_des}> {item2.description}</div>
                <div className={styles.order_now_wrapper}>
                  <Link to={`/items/${item1.id}`}>
                    <div className={styles.order_now}>Order Now</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.img_div}>
              <img
                src={
                  "https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-81198.jpg"
                }
                className={styles.landing_img}
                alt="drink"
              ></img>
            </div>
          </div>
          <div className={styles.each_div}>
            <div className={styles.img_div}>
              <img
                src={
                  "https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-81199.jpg"
                }
                className={styles.landing_img}
                alt="drink"
              ></img>
            </div>
            <div className={styles.name_description}>
              <div className={styles.inner_des}>
                <div className={styles.item_name}>{item3.name}</div>
                <div className={styles.item_des}> {item3.description}</div>
                <div className={styles.order_now_wrapper}>
                  <Link to={`/items/${item3.id}`}>
                    <div className={styles.order_now}>Order Now</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
