import React, { useEffect } from "react";
import styled from "styled-components";
import useTopVisualValue from "context/useTopVisualValue";
import useTopVisualAction from "context/useTopVisualAction";
import Utils from "utils/Utils";

// Components
import IconSet from "components/ui/IconSet";

// Style
import ColorSystem from "styles/color-system";

// Type
import { Image } from "type/topVisual";

function ImageInput() {
  const value = useTopVisualValue();
  const action = useTopVisualAction();

  const onCreateImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const getFile = e.target.files;
    if (!getFile) return;

    const typeLength = getFile[0].type.length;
    const newImage = {
      label: value.assets[key].label,
      file: await Utils.convertBase64(getFile[0]),
      type: getFile[0].type.slice(6, typeLength),
    } as Image;

    onUpdateHandler(newImage, key);
  };

  useEffect(() => {
    console.log(value.assets);
  }, [value.assets]);

  const onDeleteHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: string
  ) => {
    e.stopPropagation();
    const newImage = {
      label: value.assets[key].label,
    } as Image;
    onUpdateHandler(newImage, key);
  };

  const onUpdateHandler = (newData: Image, key: string) => {
    action((prev) => {
      const updateData = { ...prev };
      updateData.assets[key] = newData;

      return updateData;
    });
  };

  return (
    <Container>
      <Label>Assets</Label>
      <ContentWrapper>
        <ContentInner>
          {Object.entries(value.assets).map(([key, item]) => (
            <Uploader key={key}>
              {item.file ? (
                <div className="img-wrapper">
                  <DeleteButton onClick={(e) => onDeleteHandler(e, key)}>
                    <IconSet type="CLOSE" />
                  </DeleteButton>
                  {/* <img src={item.preview} alt="이미지" /> */}
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
              <span className="uploader-label">{item.label}</span>
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
