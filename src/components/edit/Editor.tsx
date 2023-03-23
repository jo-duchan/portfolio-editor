import React from "react";
import styled from "styled-components";
import useContentValue from "context/useContentValue";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// UI Components
import Select from "components/ui/Select";
import PillTab from "components/ui/PillTab";
import Input from "components/ui/Input";
import Button from "components/ui/Button";

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
  const data = useContentValue();
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
    data.forEach((item, idx) => {
      if (item.id === currentItem.id) {
        action.delete(currentItem.id);
        setCurrentItem(data[idx - 1]);
        return;
      }
    });
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
      <div className="action-wrapper">
        <Button
          label="Delete"
          btnType="SECONDARY"
          states={currentItem ? "DEFAULT" : "DISABLED"}
          size="MEDIUM"
          onClick={onDeletHandler}
          fixedWidth
        />
        <Button
          label="Save"
          btnType="PRIMARY"
          size="MEDIUM"
          onClick={() => console.log("Click")}
          fixedWidth
        />
      </div>
      {/* <button type="button" onClick={onDeletHandler} disabled={!currentItem}>
        삭제
      </button>
      <button type="button" disabled>
        미리보기
      </button>
      <button type="button" disabled>
        저장하기
      </button> */}
    </Container>
  );
}

export default Editor;

const Container = styled.div`
  position: relative;
  padding: 30px 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: fit-content;
  border-radius: 6px;

  & .action-wrapper {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
`;
