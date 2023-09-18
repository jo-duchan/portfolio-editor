import { useContext } from "react";
import {
  ContentValueContext,
  ContentActionContext,
} from "context/ContentListProvider";

function Value() {
  const value = useContext(ContentValueContext);

  if (value === undefined) {
    throw new Error(
      "useContentValue should be used within ContentValueContext"
    );
  }
  return value;
}

function Action() {
  const action = useContext(ContentActionContext);

  if (action === undefined) {
    throw new Error(
      "useContentAction should be used within ContentActionContext"
    );
  }
  return action;
}

const useContent = { Value, Action };

export default useContent;
