import { useState, useEffect } from "react";
// import {
//   createCustomizedItem,
//   getAllCustomizedItems,
// } from "../../store/customizedItem";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllItems } from "../../store/items";
import { getAllCustomizations } from "../../store/customization";
import { getCustomizedSelections } from "../../store/customized_selections";
// import "./CreateCustomizedItem.css";

const Customization = ({
  thisCustomizedItem_id,
  customizationSelected,
  setCustomizationSelected,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomizations());
    dispatch(getCustomizedSelections(thisCustomizedItem_id));
  }, [dispatch]);


  const allCustomizedSelections = useSelector(
    (state) => state.customized_selections
  );
  const allCustomizationsObj = useSelector((state) => state.customizations);
  const allCustomizations = Object.values(allCustomizationsObj);

  //--------CODE FOR EDIT CUSTOMIZED ITEM----------
  const customizedSelectionForThisCustomizedItem = Object.values(
    allCustomizedSelections
  ).filter((el) => el.customized_item_id == thisCustomizedItem_id);
  // console.log(
  //   "customizedSelectionForThisCustomizedItem=========================",
  //   customizedSelectionForThisCustomizedItem
  // );
  const reversedIndexCurrentSelections = {};
  customizedSelectionForThisCustomizedItem.forEach((currentSelection) => {
    reversedIndexCurrentSelections[currentSelection.category] =
      currentSelection;
  });
  // console.log(reversedIndexCurrentSelections);
  //----------------------------------

  const categoryArr = allCustomizations.map((el) => el.category);
  const customizationCategories = [...new Set(categoryArr)]; //['milk', 'flavor', 'ice']
  const sortedCustomizations = {};
  //for each category,add each category to the sortedCustomizations obj by the category name
  //for each category,add all the name belong to the category
  //for example: sortedCustomizations = {milk:
  // [ 0:{category: 'milk', id: 1, name: 'Soy Milk'},1:{category: 'milk', id: 2, name: 'Almond Milk'}  ]  }

  for (let i in customizationCategories) {

    sortedCustomizations[customizationCategories[i]] = allCustomizations.filter(
      (el) => el.category === customizationCategories[i]
    );
  }
console.log('sortedCustomizations!!!!!!!',sortedCustomizations)
  // if (!sortedCustomizations) return null;
  return (
    <>
      <h1>here's all the Customizations</h1>
      {/* {thisCustomizedItem_id && (
        <div>this is for editing customized item</div>
      )} */}
      {/* for each category */}
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
            {sortedCustomizations[category].map(
              (customization) =>
                (category in reversedIndexCurrentSelections &&
                  customization.id ==
                    reversedIndexCurrentSelections[category]
                      .customization_id && (
                    <option selected value={customization.id}>
                      {customization.name}
                    </option>
                  )) || (
                  <option value={customization.id}>{customization.name}</option>
                )
            )}
          </select>
        </div>
      ))}
    </>
  );
};
export default Customization;
