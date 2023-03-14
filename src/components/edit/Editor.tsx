import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Type
import { ContentList, ContentItem, ContentSort } from "type/contentDataType";

interface Props {
  data: ContentList;
  isSelect: string;
  onCreateHandler: (sort: ContentSort) => void;
}

function Editor({ data, isSelect, onCreateHandler }: Props) {
  const [selectOption, setSelectOption] = useState<ContentItem | null>(null);

  useEffect(() => {
    if (!isSelect && !selectOption) return;
    setSelectOption(data.filter((item) => item.id === isSelect)[0]);
  }, [isSelect]);

  return (
    <Container>
      <Button onClick={() => onCreateHandler("TITLE")}>Title</Button>
      <Button onClick={() => onCreateHandler("TEXT")}>TEXT</Button>
      <select
        value={selectOption ? selectOption.option.size : "XS"}
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
