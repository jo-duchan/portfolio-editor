import React, { createContext, useState } from "react";

// Type
import { ContentList } from "type/contentDataType";

interface Props {
  children: React.ReactNode;
}

type ContentActionType = React.Dispatch<React.SetStateAction<ContentList>>;

export const ContentValueContext = createContext<ContentList | undefined>(
  undefined
);
export const ContentActionContext = createContext<
  ContentActionType | undefined
>(undefined);

function ContentDataProvider({ children }: Props) {
  const [contentData, setContentData] = useState<ContentList>([]);
  return (
    <ContentActionContext.Provider value={setContentData}>
      <ContentValueContext.Provider value={contentData}>
        {children}
      </ContentValueContext.Provider>
    </ContentActionContext.Provider>
  );
}

export default ContentDataProvider;
