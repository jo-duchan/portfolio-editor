import React from "react";
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
        image: undefined,
      },
      option: {
        size: "S",
        margin: "NONE",
        aline: "LEFT",
        gap: undefined,
        color: "000000",
        fill: "FFFFFF",
        column: undefined,
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
        image: undefined,
      },
      option: {
        size: undefined,
        margin: undefined,
        aline: undefined,
        gap: "XS",
        color: undefined,
        fill: "FFFFFF",
        column: undefined,
      },
    };
    onCreateHandler(CreateData);
  };

  const onCreateImage = () => {
    const CreateData: ContentItem = {
      id: Math.random().toString(),
      sort: "IMG",
      content: {
        text: undefined,
        image: [
          {
            file: {} as File,
            preview: "",
            type: "",
          },
        ],
      },
      option: {
        size: undefined,
        margin: "NONE",
        aline: undefined,
        gap: undefined,
        color: undefined,
        fill: "FFFFFF",
        column: "2",
      },
    };
    onCreateHandler(CreateData);
  };

  return (
    <Container>
      <Button onClick={() => onCreateText("TITLE")}>Title</Button>
      <Button onClick={() => onCreateText("TEXT")}>Text</Button>
      <Button onClick={onCreateGap}>Gap</Button>
      <Button onClick={onCreateImage}>Image</Button>
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
