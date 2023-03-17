import React, { useEffect } from "react";
import styled from "styled-components";
import useContentValue from "context/useContentValue";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

function Editor() {
  const data = useContentValue();
  const [currentItem, setCurrentItem] = useCurrentItem();

  const onClickHandler = () => {
    if (!currentItem) return;
    console.log(data, currentItem);
  };

  return (
    <Container onClick={onClickHandler}>
      Editor: {currentItem?.content.text}
    </Container>
  );
}

export default Editor;

const Container = styled.div`
  padding: 10px;
  color: #fff;
`;
