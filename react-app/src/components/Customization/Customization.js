import { useState, useEffect } from "react";
// import {
//   createCustomizedItem,
//   getAllCustomizedItems,
// } from "../../store/customizedItem";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllItems } from "../../store/items";
import { getAllCustomizations } from "../../store/customization";
// import "./CreateCustomizedItem.css";

const Customization = ({ customizationSelected, setCustomizationSelected }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomizations());
  }, [dispatch]);

  const allCustomizations = useSelector((state) => state.customizations);
  const categoryArr = Object.values(allCustomizations).map((el) => el.category);
  const customizationCategories = [...new Set(categoryArr)];

  const sortedCustomizations = {};
  for (let i in customizationCategories) {
    sortedCustomizations[customizationCategories[i]] = Object.values(
      allCustomizations
    ).filter((el) => el.category === customizationCategories[i]);
  }

  return (
    <>
      <h1>here's all the Customizations</h1>
      {Object.keys(sortedCustomizations).map((category) => (
        <div>
          <h2>{category}</h2>
          <select
            value={customizationSelected[category]}
            onChange={(e) => {
              const newSelection = {
                ...customizationSelected,
              };
              newSelection[category] = e.target.value;
              setCustomizationSelected(newSelection);
            }}
          >
            <option value={0}>Default</option>
            {sortedCustomizations[category].map((customization) => (
              <option value={customization.id}>{customization.name}</option>
            ))}
          </select>
        </div>
      ))}
    </>
  );
};
export default Customization;
