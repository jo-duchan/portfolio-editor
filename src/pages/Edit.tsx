import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useContentValue from "context/useContentValue";
import useContentAction from "context/useContentAction";

// Components
import ToolsPanel from "components/edit/ToolsPanel";
import Viewer from "components/edit/Viewer";

// Type
import { ContentList, ContentItem } from "type/contentDataType";

function Edit() {
  const action = useContentAction();
  const data = useContentValue();
  const viewRef = useRef<HTMLDivElement | null>(null);
  const [selectItem, setSelectItem] = useState<ContentItem | null>(null);

  const onCreateHandler = (createData: ContentItem) => {
    // const copyData = data;
    // const selectIndex = copyData.findIndex(
    //   (item) => item.id === selectItem?.id
    // );
    // const startPoint = selectItem ? selectIndex + 1 : copyData.length;
    // copyData.splice(startPoint, 0, createData);
    setSelectItem(createData);
    if (!selectItem) return;
    action.onCreateHandler(createData, selectItem.id);
  };

  const onUpdateHandler = (updateData: ContentItem) => {
    const copyData = data;
    const selectIndex = copyData.findIndex(
      (item) => item.id === selectItem?.id
    );
    copyData[selectIndex] = updateData;
    // setData(copyData);
    console.log("update:", data);
  };

  const onSetIdHandler = (id: string, item: ContentItem) => {
    setSelectItem(item);
  };

  useEffect(() => {
    if (viewRef.current) {
      const clearIdHandler = () => setSelectItem(null);
      viewRef.current.addEventListener("click", clearIdHandler);
    }
  }, []);

  return (
    <Container>
      <CanvasPanel ref={viewRef}>
        {data.map((item) => (
          <Viewer
            key={item.id}
            data={item}
            onSetIdHandler={onSetIdHandler}
            isFocus={item.id === selectItem?.id}
            onUpdateHandler={onUpdateHandler}
          />
        ))}
      </CanvasPanel>
      <ToolsPanel
        data={data}
        // isSelect={isSelect}
        onCreateHandler={onCreateHandler}
        // onUpdateHandler={onUpdateHandler}
      />
    </Container>
  );
}

export default Edit;

const Container = styled.div`
  display: flex;
`;

const CanvasPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
