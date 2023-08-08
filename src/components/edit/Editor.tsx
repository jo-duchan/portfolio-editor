import React, { Dispatch } from "react";
import styled from "styled-components";
import useContentValue from "context/useContentValue";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";
import useTopVisualValue from "context/useTopVisualValue";
import { nanoid } from "nanoid";

// Style
import ColorSystem from "styles/color-system";

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
} from "type/contentList";
import { RootOption } from "type/rootOption";

interface Props {
  rootOption: RootOption;
  setRootOption: Dispatch<React.SetStateAction<RootOption>>;
}

function Editor({ rootOption, setRootOption }: Props) {
  const topVisualData = useTopVisualValue();
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

  const onChangeRoot = (value: string, sort: string) => {
    if (sort === "All Color") {
      setRootOption((prev) => {
        return { ...prev, color: value };
      });
    }
    if (sort === "All Fill") {
      setRootOption((prev) => {
        return { ...prev, fill: value };
      });
    }
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

  const onSaveHandler = () => {
    const portfolioItem = {
      // 나중에 UUID로 수정
      id: nanoid(),
      option: rootOption,
      topVisual: topVisualData,
      contentList: data,
    };

    console.log("Save :", portfolioItem);
  };

  return (
    <Container>
      {/* 전체 color, bg-color 수정 input */}
      {currentItem === null && (
        <Input
          label="All Color"
          width="240"
          placeholder="000000"
          maxLength={6}
          value={rootOption.color as string}
          onChange={onChangeRoot}
        />
      )}
      {currentItem === null && (
        <Input
          label="All Fill"
          width="240"
          placeholder="FFFFFF"
          maxLength={6}
          value={rootOption.fill as string}
          onChange={onChangeRoot}
        />
      )}
      {currentItem?.option?.aline && (
        <PillTab
          label="Aline"
          option={["LEFT", "CENTER", "RIGHT"]}
          value={currentItem?.option?.aline as string}
          onChange={onChangeValue}
        />
      )}
      {currentItem?.option?.column && (
        <PillTab
          label="Column"
          option={["1", "2"]}
          value={currentItem?.option?.column as string}
          onChange={onChangeValue}
        />
      )}
      {currentItem?.option?.size && (
        <Select
          label="Size"
          width="240"
          placeholder="사이즈를 선택하세요."
          option={["XS", "S", "M", "L", "XL"]}
          value={currentItem?.option?.size as string}
          onChange={onChangeValue}
        />
      )}
      {currentItem?.option?.gap && (
        <Select
          label="Gap"
          width="240"
          placeholder="공백을 선택하세요."
          option={["XS", "S", "M", "L", "XL"]}
          value={currentItem?.option?.gap as string}
          onChange={onChangeValue}
        />
      )}
      {currentItem?.option?.margin && (
        <Select
          label="Margin"
          width="240"
          placeholder="마진을 선택하세요."
          option={["NONE", "XS", "S", "M", "L", "XL"]}
          value={currentItem?.option?.margin as string}
          onChange={onChangeValue}
        />
      )}

      {currentItem?.option?.color !== undefined && (
        <Input
          label="Color"
          width="240"
          placeholder="000000"
          maxLength={6}
          value={currentItem?.option?.color as string}
          onChange={onChangeValue}
        />
      )}
      {currentItem?.option?.fill !== undefined && (
        <Input
          label="Fill"
          width="240"
          placeholder="FFFFFF"
          maxLength={6}
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
          onClick={onSaveHandler}
          fixedWidth
        />
      </div>
    </Container>
  );
}

export default Editor;

const Container = styled.div`
  position: relative;
  padding: 30px 20px;
  background: ${ColorSystem.Neutral[0]};
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
