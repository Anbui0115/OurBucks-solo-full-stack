import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomizedItems } from "../../store/customizedItem";
import { getAllItems } from "../../store/items";
// import "./GetCustomizedItems.css";

const GetCustomizedItems = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItems());
    dispatch(getAllCustomizedItems());
  }, [dispatch]);
  const customizedItems = useSelector((state) => state.customizedItem);
  console.log("CUSTOMIZED ITEMs", customizedItems);
  return <h1>this is a list of your customized items</h1>;
};
export default GetCustomizedItems;
