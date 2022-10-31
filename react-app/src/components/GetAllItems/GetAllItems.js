import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import React, { useEffect } from "react";

import { getAllItems } from "../../store/items";
import EachItemCard from "../EachItemCard/EachItemCard";
import "./GetAllItem.css";


const GetAllItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  const allItems = useSelector((state) => state.items);
  // console.log("ALL ITEMS ~~~~~~~~~~~~~~~~~~~~~~~~~~~", Object.keys(allItems));
  return (
    <>
      <h1>here's all the items</h1>
      {Object.keys(allItems).map((item_id) => (
        // <div key={item.id}>
        //   <img src={item.image_url} width="300" height="300"></img>
        //   <br></br>
        //   {/* Image URL: {item.image_url} <br></br> */}
        //   ID: {item.id} <br></br>
        //   Name: {item.name} <br></br>
        //   Price: ${item.price} <br></br>
        //   Description: {item.description} <br></br>
        //   Category: {item.drink_category} <br></br>
        //   <br></br>
        // </div>

        <Link to={`/items/${allItems[item_id].id}`} key={allItems[item_id].id}>
          <EachItemCard item={allItems[item_id]} />
        </Link>
      ))}
    </>
  );
};
export default GetAllItems;
