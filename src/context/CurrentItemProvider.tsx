import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// Type
import { ContentItem } from "type/contentList";

interface Props {
  children: ReactNode;
}

type CurrentItemStateType = [
  ContentItem | null,
  Dispatch<SetStateAction<ContentItem | null>>
];

export const CurrentItemContext = createContext<
  CurrentItemStateType | undefined
>(undefined);

function CurrentItemProvider({ children }: Props) {
  const currentItem = useState<ContentItem | null>(null);
  return (
    <CurrentItemContext.Provider value={currentItem}>
      {children}
    </CurrentItemContext.Provider>
  );
}

export default CurrentItemProvider;
