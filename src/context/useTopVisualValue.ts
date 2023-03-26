import { useContext } from "react";
import { TopVisualValueContext } from "context/TopVisualProvider";

function useTopVisualValue() {
  const value = useContext(TopVisualValueContext);

  if (value === undefined) {
    throw new Error(
      "useContentValue should be used within ContentValueContext"
    );
  }
  return value;
}

export default useTopVisualValue;
