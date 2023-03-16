import { useContext } from "react";
import { CurrentItemContext } from "context/CurrentItemProvider";

function useCurrentItem() {
  const value = useContext(CurrentItemContext);

  if (value === undefined) {
    throw new Error("useCurrentItem should be used within CurrentItemContext");
  }
  return value;
}

export default useCurrentItem;
