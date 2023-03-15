import React from "react";
import styled from "styled-components";

// Type
import { ContentItem, ContentSort } from "type/contentDataType";

interface Props {
  onCreateHandler: (createData: ContentItem) => void;
}

function Creator({ onCreateHandler }: Props) {
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
      <Button onClick={() => onCreateText("TEXT")}>TEXT</Button>
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
