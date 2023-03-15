import React from "react";
import styled from "styled-components";

// Components
import TitleElement from "components/common/TitleElement";
import TextElement from "components/common/TextElement";

// Type
import { ContentItem } from "type/contentDataType";

interface Props {
  data: ContentItem;
  isFocus: boolean;
  onSetIdHandler: (id: string, item: ContentItem) => void;
  onUpdateHandler: (updateData: ContentItem) => void;
}

interface StyledProps {
  focus: boolean;
}

function Assign({ data, isFocus, onSetIdHandler, onUpdateHandler }: Props) {
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

  const setSelectItemHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onSetIdHandler(data.id, data);
  };

  return (
    <Container onClick={setSelectItemHandler} focus={isFocus}>
      {onRanderElement()}
    </Container>
  );
}

export default Assign;

const Container = styled.div<StyledProps>`
  background: ${(props) => props.focus && "red"};
`;
