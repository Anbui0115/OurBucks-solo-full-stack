import { useState, useEffect } from "react";
import {
  createCustomizedItem,
  getAllCustomizedItems,
} from "../../store/customizedItem";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllItems } from "../../store/items";

import "./CreateCustomizedItem.css";

const CreateCustomizedItem = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getAllCustomizedItems());
  }, [dispatch]);

  useEffect(() => {
    let errors = [];
    if (name.length < 4 || name.length > 255)
      errors.push("Name needs to be between 4 and 255 characters");

    return setErrors(errors);
  }, [name]);

  const allItems = useSelector((state) => state.items);
  const sessionUser = useSelector((state) => state.session.user);
  const { itemId } = useParams();
  console.log("ITEMID-------------------", itemId);

  if (!itemId) return null;

  const item = allItems[itemId];

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (errors.length) return;

    let customizedItemData = {
      user_id: sessionUser.id,
      item_id: itemId,
      name: name,
    };

    setErrors([]);
    const data = await dispatch(createCustomizedItem(customizedItemData)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    if (data) {
      history.push(`/my-customized-items`);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <h1>customize your drink here</h1>
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
export default CreateCustomizedItem;
