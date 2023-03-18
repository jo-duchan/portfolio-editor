import React from "react";
import styled from "styled-components";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// Type
import { ContentItem, FontSize, MarginSize, Aline } from "type/contentDataType";

function Editor() {
  const action = useContentAction();
  const [currentItem, setCurrentItem] = useCurrentItem();

  const onChangeFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!currentItem) return;
    const updateItme = currentItem;
    updateItme.option.size = e.currentTarget.value as FontSize;
    onChangeHandler(updateItme, currentItem.id);
  };

  const onChangeMargin = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!currentItem) return;
    const updateItme = currentItem;
    updateItme.option.margin = e.currentTarget.value as MarginSize;
    onChangeHandler(updateItme, currentItem.id);
  };

  const onChangeAline = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!currentItem) return;
    const updateItme = currentItem;
    updateItme.option.aline = e.currentTarget.value as Aline;
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
      <div className="size">
        <span>Size</span>
        <select
          value={currentItem?.option?.size}
          onChange={onChangeFontSize}
          disabled={!currentItem}
        >
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>
      <div className="margin">
        <span>margin</span>
        <select
          value={currentItem?.option?.margin}
          onChange={onChangeMargin}
          disabled={!currentItem}
        >
          <option value="NONE">NONE</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>
      <div className="margin">
        <span>aline</span>
        <select
          value={currentItem?.option?.aline}
          onChange={onChangeAline}
          disabled={!currentItem}
        >
          <option value="LEFT">Left</option>
          <option value="CENTER">Center</option>
          <option value="RIGHT">Right</option>
        </select>
      </div>
      <button type="button" onClick={onDeletHandler} disabled={!currentItem}>
        삭제
      </button>
    </Container>
  );
}

export default Editor;

const Container = styled.div`
  padding: 10px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;

  & :is(.size, .margin) {
    display: flex;
    gap: 10px;
  }

  & div select {
    width: 60px;
  }
`;
