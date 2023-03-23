import React from "react";
import styled from "styled-components";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// UI Components
import Select from "components/ui/Select";
import PillTab from "components/ui/PillTab";
import Input from "components/ui/Input";

// Type
import {
  ContentItem,
  FontSize,
  MarginSize,
  Aline,
  Gap,
  Colume,
} from "type/contentDataType";

function Editor() {
  const action = useContentAction();
  const [currentItem, setCurrentItem] = useCurrentItem();

  const onChangeValue = (value: string, sort: string) => {
    if (!currentItem || value === undefined) return;
    const updateItme = currentItem;

    switch (sort) {
      case "Size": {
        updateItme.option.size = value as FontSize;
        break;
      }
      case "Margin": {
        updateItme.option.margin = value as MarginSize;
        break;
      }
      case "Aline": {
        updateItme.option.aline = value as Aline;
        break;
      }
      case "Gap": {
        updateItme.option.gap = value as Gap;
        break;
      }
      case "Column": {
        updateItme.option.column = value as Colume;
        break;
      }
      case "Fill": {
        updateItme.option.fill = value as string;
        break;
      }
      case "Color": {
        updateItme.option.color = value as string;
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
      {(currentItem?.sort === "TITLE" || currentItem?.sort === "TEXT") && (
        <PillTab
          label="Aline"
          option={["LEFT", "CENTER", "RIGHT"]}
          value={currentItem?.option?.aline as string}
          onChange={onChangeValue}
        />
      )}
      {currentItem?.sort === "IMG" && (
        <PillTab
          label="Column"
          option={["1", "2"]}
          value={currentItem?.option?.column as string}
          onChange={onChangeValue}
        />
      )}
      {(currentItem?.sort === "TITLE" || currentItem?.sort === "TEXT") && (
        <Select
          label="Size"
          width="240"
          placeholder="사이즈를 선택하세요."
          option={["XS", "S", "M", "L", "XL"]}
          value={currentItem?.option?.size as string}
          onChange={onChangeValue}
        />
      )}
      {currentItem?.sort === "GAP" && (
        <Select
          label="Gap"
          width="240"
          placeholder="공백을 선택하세요."
          option={["XS", "S", "M", "L", "XL"]}
          value={currentItem?.option?.gap as string}
          states={currentItem?.option?.gap ? "DEFAULT" : "DISABLED"}
          onChange={onChangeValue}
        />
      )}
      {(currentItem?.sort === "TITLE" ||
        currentItem?.sort === "TEXT" ||
        currentItem?.sort === "IMG") && (
        <Select
          label="Margin"
          width="240"
          placeholder="마진을 선택하세요."
          option={["NONE", "XS", "S", "M", "L", "XL"]}
          value={currentItem?.option?.margin as string}
          onChange={onChangeValue}
        />
      )}

      {(currentItem?.sort === "TITLE" || currentItem?.sort === "TEXT") && (
        <Input
          label="Color"
          width="240"
          placeholder="글자색을 입력하세요."
          value={currentItem?.option?.color as string}
          onChange={onChangeValue}
        />
      )}
      {(currentItem?.sort === "TITLE" ||
        currentItem?.sort === "TEXT" ||
        currentItem?.sort === "IMG" ||
        currentItem?.sort === "GAP") && (
        <Input
          label="Fill"
          width="240"
          placeholder="배경색을 입력하세요."
          value={currentItem?.option?.fill as string}
          onChange={onChangeValue}
        />
      )}
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
  padding: 30px 15px;
  /* color: #fff;
  background: gray; */
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: fit-content;
`;
