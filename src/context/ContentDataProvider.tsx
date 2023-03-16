import React, { createContext, useMemo, useState } from "react";

// Type
import { ContentList, ContentItem } from "type/contentDataType";

interface Props {
  children: React.ReactNode;
}

type ContentActionType = {
  onCreateHandler(createData: ContentItem, currentId: string): void;
};

export const ContentValueContext = createContext<ContentList | undefined>(
  undefined
);
export const ContentActionContext = createContext<
  ContentActionType | undefined
>(undefined);

function ContentDataProvider({ children }: Props) {
  const [contentData, setContentData] = useState<ContentList>([]);

  // 리듀서로 수정 예정
  const actions = useMemo(
    () => ({
      onCreateHandler(createData: ContentItem, currentId: string) {
        setContentData((prevData) => {
          const updateData = [...prevData];
          const selectIndex = updateData.findIndex(
            (item) => item.id === currentId
          );
          const startPoint = currentId ? selectIndex + 1 : updateData.length;
          updateData.splice(startPoint, 0, createData);
          return updateData;
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
