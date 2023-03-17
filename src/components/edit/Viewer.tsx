import React from "react";
import styled from "styled-components";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// Components
import TitleElement from "components/common/TitleElement";
import TextElement from "components/common/TextElement";

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
        return <TitleElement data={data} onUpdateHandler={onUpdateHandler} />;
      }
      case "TEXT": {
        return <TextElement data={data} />;
      }
      case "IMG": {
        return <div>IMG</div>;
      }
      case "GAP": {
        return <div>GAP</div>;
      }
      default:
        return <>not found contents</>;
    }
  };

  const onUpdateHandler = (updateData: ContentItem) => {
    if (!currentItem) return;
    action.update(updateData, currentItem.id);
    // console.log("update");
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
  background: ${(props) => props.focus && "red"};
`;
