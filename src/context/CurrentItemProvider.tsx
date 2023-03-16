import React, { ReactNode, createContext, useState, Dispatch } from "react";

// Type
import { ContentItem } from "type/contentDataType";

interface Props {
  children: ReactNode;
}

type CurrentItemStateType = [
  ContentItem | null,
  Dispatch<React.SetStateAction<ContentItem | null>>
];

export const CurrentItemContext = createContext<
  CurrentItemStateType | undefined
>(undefined);

function CurrentItemProvider({ children }: Props) {
  const currentItem = useState<ContentItem | null>({} as ContentItem);
  return (
    <CurrentItemContext.Provider value={currentItem}>
      {children}
    </CurrentItemContext.Provider>
  );
}

export default CurrentItemProvider;
