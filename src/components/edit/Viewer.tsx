import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useContent from "context/useContent";
import TextEditor from "components/edit/TextEditor";
import GapElement from "components/edit/GapElement";
import ImageElement from "components/edit//ImageElement";
import { ContentItem } from "type/portfolio";

interface Props {
  data: ContentItem;
  currentItemId: string | null;
  setCurrentItemId: React.Dispatch<React.SetStateAction<string | null>>;
}

interface StyledProps {
  focus: boolean;
}

function Viewer({ data, currentItemId, setCurrentItemId }: Props) {
  const action = useContent.Action();
  const [isFocus, setIsFocus] = useState(false);

  const renderContent = () => {
    switch (data.sort) {
      case "TITLE":
      case "TEXT": {
        return (
          <TextEditor
            data={data}
            onUpdateHandler={updateHandler}
            isFocus={isFocus}
          />
        );
      }
      case "IMG": {
        return <ImageElement data={data} onUpdateHandler={updateHandler} />;
      }
      case "GAP": {
        return <GapElement data={data} />;
      }
      default:
        return <>not found contents</>;
    }
  };

  const updateHandler = (updateData: ContentItem) => {
    action.update(updateData, data.id);
  };

  const selectItemHandler = () => {
    if (isFocus) return;

    setCurrentItemId(data.id);
  };

  useEffect(() => {
    setIsFocus(data.id === currentItemId);
  }, [currentItemId]);

  return (
    <Container onClick={selectItemHandler} focus={isFocus}>
      {renderContent()}
    </Container>
  );
}

export default Viewer;

const Container = styled.div<StyledProps>`
  position: relative;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid rgb(15, 129, 230);
    box-sizing: border-box;
    opacity: ${(props) => (props.focus ? 1 : 0)};
    background: rgba(15, 129, 230, 0.05);
    z-index: 999;
    pointer-events: none;
  }
`;
