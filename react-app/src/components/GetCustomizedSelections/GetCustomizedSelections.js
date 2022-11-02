import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useHistory, Redirect } from "react-router-dom";
import {
  getCustomizedSelections,
  deleteCustomizedSelection,
  editCustomizedSelection,
} from "../../store/customized_selections";

// import "./GetCustomizedItems.css";

const GetCustomizedSelections = ({ customized_item_id, editMode }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [requestData, setRequestData] = useState(new Date());
  const sessionUser = useSelector((state) => state.session.user);
  const customizedSelectionObj = useSelector(
    (state) => state.customized_selections
  );
  const customizedSelection = Object.values(customizedSelectionObj).filter(
    (el) => el.customized_item_id == customized_item_id
  );
  // console.log("customizedSelection ~~~~~~~~", customizedSelection);

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
  // const onClickEdit = async (
  //   e,
  //   customized_selection_id,
  //   customized_item_id,
  //   customization_id
  // ) => {
  //   e.preventDefault();
  //   dispatch(
  //     await editCustomizedSelection(
  //       customized_selection_id,
  //       customized_item_id,
  //       customization_id
  //     )
  //   );
  //   setRequestData(new Date());
  // };

  return (
    <div>
      {customizedSelection &&
        customizedSelection.map((el) => (
          <div key={`el.${el.id}`}>
            {/* {console.log(
              "TEST``````````````````",
              el.customization_id
            )} */}
            <div>
              {el.category}: {el.name}
            </div>
            {editMode && (
              <div>
                <button onClick={(e) => onClickDelete(e, el.id)}>
                  Delete customization
                </button>
                <button
                // onClick={(e) =>
                //   onClickEdit(
                //     e,
                //     el.id,
                //     customized_item_id,
                //     el.customization_id
                //   )
                // }
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
/*
problem: all the customizations for all customized items were rendered for all of the customized -items

for example: customized_selections
1
:
{category: 'ice', customization_id: 20, customized_item_id: 1, id: 1, name: 'No Ice'}
6
:
{category: 'flavor', customization_id: 13, customized_item_id: 6, id: 6, name: 'Cinnamon Dolce Syrup'}
11
:
{category: 'milk', customization_id: 4, customized_item_id: 11, id: 11, name: 'Heavy Cream'}
22
:
{category: 'flavor', customization_id: 18, customized_item_id: 21, id: 22, name: 'Toffee Nut Syrup'}
23
:
{category: 'ice', customization_id: 22, customized_item_id: 21, id: 23, name: 'Extra Ice'}

---on the page, we see 2 entry of ice, 2 entry of milk and 2 entry of flavor for EACH customized_item


=====> The fix:
we need to run a filter on the customizedSelection(array) to find a matching customized selection for each customized item
for example: for customized_item_id: 1, we should only render 'No Ice'
for example: for customized_item_id: 6, we should only render 'Cinnamon Dolce Syrup'

======> The explanation:
from the parent component GetCustomizedItems, we render all customized selection for each customized item
which causes everything to have all these attributes listed above

*/
