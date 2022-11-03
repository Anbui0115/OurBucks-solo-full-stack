import { useSelector } from "react-redux";

import styles from "./EachItemCard.module.css";

const EachItemCard = ({ item }) => {
  const formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  const dollarFormmatter = new Intl.NumberFormat("en-US", formatting_options);

  return (
    <div key={item.id}>
      <div className={styles.all_drink_display}>
        <div className={styles.img_container}>
          <img alt-="drink" className={styles.drink_img} src={item.image_url} />
        </div>
        <div className={styles.info_container}>
          <div className={styles.drink_info}>
            <div className={styles.drink_name}>{item.name}</div>
            <div className={styles.drink_price_container}>
              <span className={styles.drink_price}>
                {dollarFormmatter.format(item.price)}
              </span>
            </div>
          </div>

          {/* <div className="homepage-spot-review-data">{item.drink_category}</div> */}
        </div>
      </div>
    </div>
  );
};
export default EachItemCard;
