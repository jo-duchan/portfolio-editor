import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useContentValue from "context/useContentValue";
// import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// Components
import ToolsPanel from "components/edit/ToolsPanel";
import Viewer from "components/edit/Viewer";

// Type
import { ContentItem } from "type/contentDataType";

function Edit() {
  // const action = useContentAction();
  const data = useContentValue();
  const [currentItem, setCurrentItem] = useCurrentItem();
  const viewRef = useRef<HTMLDivElement | null>(null);

  const onUpdateHandler = (updateData: ContentItem) => {
    const copyData = data;
    const selectIndex = copyData.findIndex(
      (item) => item.id === currentItem?.id
    );
    copyData[selectIndex] = updateData;
    // setData(copyData);
    console.log("update:", data);
  };

  useEffect(() => {
    if (viewRef.current) {
      // const clearIdHandler = () => setSelectItem(null);
      const clearIdHandler = () => setCurrentItem(null);
      viewRef.current.addEventListener("click", clearIdHandler);
    }
  }, []);

  return (
    <Container>
      <CanvasPanel ref={viewRef}>
        {data.map((item) => (
          <Viewer key={item.id} data={item} onUpdateHandler={onUpdateHandler} />
        ))}
      </CanvasPanel>
      <ToolsPanel />
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
