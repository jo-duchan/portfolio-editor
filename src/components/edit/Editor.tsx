import React, { useEffect } from "react";
import styled from "styled-components";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// Type
import { ContentItem } from "type/contentDataType";

function Editor() {
  const action = useContentAction();
  const [currentItem, setCurrentItem] = useCurrentItem();

  const onChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!currentItem) return;
    const updateItme = currentItem;
    updateItme.option.size = e.currentTarget.value;
    onChangeHandler(updateItme, currentItem.id);
  };

  const onChangeHandler = (updateItme: ContentItem, id: string) => {
    action.update(updateItme, id);
  };

  const onDeletHandler = () => {
    if (!currentItem) return console.log("대상없음");
    action.delete(currentItem.id);
    console.log("삭제");
  };

  return (
    <Container>
      Editor:
      <select value={currentItem?.option?.size} onChange={onChangeSize}>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
      {/* 삭제는 viewer 밑에 컴포넌트로 이동시키자 */}
      <button type="button" onClick={onDeletHandler}>
        삭제
      </button>
    </Container>
  );
}

export default Editor;

const Container = styled.div`
  padding: 10px;
  color: #fff;
`;
