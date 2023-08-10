import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useContentValue from "context/useContentValue";
import useCurrentItem from "context/useCurrentItem";

// Style
import ColorSystem from "styles/color-system";

// Components
import TopVisual from "components/edit/TopVisual";
import ToolsPanel from "components/edit/ToolsPanel";
import Viewer from "components/edit/Viewer";

// Type
import { RootOption } from "type/rootOption";

interface StyledProps {
  fill: string;
  color: string;
}

interface CustomError {
  code: string;
  message: string;
}

function Edit() {
  const { portfolioId } = useParams();
  const data = useContentValue();
  const [, setCurrentItem] = useCurrentItem();
  const [rootOption, setRootOption] = useState({} as RootOption);
  const viewRef = useRef<HTMLDivElement | null>(null);
  const clearIdHandler = () => setCurrentItem(null);

  useEffect(() => {
    // 임시로 전부 받아오자.
    const fetchTopVisualData = async () => {
      const fetchData = async () => {
        const response = await fetch(
          "https://portfolio-editor-1c789-default-rtdb.firebaseio.com/portfolio.json"
        );

        if (!response.ok) {
          throw new Error("Could not fetch data!");
        }

        const data = await response.json();

        return data;
      };

      try {
        const data = await fetchData();
        const test = data.find((item: any) => item.id === portfolioId);
        console.log(test, portfolioId);
      } catch (error) {
        const err = error as CustomError;
        console.log("err:", err.message);
      }
    };

    fetchTopVisualData();
    viewRef.current?.addEventListener("click", clearIdHandler);
    document.body.style.background = ColorSystem.Neutral[800];

    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <Container>
      <CanvasPanel
        ref={viewRef}
        fill={rootOption.fill!}
        color={rootOption.color!}
      >
        <TopVisual />
        {data.map((item) => (
          <Viewer key={item.id} data={item} />
        ))}
      </CanvasPanel>
      <ToolsPanel rootOption={rootOption} setRootOption={setRootOption} />
      <Background onClick={clearIdHandler} />
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

const CanvasPanel = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  width: calc(100% - 330px);
  height: fit-content;
  min-height: calc(100vh - 60px);
  background: ${(props) =>
    props.fill ? `#${props.fill}` : `${ColorSystem.Neutral[0]}`};
  color: ${(props) =>
    props.color ? `#${props.color}` : `${ColorSystem.Neutral[900]}`};
  border-radius: 6px;
  overflow: hidden;
  z-index: 100;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 0;
`;
