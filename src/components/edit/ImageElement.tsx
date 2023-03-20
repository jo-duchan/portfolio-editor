import React from "react";
import styled from "styled-components";

// Style
import { marginStylePC } from "styles/margin";

// Type
import { ContentItem, MarginSize } from "type/contentDataType";

interface Props {
  data: ContentItem;
}

interface StyledContainer {
  fill: string;
}

interface StyledContent {
  margin: MarginSize;
}

function ImageElement({ data }: Props) {
  return (
    <Container fill={data.option.fill!}>
      <Content src={data.content.url!} margin={data.option.margin!} />
    </Container>
  );
}

export default ImageElement;

const Container = styled.div<StyledContainer>`
  display: flex;
  width: auto;
  background: ${(props) => `#${props.fill}`};
`;

const Content = styled.img<StyledContent>`
  width: 100%;
  padding-inline: ${(props) => `${marginStylePC(props.margin)}`};
  box-sizing: border-box;
`;
