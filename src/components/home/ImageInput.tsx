import React from "react";
import styled from "styled-components";
import useTopVisualValue from "context/useTopVisualValue";
import useTopVisualAction from "context/useTopVisualAction";

// Components
import IconSet from "components/ui/IconSet";

// Style
import ColorSystem from "styles/color-system";

// Type
import { Image } from "type/topVisual";

function ImageInput() {
  const value = useTopVisualValue();
  const action = useTopVisualAction();

  const onCreateImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const getFile = e.target.files;
    if (!getFile) return;
    const url = URL.createObjectURL(getFile[0]);
    const typeLength = getFile[0].type.length;
    const newImage = {
      label: value.assets[key].label,
      file: getFile[0],
      preview: url,
      type: getFile[0].type.slice(6, typeLength),
    } as Image;

    switch (key) {
      case "clientLogo": {
        action((prev) => {
          return {
            ...prev,
            assets: {
              ...prev.assets,
              clientLogo: newImage,
            },
          };
        });
        break;
      }
      case "visualPC": {
        action((prev) => {
          return {
            ...prev,
            assets: {
              ...prev.assets,
              visualPC: newImage,
            },
          };
        });
        break;
      }
      case "visualMO": {
        action((prev) => {
          return {
            ...prev,
            assets: {
              ...prev.assets,
              visualMO: newImage,
            },
          };
        });
        break;
      }
    }
    console.log(value.assets);
  };

  return (
    <Container>
      <Label>Assets</Label>
      <ContentWrapper>
        <ContentInner>
          {Object.entries(value.assets).map(([key, item]) => (
            <Uploader key={key}>
              {item.preview ? (
                <img src={item.preview} alt="이미지" />
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
  overflow: hidden;

  & input {
    display: none;
  }

  & img {
    width: auto;
    height: calc(100% - 16px);
    object-fit: contain;
    border-radius: 4px;
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
    font-size: 12px;
    height: 12px;
    line-height: 12px;
  }
`;
