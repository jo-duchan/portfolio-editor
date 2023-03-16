import { useContext } from "react";
import { ContentValueContext } from "context/ContentDataProvider";

function useContentValue() {
  const value = useContext(ContentValueContext);

  if (value === undefined) {
    throw new Error("useContentData should be used within ContentDataProvider");
  }
  return value;
}

export default useContentValue;
