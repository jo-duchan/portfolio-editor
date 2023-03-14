import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Type
import { ContentList, ContentItem } from "type/contentDataType";

interface Props {
  data: ContentList;
  isSelect: string;
  onCreateHandler: (createData: ContentItem) => void;
}

function Editor({ data, isSelect, onCreateHandler }: Props) {
  const [selectItem, setSelectItem] = useState<ContentItem | null>(null);

  useEffect(() => {
    if (!isSelect && !selectItem) return;
    setSelectItem(data.filter((item) => item.id === isSelect)[0]);
  }, [isSelect]);

  const onCreateTitle = () => {
    const CreateData: ContentItem = {
      id: Math.random().toString(),
      sort: "TITLE",
      content: {
        text: "Enter the Title here.",
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

  const onCreateText = () => {
    const CreateData: ContentItem = {
      id: Math.random().toString(),
      sort: "TEXT",
      content: {
        text: "Enter the Text here.",
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
      <Button onClick={onCreateTitle}>Title</Button>
      <Button onClick={onCreateText}>TEXT</Button>
      <select
        value={selectItem ? selectItem.option.size : "XS"}
        onChange={(e) => console.log(e.target.value)}
      >
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
    </Container>
  );
}

export default Editor;

const Container = styled.div`
  /* display: flex;
  align-self: flex-end;
  justify-self: end; */
  margin-left: auto;
  width: 200px;
  height: 100vh;
  background: blue;
`;

const Button = styled.button`
  width: 100px;
  height: 100px;
  box-sizing: border-box;
`;
