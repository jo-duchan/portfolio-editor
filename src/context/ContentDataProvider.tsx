import React, { ReactNode, createContext, useMemo, useState } from "react";

// Type
import { ContentList, ContentItem } from "type/contentList";

interface Props {
  children: ReactNode;
}

type ContentActionType = {
  create(createData: ContentItem, currentId: string | null | undefined): void;
  update(updateData: ContentItem, currentId: string): void;
  delete(currentId: string): void;
};

export const ContentValueContext = createContext<ContentList | undefined>(
  undefined
);
export const ContentActionContext = createContext<
  ContentActionType | undefined
>(undefined);

function ContentDataProvider({ children }: Props) {
  const [contentData, setContentData] = useState<ContentList>([]);

  const actions = useMemo(
    () => ({
      create(createData: ContentItem, currentId: string | null | undefined) {
        setContentData((prevData) => {
          const newData = [...prevData];
          const selectIndex = newData.findIndex(
            (item) => item.id === currentId
          );
          const startPoint = currentId ? selectIndex + 1 : newData.length;
          newData.splice(startPoint, 0, createData);
          return newData;
        });
      },
      update(updateData: ContentItem, currentId: string) {
        setContentData((prevData) => {
          const newData = [...prevData];
          const selectIndex = newData.findIndex(
            (item) => item.id === currentId
          );
          newData[selectIndex] = updateData;
          return newData;
        });
      },
      delete(currentId: string) {
        setContentData((prevData) => {
          const newData = [...prevData];
          const selectIndex = newData.findIndex(
            (item) => item.id === currentId
          );
          newData.splice(selectIndex, 1);
          return newData;
        });
      },
    }),
    []
  );

  return (
    <ContentActionContext.Provider value={actions}>
      <ContentValueContext.Provider value={contentData}>
        {children}
      </ContentValueContext.Provider>
    </ContentActionContext.Provider>
  );
}

export default ContentDataProvider;
