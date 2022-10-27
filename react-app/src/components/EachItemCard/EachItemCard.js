import { useSelector } from "react-redux";

import "./EachItemCard.css";

const EachItemCard = ({ item }) => {
  // const sessionUser = useSelector((state) => state.session.user);
  // console.log("sessionUser !!!!!!!", sessionUser);

  return (
    <div key={item.id}>
      <img src={item.image_url} width="300" height="300" alt="item"></img>
      <br></br>
      {/* Image URL: {item.image_url} <br></br> */}
      ID: {item.id} <br></br>
      Name: {item.name} <br></br>
      Price: ${item.price} <br></br>
      Description: {item.description} <br></br>
      Category: {item.drink_category} <br></br>
      <br></br>

    </div>
  );
};
export default EachItemCard;
