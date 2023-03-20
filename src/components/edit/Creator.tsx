import React, { useRef } from "react";
import styled from "styled-components";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// Type
import { ContentItem, ContentSort } from "type/contentDataType";

function Creator() {
  const action = useContentAction();
  const [currentItem, setCurrentItem] = useCurrentItem();

  const onCreateHandler = (createData: ContentItem) => {
    action.create(createData, currentItem?.id);
    setCurrentItem(createData);
  };

  const onCreateText = (sort: ContentSort) => {
    const CreateData: ContentItem = {
      id: Math.random().toString(),
      sort: sort,
      content: {
        text: "",
        url: undefined,
      },
      option: {
        size: "S",
        margin: "NONE",
        aline: "LEFT",
        gap: undefined,
      },
    };
    onCreateHandler(CreateData);
  };

  const onCreateGap = () => {
    const CreateData: ContentItem = {
      id: Math.random().toString(),
      sort: "GAP",
      content: {
        text: undefined,
        url: undefined,
      },
      option: {
        size: undefined,
        margin: undefined,
        aline: undefined,
        gap: "XS",
      },
    };
    onCreateHandler(CreateData);
  };

  const fileInput = useRef<HTMLInputElement | null>(null);

  const onCreateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const url = URL.createObjectURL(fileList[0]);

      const CreateData: ContentItem = {
        id: Math.random().toString(),
        sort: "IMG",
        content: {
          text: undefined,
          url: url,
        },
        option: {
          size: undefined,
          margin: "NONE",
          aline: undefined,
          gap: undefined,
        },
      };
      onCreateHandler(CreateData);
      e.target.value = "";
    }
  };

  return (
    <Container>
      <Button onClick={() => onCreateText("TITLE")}>Title</Button>
      <Button onClick={() => onCreateText("TEXT")}>Text</Button>
      <Button onClick={onCreateGap}>Gap</Button>
      <label className="FileButton">
        image
        <input
          ref={fileInput}
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          className="File"
          onChange={onCreateImage}
        />
      </label>
    </Container>
  );
}

export default Creator;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  width: 100%;
  height: auto;
  background: gray;
  padding: 4px;
  box-sizing: border-box;
  & .File {
    display: none;
  }

  & .FileButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 94px;
    height: 94px;
    box-sizing: border-box;
    background: #ececec;
  }
`;

const Button = styled.button`
  width: 94px;
  height: 94px;
  box-sizing: border-box;
  background: #ececec;
  border: none;
`;
