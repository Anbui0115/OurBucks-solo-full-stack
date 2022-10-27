import { useSelector, useDispatch } from "react-redux";
import { getAllItems } from "../store/items";
import React, { useState, useEffect } from "react";

const GetAllItems = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  const allItems = useSelector((state) => state.items);
  console.log("ALL ITEMS ~~~~~~~~~~~~~~~~~~~~~~~~~~~", Object.keys(allItems));
  return (
    <>
      <h1>here's all the items</h1>
      {allItems.map((item) => (
        <div key={item.id}>
          <img src={item.image_url} width="300" height="300"></img>
          <br></br>
          Image URL: {item.image_url} <br></br>
          ID: {item.id} <br></br>
          Name: {item.name} <br></br>
          Price: ${item.price} <br></br>
          Description: {item.description} <br></br>
          Category: {item.drink_category} <br></br>
          <br></br>
        </div>
      ))}
    </>
  );
};
export default GetAllItems;
