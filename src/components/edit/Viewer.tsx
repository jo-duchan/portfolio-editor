import React from "react";
import styled from "styled-components";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// Components
import TextElement from "components/edit/TextElement";
import GapElement from "components/edit/GapElement";
import ImageElement from "components/edit//ImageElement";

// Type
import { ContentItem } from "type/contentDataType";

interface Props {
  data: ContentItem;
}

interface StyledProps {
  focus: boolean;
}

function Viewer({ data }: Props) {
  const action = useContentAction();
  const [currentItem, setCurrentItem] = useCurrentItem();

  const onRanderElement = () => {
    switch (data.sort) {
      case "TITLE": {
        return <TextElement data={data} onUpdateHandler={onUpdateHandler} />;
      }
      case "TEXT": {
        return <TextElement data={data} onUpdateHandler={onUpdateHandler} />;
      }
      case "IMG": {
        return <ImageElement data={data} />;
      }
      case "GAP": {
        return <GapElement data={data} />;
      }
      default:
        return <>not found contents</>;
    }
  };

  const onUpdateHandler = (updateData: ContentItem) => {
    if (!currentItem) return;
    action.update(updateData, currentItem.id);
  };

  const setSelectItemHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setCurrentItem(data);
  };

  return (
    <Container
      onClick={setSelectItemHandler}
      focus={data.id === currentItem?.id}
    >
      {onRanderElement()}
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
    border: 2px solid red;
    box-sizing: border-box;
    opacity: ${(props) => (props.focus ? 1 : 0)};
    z-index: 999;
    pointer-events: none;
  }
`;
