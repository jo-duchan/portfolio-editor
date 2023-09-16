import React, { useEffect } from "react";
import styled from "styled-components";
import Utils from "utils/Utils";
import IconSet from "components/ui/IconSet";
import ColorSystem from "styles/color-system";
import { marginStylePC } from "styles/margin";
import { Image } from "type/common";
import { ContentItem } from "type/portfolio";
import { MarginSize } from "type/option";

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

  const onCreateImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const getFile = e.target.files;
    if (!getFile) return;

    const typeLength = getFile[0].type.length;
    const newImage = {
      file: await Utils.convertBase64(getFile[0]),
      type: getFile[0].type.slice(6, typeLength),
    } as Image;

    const updateItem = data;
    updateItem.content!.image![i] = newImage;
    onUpdateHandler(updateItem);
  };

  useEffect(() => {
    if (data.option.column === "1" && data.content!.image?.length === 2) {
      const updateItem = data;
      updateItem.content!.image?.splice(1, 1);
      onUpdateHandler(updateItem);
    }
  }, [data.option.column]);

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
            <UploadButton>
              <label>
                <IconSet type="ADD_IMG" />
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
  pointer-events: none;
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
  background: ${ColorSystem.Neutral[200]};

  & label {
    pointer-events: all;
    padding: 10px;
    cursor: pointer;
  }

  & label svg path {
    fill: ${ColorSystem.Neutral[500]};
    transition: 200ms ease-in-out;
    transition-property: fill;
  }

  & label:hover svg path {
    fill: ${ColorSystem.Primary[600]};
  }

  & label:active svg path {
    fill: ${ColorSystem.Primary[700]};
  }

  & input {
    display: none;
  }
`;
