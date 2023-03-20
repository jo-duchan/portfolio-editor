import React from "react";
import styled from "styled-components";

// Style
import { marginStylePC } from "styles/margin";

// Type
import { ContentItem, MarginSize } from "type/contentDataType";

interface Props {
  data: ContentItem;
}

interface StyledProps {
  margin: MarginSize;
}

function ImageElement({ data }: Props) {
  return (
    <Container margin={data.option.margin!}>
      <Content src={data.content.url!} />
    </Container>
  );
}

export default ImageElement;

const Container = styled.div<StyledProps>`
  display: flex;
  width: auto;
  margin-inline: ${(props) => `${marginStylePC(props.margin)}`};
`;

const Content = styled.img`
  width: 100%;
`;
