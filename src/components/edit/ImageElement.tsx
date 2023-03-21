import React from "react";
import styled from "styled-components";

// Style
import { marginStylePC } from "styles/margin";

// Type
import { ContentItem, MarginSize, Image } from "type/contentDataType";

interface Props {
  data: ContentItem;
  onUpdateHandler: (updateData: ContentItem) => void;
}

interface StyledContainer {
  fill: string;
  margin: MarginSize;
}

interface StyledContent {
  cloumn: number;
}

function ImageElement({ data, onUpdateHandler }: Props) {
  const columnNumber = parseInt(data.option.column as string);

  const onCreateImage = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const getFile = e.target.files;
    console.log(getFile);
    if (!getFile) return;
    const url = URL.createObjectURL(getFile[0]);
    const typeLength = getFile[0].type.length;
    const newImage = {
      file: getFile[0],
      preview: url,
      type: getFile[0].type.slice(6, typeLength),
    } as Image;
    const updateItem = data;
    updateItem.content.image![i] = newImage;
    onUpdateHandler(updateItem);
  };

  return (
    <Container fill={data.option.fill!} margin={data.option.margin!}>
      {[...Array(columnNumber)].map((x, i) => (
        <Content key={Math.random() * i} cloumn={columnNumber}>
          {data.content.image![i]?.preview ? (
            <img src={data.content.image![i].preview} alt="이미지" />
          ) : (
            <UploadButton>
              <label>
                +
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png, image/webp"
                  onChange={(e) => onCreateImage(e, i)}
                />
              </label>
            </UploadButton>
          )}
        </Content>
      ))}
    </Container>
  );
}

export default ImageElement;

const Container = styled.div<StyledContainer>`
  display: flex;
  gap: 24px;
  justify-content: center;
  width: auto;
  background: ${(props) => `#${props.fill}`};
  padding-inline: ${(props) => `${marginStylePC(props.margin)}`};
  box-sizing: border-box;
`;

const Content = styled.div<StyledContent>`
  width: ${(props) => `calc(100% / ${props.cloumn})`};

  & img {
    display: block;
    width: 100%;
  }
`;

const UploadButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
  background: gray;

  & input {
    display: none;
  }
`;
