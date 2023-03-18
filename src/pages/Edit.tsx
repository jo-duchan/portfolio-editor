import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useContentValue from "context/useContentValue";
// import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// Components
import ToolsPanel from "components/edit/ToolsPanel";
import Viewer from "components/edit/Viewer";

function Edit() {
  // const action = useContentAction();
  const data = useContentValue();
  const [currentItem, setCurrentItem] = useCurrentItem();
  const viewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (viewRef.current) {
      const clearIdHandler = () => setCurrentItem(null);
      viewRef.current.addEventListener("click", clearIdHandler);
    }
  }, []);

  return (
    <Container>
      <CanvasPanel ref={viewRef}>
        {data.map((item) => (
          <Viewer key={item.id} data={item} />
        ))}
      </CanvasPanel>
      <ToolsPanel />
    </Container>
  );
}

export default Edit;

const Container = styled.div`
  position: relative;
  display: flex;
  padding: 30px;
  box-sizing: border-box;
`;

const CanvasPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 230px);
  background: #fff;
`;
