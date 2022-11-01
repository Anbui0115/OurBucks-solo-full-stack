import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useHistory, Redirect } from "react-router-dom";
import {
  getCustomizedSelections,
  deleteCustomizedSelection,
} from "../../store/customized_selections";

// import "./GetCustomizedItems.css";

const GetCustomizedSelections = ({ customized_item_id, editMode }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [requestData, setRequestData] = useState(new Date());
  const sessionUser = useSelector((state) => state.session.user);
  const customizedSelection = useSelector(
    (state) => state.customized_selections
  );

  useEffect(() => {
    dispatch(getCustomizedSelections(customized_item_id));
  }, [requestData, dispatch]);
  //check for array of items || check for object of newly created item
  if (!customizedSelection) return null;
  if (!sessionUser) return <Redirect to="/" />;

  const onClickDelete = async (e, customized_selection_id) => {
    e.preventDefault();
    await dispatch(deleteCustomizedSelection(customized_selection_id));

    setRequestData(new Date());
  };
  const onClickEdit = async (e, customized_selection_id) => {
    e.preventDefault();

    setRequestData(new Date());
  };

  return (
    <div>
      {customizedSelection &&
        Object.keys(customizedSelection).map((el) => (
          <div key={`el.${customizedSelection[el].id}`}>
            <div>
              {customizedSelection[el].category}: {customizedSelection[el].name}
            </div>
            {editMode && (
              <div>
                <button
                  onClick={(e) => onClickDelete(e, customizedSelection[el].id)}
                >
                  Delete customization
                </button>
                <button
                  onClick={(e) => onClickEdit(e, customizedSelection[el].id)}
                >
                  Edit customization
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
export default GetCustomizedSelections;
