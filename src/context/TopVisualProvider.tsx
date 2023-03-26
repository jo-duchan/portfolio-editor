import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// Type
import { TopVisual } from "type/topVisual";

interface Props {
  children: ReactNode;
}

type ContentActionType = Dispatch<SetStateAction<TopVisual>>;

export const TopVisualValueContext = createContext<TopVisual | undefined>(
  undefined
);
export const TopVisualActionContext = createContext<
  ContentActionType | undefined
>(undefined);

function TopVisualProvider({ children }: Props) {
  const [value, setValue] = useState<TopVisual>({
    title: "Project Title",
    description:
      "Lorem ipsum dolor sit amet, cont. \nUt enim ad quis nostrud exercitation ullamco laboris",
    work: "UX Design \nDevelopment \n3D Motion",
    clientLogo: undefined,
    backgroundPC: undefined,
    backgroundMO: undefined,
  });
  return (
    <TopVisualActionContext.Provider value={setValue}>
      <TopVisualValueContext.Provider value={value}>
        {children}
      </TopVisualValueContext.Provider>
    </TopVisualActionContext.Provider>
  );
}

export default TopVisualProvider;
