import React from "react";
import styled from "styled-components";
import { ContentItem } from "type/portfolio";
import { MarginSize } from "type/option";
import { MarginPC } from "styles/margin";

interface Props {
  data: ContentItem;
  onUpload?: (index: number) => React.ReactNode;
}

interface StyledContainer {
  fill: string;
  margin: MarginSize;
}

interface StyledContent {
  cloumn: number;
}

function ImageElement({ data, onUpload }: Props) {
  const columnNumber = parseInt(data.option.column as string);

  return (
    <Container
      fill={data.option.fill!}
      margin={data.option.margin!}
      onClickCapture={(e) => e.stopPropagation()}
    >
      {[...Array(columnNumber)].map((x, i) => (
        <Content key={i} cloumn={columnNumber}>
          {data.content!.image![i]?.file ? (
            <img src={data.content!.image![i].file} alt="이미지" />
          ) : (
            onUpload && onUpload(i)
          )}
        </Content>
      ))}
    </Container>
  );
}

export default ImageElement;

const Container = styled.div<StyledContainer>`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  width: auto;
  background: ${({ fill }) => `#${fill}`};
  padding-inline: ${({ margin }) => `${MarginPC[margin]}`};
  box-sizing: border-box;
  pointer-events: none;
`;

const Content = styled.div<StyledContent>`
  width: ${({ cloumn }) => `calc(100% /${cloumn})`};

  & img {
    display: block;
    width: 100%;
  }
`;
