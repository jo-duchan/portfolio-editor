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
    setCurrentItem(createData);
    if (!currentItem) return;
    action.create(createData, currentItem.id);
  };

  const onCreateText = (sort: ContentSort) => {
    const CreateData: ContentItem = {
      id: Math.random().toString(),
      sort: sort,
      content: {
        text: `Enter the ${sort} here.`,
        url: "",
      },
      option: {
        size: "S",
        margin: "NONE",
        aline: "LEFT",
      },
    };
    onCreateHandler(CreateData);
  };

  return (
    <Container>
      <Button onClick={() => onCreateText("TITLE")}>Title</Button>
      <Button onClick={() => onCreateText("TEXT")}>Text</Button>
      <Button>Gap</Button>
      <Button>Image</Button>
    </Container>
  );
}

export default Creator;

const Container = styled.div`
  width: 100%;
  height: auto;
`;

const Button = styled.button`
  width: 100px;
  height: 100px;
  box-sizing: border-box;
`;
