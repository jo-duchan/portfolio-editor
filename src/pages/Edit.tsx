import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useContentValue from "context/useContentValue";
import useCurrentItem from "context/useCurrentItem";

// Style
import ColorSystem from "styles/color-system";

// Components
import ToolsPanel from "components/edit/ToolsPanel";
import Viewer from "components/edit/Viewer";

function Edit() {
  const data = useContentValue();
  const [, setCurrentItem] = useCurrentItem();
  const viewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clearIdHandler = () => setCurrentItem(null);
    window.addEventListener("click", clearIdHandler);

    return () => {
      window.removeEventListener("click", clearIdHandler);
    };
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
  width: calc(100% - 330px);
  height: fit-content;
  min-height: calc(100vh - 60px);
  background: ${ColorSystem.Neutral[0]};
  border-radius: 6px;
  overflow: hidden;
`;
