import React, { useEffect } from "react";
import styled from "styled-components";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// Type
import { ContentItem } from "type/contentDataType";

function Editor() {
  const action = useContentAction();
  const [currentItem, setCurrentItem] = useCurrentItem();

  const onClickHandler = () => {
    console.log(currentItem?.content?.text);
  };

  const onChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!currentItem) return;
    const updateItme = currentItem;
    updateItme.option.size = e.currentTarget.value;
    onChangeHandler(updateItme, currentItem.id);
  };

  const onChangeHandler = (updateItme: ContentItem, id: string) => {
    action.update(updateItme, id);
  };

  return (
    <Container onClick={onClickHandler}>
      Editor:
      <select value={currentItem?.option?.size} onChange={onChangeSize}>
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
  padding: 10px;
  color: #fff;
`;
