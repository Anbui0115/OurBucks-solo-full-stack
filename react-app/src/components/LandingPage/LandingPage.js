import { useSelector, useDispatch } from "react-redux";
import { getAllItems } from "../../store/items";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Welcome to OurBucks</h1>
      <div>
        <Link to={`/items/${item1.id}`}>
          <div>
            <img
              src={
                "https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-81152.jpg"
              }
              width="300px"
              height="300px"
              alt="drink"
            ></img>
          </div>
          <div>
            <div>{item1.name}</div>
            <div>{item1.description}</div>
          </div>
        </Link>
      </div>
      <div>
        <Link to={`/items/${item2.id}`}>
          <div>
            <img
              src={
                "https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-81198.jpg"
              }
              width="300px"
              height="300px"
              alt="drink"
            ></img>
          </div>
          <div>
            <div>{item2.name}</div>
            <div>{item2.description}</div>
          </div>
        </Link>
      </div>
      <div>
        <Link to={`/items/${item3.id}`}>
          <div>
            <img
              src={
                "https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-81199.jpg"
              }
              width="300px"
              height="300px"
              alt="drink"
            ></img>
          </div>
          <div>
            <div>{item3.name}</div>
            <div>{item3.description}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default LandingPage;
