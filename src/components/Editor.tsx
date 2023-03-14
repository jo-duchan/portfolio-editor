import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Type
import {
  ContentList,
  ContentItem,
  ContentSort,
  Size,
  Aline,
} from "type/contentDataType";

interface Props {
  data: ContentList;
  isSelect: string;
  onCreateHandler: (sort: ContentSort) => void;
}

interface Option {
  size: Size;
  margin: Size;
  aline: Aline;
}

function Editor({ data, isSelect, onCreateHandler }: Props) {
  const [selectOption, setSelectOption] = useState<Option>({
    size: "S",
    margin: "S",
    aline: "LEFT",
  });

  useEffect(() => {
    if (!isSelect) return;
    console.log(data.filter((item) => item.id === isSelect)[0].option);
    setSelectOption(data.filter((item) => item.id === isSelect)[0].option);
  }, [isSelect]);

  return (
    <Container>
      <Button onClick={() => onCreateHandler("TITLE")}>Title</Button>
      <Button onClick={() => onCreateHandler("TEXT")}>TEXT</Button>
      <select
        value={selectOption.size}
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
