import { useContext } from "react";
import { ContentActionContext } from "context/ContentDataProvider";

function useContentAction() {
  const value = useContext(ContentActionContext);

  if (value === undefined) {
    throw new Error("useContentData should be used within ContentDataProvider");
  }
  return value;
}

export default useContentAction;
