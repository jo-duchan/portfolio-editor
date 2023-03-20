import React from "react";
import styled from "styled-components";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// Type
import {
  ContentItem,
  FontSize,
  MarginSize,
  Aline,
  Gap,
} from "type/contentDataType";

type Option = "FONT" | "MARGIN" | "ALINE" | "GAP" | "COLOR" | "FILL";

function Editor() {
  const action = useContentAction();
  const [currentItem, setCurrentItem] = useCurrentItem();

  const onChangeValue = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
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
      case "GAP": {
        updateItme.option.gap = e.currentTarget.value as Gap;
        break;
      }
      case "FILL": {
        updateItme.option.fill = e.currentTarget.value as string;
        break;
      }
      case "COLOR": {
        updateItme.option.color = e.currentTarget.value as string;
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
    <Container>
      {/* Select Component로 만들자 onClick 이벤트 버블링 컴포넌트로 넣기*/}
      <div className="size">
        <span>Size</span>
        <select
          value={currentItem?.option?.size}
          onChange={(e) => onChangeValue(e, "FONT")}
          disabled={!currentItem?.option?.size}
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
          disabled={!currentItem?.option?.margin}
        >
          <option value="NONE">NONE</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>
      <div className="aline">
        <span>aline</span>
        <select
          value={currentItem?.option?.aline}
          onChange={(e) => onChangeValue(e, "ALINE")}
          disabled={!currentItem?.option?.aline}
        >
          <option value="LEFT">Left</option>
          <option value="CENTER">Center</option>
          <option value="RIGHT">Right</option>
        </select>
      </div>
      <div className="gap">
        <span>gap</span>
        <select
          value={currentItem?.option?.gap}
          onChange={(e) => onChangeValue(e, "GAP")}
          disabled={!currentItem?.option?.gap}
        >
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>
      <div className="fill">
        <label>
          fill
          <input
            type="text"
            value={currentItem?.option?.fill || ""}
            onChange={(e) => onChangeValue(e, "FILL")}
            // disabled={!currentItem?.option?.fill}
          />
        </label>
      </div>
      <div className="color">
        <label>
          color
          <input
            type="text"
            value={currentItem?.option?.color || ""}
            onChange={(e) => onChangeValue(e, "COLOR")}
            // disabled={!currentItem?.option?.fill}
          />
        </label>
      </div>
      <button type="button" onClick={onDeletHandler} disabled={!currentItem}>
        삭제
      </button>
      <button type="button" disabled>
        미리보기
      </button>
      <button type="button" disabled>
        저장하기
      </button>
    </Container>
  );
}

export default Editor;

const Container = styled.div`
  background: gray;
  padding: 15px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & :is(.size, .margin, .aline, .gap) {
    display: flex;
    gap: 10px;
  }

  & :is(.fill, .color) label {
    display: flex;
    gap: 10px;
  }

  & :is(.fill, .color) label input {
    width: 60px;
  }

  & div select {
    width: 60px;
  }
`;
