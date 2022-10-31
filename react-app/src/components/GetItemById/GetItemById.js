import { useSelector, useDispatch } from "react-redux";
import { getAllItems } from "../../store/items";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./GetItemById.css";

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
      <h1>ITEM BY ID</h1>
      {
        <div key={item.id}>
          <img src={item.image_url} width="300" height="300"></img>
          <br></br>
          {/* Image URL: {item.image_url} <br></br> */}
          ID: {item.id} <br></br>
          Name: {item.name} <br></br>
          Price: ${item.price} <br></br>
          Description: {item.description} <br></br>
          Category: {item.drink_category} <br></br>
          <br></br>
          <div>review shown here</div>
          {sessionUser && (
            <div>
              {/* <Link to={`/items/${item.id}/customize`} key={item.id} s>
                Customize your drink
              </Link> */}
              <Link to={`/${item.id}/customize`} key={item.id} s>
                Customize your drink
              </Link>
            </div>
          )}
        </div>
      }
    </>
  );
};
export default GetItemById;
