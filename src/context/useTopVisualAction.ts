import { useContext } from "react";
import { TopVisualActionContext } from "context/TopVisualProvider";

function useTopVisualAction() {
  const value = useContext(TopVisualActionContext);

  if (value === undefined) {
    throw new Error(
      "useContentValue should be used within ContentValueContext"
    );
  }
  return value;
}

export default useTopVisualAction;
