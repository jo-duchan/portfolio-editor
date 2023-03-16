import { useContext } from "react";
import { ContentActionContext } from "context/ContentDataProvider";

function useContentAction() {
  const value = useContext(ContentActionContext);

  if (value === undefined) {
    throw new Error(
      "useContentAction should be used within ContentActionContext"
    );
  }
  return value;
}

export default useContentAction;
