import { useSelector } from "react-redux";

import "./EachItemCard.css";

const EachItemCard = ({ item }) => {
  // const sessionUser = useSelector((state) => state.session.user);
  // console.log("sessionUser !!!!!!!", sessionUser);

  return (
    <div key={item.id}>
      <div>
        <img src={item.image_url} width="300" height="300" alt="item"></img>
      </div>

      {/* <br></br> */}
      {/* Image URL: {item.image_url} <br></br> */}

      {/* <br></br> */}
      <div>ID: {item.id}</div>
      <div>Name: {item.name}</div>
      <div>Price: ${item.price}</div>
      <div>Description: {item.description}</div>
      <div>Category: {item.drink_category}</div>
    </div>
  );
};
export default EachItemCard;
