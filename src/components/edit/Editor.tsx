import React from "react";
import styled from "styled-components";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// Type
import { ContentItem, FontSize, MarginSize, Aline } from "type/contentDataType";

type Option = "FONT" | "MARGIN" | "ALINE";

function Editor() {
  const action = useContentAction();
  const [currentItem, setCurrentItem] = useCurrentItem();

  const onChangeValue = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: Option
  ) => {
    if (!currentItem) return;
    const updateItme = currentItem;
    switch (type) {
      case "FONT": {
        updateItme.option.size = e.currentTarget.value as FontSize;
        break;
      }
      case "MARGIN": {
        updateItme.option.margin = e.currentTarget.value as MarginSize;
        break;
      }
      case "ALINE": {
        updateItme.option.aline = e.currentTarget.value as Aline;
        break;
      }
    }
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
    <Container onClick={(e) => e.stopPropagation()}>
      {/* Select Component로 만들자 onClick 이벤트 버블링 컴포넌트로 넣기*/}
      <div className="size">
        <span>Size</span>
        <select
          value={currentItem?.option?.size}
          onChange={(e) => onChangeValue(e, "FONT")}
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
          onChange={(e) => onChangeValue(e, "MARGIN")}
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
          onChange={(e) => onChangeValue(e, "ALINE")}
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
