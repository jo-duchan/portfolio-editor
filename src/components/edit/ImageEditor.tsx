import React, { useEffect } from "react";
import styled from "styled-components";
import Utils from "utils/Utils";
import IconSet from "components/ui/IconSet";
import ImageElement from "components/common/ImageElement";
import ColorSystem from "styles/color-system";
import { Image } from "type/common";
import { ContentItem } from "type/portfolio";

interface Props {
  data: ContentItem;
  onUpdateHandler: (updateData: ContentItem) => void;
}

function ImageEditor({ data, onUpdateHandler }: Props) {
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

  const renderUploadHandler = (index: number) => {
    return (
      <UploadButton>
        <label>
          <IconSet type="ADD_IMG" />
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/webp"
            onChange={(e) => onCreateImage(e, index)}
          />
        </label>
      </UploadButton>
    );
  };

  return <ImageElement data={data} onUpload={renderUploadHandler} />;
}

export default ImageEditor;

const UploadButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25rem;
  background: ${ColorSystem.Neutral[200]};

  & label {
    pointer-events: all;
    padding: 0.625rem;
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
