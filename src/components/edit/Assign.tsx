import React from "react";
import styled from "styled-components";

// Components
import TitleElement from "components/common/TitleElement";
import TextElement from "components/common/TextElement";

// Type
import { ContentItem } from "type/contentDataType";

interface Props {
  data: ContentItem;
  onSetIdHandler: (id: string) => void;
  isFocus: boolean;
}

interface StyledProps {
  focus: boolean;
}

function Assign({ data, onSetIdHandler, isFocus }: Props) {
  const onRanderElement = () => {
    switch (data.sort) {
      case "TITLE": {
        return <TitleElement data={data} />;
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

  return (
    <Container
      onClick={(e) => {
        onSetIdHandler(data.id);
        e.stopPropagation();
      }}
      focus={isFocus}
    >
      {onRanderElement()}
    </Container>
  );
}

export default Assign;

const Container = styled.div<StyledProps>`
  background: ${(props) => props.focus && "red"};
`;
