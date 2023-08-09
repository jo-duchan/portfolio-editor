import React, { useEffect } from "react";
import styled from "styled-components";
import Utils from "utils/Utils";
import IconSet from "components/ui/IconSet";
import ColorSystem from "styles/color-system";
import { Image, Assets } from "type/topVisual";

interface Props {
  value: Assets;
  onUpdate: React.Dispatch<React.SetStateAction<Assets>>;
}

type List = {
  [key: string]: string;
};

const labelList: List = {
  clientLogo: "Client Logo",
  CoverPC: "Cover IMG PC",
  CoverMO: "Cover IMG MO",
};

function ImageInput({ value, onUpdate }: Props) {
  useEffect(() => {
    // init
    onUpdate({
      clientLogo: {} as Image,
      CoverPC: {} as Image,
      CoverMO: {} as Image,
    });
  }, []);

  const onCreateImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const getFile = e.target.files;
    if (!getFile) return;

    const typeLength = getFile[0].type.length;
    const updateData = {
      file: await Utils.convertBase64(getFile[0]),
      type: getFile[0].type.slice(6, typeLength),
    } as Image;

    onUpdateHandler(updateData, key);
  };

  const onDeleteHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: string
  ) => {
    e.stopPropagation();

    onUpdateHandler({} as Image, key);
  };

  const onUpdateHandler = (updateData: Image, key: string) => {
    onUpdate((prev) => {
      const newData = { ...prev };
      newData[key] = updateData;

      return newData;
    });
  };

  return (
    <Container>
      <Label>Assets</Label>
      <ContentWrapper>
        <ContentInner>
          {Object.entries(value).map(([key, item]) => (
            <Uploader key={key}>
              {item.file ? (
                <div className="img-wrapper">
                  <DeleteButton onClick={(e) => onDeleteHandler(e, key)}>
                    <IconSet type="CLOSE" />
                  </DeleteButton>
                  <img src={item.file} alt="이미지" />
                </div>
              ) : (
                <label className="uploader">
                  <IconSet type="ADD_IMG" />
                  <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png, image/webp"
                    onChange={(e) => onCreateImage(e, key)}
                  />
                </label>
              )}
              <span className="uploader-label">{labelList[key]}</span>
            </Uploader>
          ))}
        </ContentInner>
      </ContentWrapper>
    </Container>
  );
}

export default ImageInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${ColorSystem.Neutral[900]};
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 120px;
  background: ${ColorSystem.Neutral[100]};
  border-radius: 12px;
  padding: 12px;
  box-sizing: border-box;
  overflow: auto hidden;
`;

const ContentInner = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  gap: 16px;
`;

const Uploader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: fit-content;
  height: 100%;

  & input {
    display: none;
  }

  & .img-wrapper {
    position: relative;
    height: calc(100% - 16px);
  }

  & img {
    display: block;
    width: auto;
    max-width: 150px;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
    margin: 0 auto;
  }

  & .uploader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100%;
    background: ${ColorSystem.Neutral[250]};
    border-radius: 6px;
    cursor: pointer;
  }

  & .uploader svg {
    width: 36px;
  }

  & .uploader svg path {
    fill: ${ColorSystem.Neutral[500]};
    transition: 200ms ease-in-out;
    transition-property: fill;
  }

  &:hover .uploader svg path {
    fill: ${ColorSystem.Primary[600]};
  }

  & .uploader-label {
    text-align: center;
    margin: 0 auto;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
  }
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(-30%, -30%, 0);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${ColorSystem.Secondary[400]};
  opacity: 0;
  z-index: 50;
  pointer-events: none;
  transition: 200ms ease-in-out;
  transition-property: opacity;
  cursor: pointer;

  & svg {
    width: 10px;
  }

  & svg path {
    fill: ${ColorSystem.Neutral[0]};
  }

  ${Uploader}:hover & {
    opacity: 1;
    pointer-events: all;
  }

  &:active {
    background: ${ColorSystem.Secondary[600]};
  }
`;
