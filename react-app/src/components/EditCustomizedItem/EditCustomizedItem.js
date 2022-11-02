import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import Customization from "../Customization/Customization";
import {
  getCustomizedSelections,
  editCustomizedSelection,
  deleteCustomizedSelection,
  addCustomizedSelectionToCustomizedItem,
} from "../../store/customized_selections";
import { getAllCustomizations } from "../../store/customization";
import {
  editCustomizedItem,
  getAllCustomizedItems,
} from "../../store/customizedItem";

const EditCustomizedItem = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const { customizedItem_id } = useParams();
  const allCustomizedItems = useSelector((state) => state.customized_items);
  const [thisCustomizedItem, setThisCustomizedItem] = useState(
    allCustomizedItems[customizedItem_id]
  );

  const [name, setName] = useState(thisCustomizedItem?.name);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customizationSelected, setCustomizationSelected] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getAllCustomizedItems());
    dispatch(getAllCustomizations());
    dispatch(getCustomizedSelections(thisCustomizedItem.id));
  }, [dispatch]);

  useEffect(() => {
    if (allCustomizedItems[customizedItem_id]) {
      setThisCustomizedItem(allCustomizedItems[customizedItem_id]);
      setName(allCustomizedItems[customizedItem_id].name);
    }
  }, [allCustomizedItems[customizedItem_id]]);

  useEffect(() => {
    let errors = [];
    if (name?.length < 4 || name?.length > 255)
      errors.push("Name needs to be between 4 and 255 characters");

    return setErrors(errors);
  }, [name]);

  const allCustomizedSelections = useSelector(
    (state) => state.customized_selections
  );

  const customizedSelectionForThisCustomizedItem = Object.values(
    allCustomizedSelections
  ).filter((el) => el.customized_item_id == thisCustomizedItem.id);
  // console.log(
  //   "customizedSelectionForThisCustomizedItem=========================",
  //   customizedSelectionForThisCustomizedItem
  // );
  const reversedIndexCurrentSelections = {};
  customizedSelectionForThisCustomizedItem.forEach((currentSelection) => {
    reversedIndexCurrentSelections[currentSelection.category] =
      currentSelection;
  });
  // const flavor = reversedIndexCurrentSelections.flavor;
  // const milk = reversedIndexCurrentSelections.milk;
  // const ice = reversedIndexCurrentSelections.ice;
  // console.log(
  //   "current selection by category: -------",
  //   reversedIndexCurrentSelections
  // );

  console.log("allCustomizedItems----------", allCustomizedItems);
  console.log("thisCustomizedItem", thisCustomizedItem);

  if (!sessionUser) Redirect("/");
  if (!thisCustomizedItem) return null;
  if (!allCustomizedItems) return null;

  const onEdit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (errors.length) return;

    if (thisCustomizedItem.name != name) {
      const edit_customized_item = await dispatch(
        editCustomizedItem(
          thisCustomizedItem.id,
          thisCustomizedItem.item_id,
          name
        )
      );
    }

    for (let category in customizationSelected) {
      // 1. newly selected customizations (NSC) is default
      // 2. previous selected customizations (PSC) exists for category
      // 3. NSC is the same as PSC

      // 1 & 2 = remove selection
      // 2 & !3 = edit selection
      // !2 & !3 = add new selection
      // 1 & !2 = no action
      // 2 & 3 = no action

      const nscDefault = customizationSelected[category] == 0;
      const pscExists = category in reversedIndexCurrentSelections;

      if (nscDefault && pscExists) {
        const delete_response = await dispatch(
          deleteCustomizedSelection(reversedIndexCurrentSelections[category].id)
        );
      } else if (pscExists) {
        const sameSelection =
          customizationSelected[category] ==
          reversedIndexCurrentSelections[category].customization_id;
        if (!sameSelection) {
          const editted_customized_selection = await dispatch(
            editCustomizedSelection(
              reversedIndexCurrentSelections[category].id,
              customizationSelected[category]
            )
          );
        }
      } else if (!pscExists) {
        const new_customized_selection = await dispatch(
          addCustomizedSelectionToCustomizedItem(
            customizationSelected[category],
            customizedItem_id
          )
        );
      }
    }

    history.push(`/my-customized-items`);
  };

  return (
    <div>
      <h1>EDIT YOUR DRINK</h1>
      <img
        src={thisCustomizedItem?.image_url}
        width="300px"
        height="300px"
        alt="drink"
      ></img>
      <form onSubmit={(e) => onEdit(e)}>
        {isSubmitted && (
          <div>
            {errors.map((error) => (
              <div className="each-error" key={error}>
                {error}
              </div>
            ))}
          </div>
        )}
        <div>
          <label>
            Name your drink
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <Customization
          thisCustomizedItem_id={thisCustomizedItem.id || undefined}
          customizationSelected={customizationSelected}
          setCustomizationSelected={setCustomizationSelected}
        />
        <button
          className="create-item-submit-button"
          type="submit"
          disabled={isSubmitted && errors.length > 0}
        >
          Save
        </button>
      </form>
    </div>
  );
};
export default EditCustomizedItem;
