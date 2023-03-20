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
  margin: MarginSize;
}

interface StyledContent {
  margin: MarginSize;
}

function ImageElement({ data }: Props) {
  return (
    <Container fill={data.option.fill!} margin={data.option.margin!}>
      <UploadButton></UploadButton>
      {/* <Content src={data.content.url!} margin={data.option.margin!} /> */}
    </Container>
  );
}

export default ImageElement;

const Container = styled.div<StyledContainer>`
  display: flex;
  width: auto;
  background: ${(props) => `#${props.fill}`};
  padding-inline: ${(props) => `${marginStylePC(props.margin)}`};
  box-sizing: border-box;
`;

const Content = styled.img<StyledContent>`
  width: 100%;
  padding-inline: ${(props) => `${marginStylePC(props.margin)}`};
  box-sizing: border-box;
`;

const UploadButton = styled.div`
  width: 100%;
  height: 400px;
  background: gray;
`;
