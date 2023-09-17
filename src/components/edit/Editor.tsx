import React from "react";
import styled from "styled-components";
import useContentValue from "context/useContentValue";
import useContentAction from "context/useContentAction";
import ColorSystem from "styles/color-system";
import Select from "components/ui/Select";
import PillTab from "components/ui/PillTab";
import Input from "components/ui/Input";
import Button from "components/ui/Button";
import { ContentList } from "type/portfolio";
import { Root } from "type/option";

interface Props {
  rootOption: Root;
  setRootOption: React.Dispatch<React.SetStateAction<Root>>;
  currentItemId: string | null;
  setCurrentItemId: React.Dispatch<React.SetStateAction<string | null>>;
  onSubmit: (option: Root, contentList: ContentList) => void;
}

function Editor({
  rootOption,
  setRootOption,
  currentItemId,
  setCurrentItemId,
  onSubmit,
}: Props) {
  const data = useContentValue();
  const action = useContentAction();

  const foundCurrentItem = () => {
    if (!currentItemId) return null;
    const item = data.find((item) => item.id === currentItemId);
    const aline = item?.option.aline;
    const column = item?.option.column;
    const size = item?.option.size;
    const gap = item?.option.gap;
    const margin = item?.option.margin;
    const color = item?.option.color;
    const fill = item?.option.fill;
    return { item, aline, column, size, gap, margin, color, fill };
  };

  const changeOptionHandler = (value: string, sort: string) => {
    const updateItem = foundCurrentItem()?.item;
    if (!updateItem) return;
    const key = sort.toLocaleLowerCase();
    updateItem.option[key] = value;

    action.update(updateItem, updateItem.id);
  };

  const changeRootOptionHandler = (value: string, sort: string) => {
    const sortOut = sort.replace("All ", "").toLocaleLowerCase();

    setRootOption((prev) => {
      const newOption = { ...prev };
      newOption[sortOut] = value;
      return newOption;
    });
  };

  const deletHandler = () => {
    data.forEach((item, idx) => {
      if (item.id === currentItemId) {
        action.delete(currentItemId);
        setCurrentItemId(data[idx - 1].id);
        return;
      }
    });
  };

  const saveHandler = () => {
    onSubmit(rootOption, data);
  };

  return (
    <Container>
      {!currentItemId && (
        <Input
          label="All Color"
          width="240"
          placeholder="000000"
          maxLength={6}
          value={rootOption.color as string}
          onChange={changeRootOptionHandler}
        />
      )}
      {!currentItemId && (
        <Input
          label="All Fill"
          width="240"
          placeholder="FFFFFF"
          maxLength={6}
          value={rootOption.fill as string}
          onChange={changeRootOptionHandler}
        />
      )}
      {foundCurrentItem()?.aline && (
        <PillTab
          label="Aline"
          option={["LEFT", "CENTER", "RIGHT"]}
          value={foundCurrentItem()?.aline as string}
          onChange={changeOptionHandler}
        />
      )}
      {foundCurrentItem()?.column && (
        <PillTab
          label="Column"
          option={["1", "2"]}
          value={foundCurrentItem()?.column as string}
          onChange={changeOptionHandler}
        />
      )}
      {foundCurrentItem()?.size && (
        <Select
          label="Size"
          width="240"
          placeholder="사이즈를 선택하세요."
          option={["XS", "S", "M", "L", "XL"]}
          value={foundCurrentItem()?.size as string}
          onChange={changeOptionHandler}
        />
      )}
      {foundCurrentItem()?.gap && (
        <Select
          label="Gap"
          width="240"
          placeholder="공백을 선택하세요."
          option={["XS", "S", "M", "L", "XL"]}
          value={foundCurrentItem()?.gap as string}
          onChange={changeOptionHandler}
        />
      )}
      {foundCurrentItem()?.margin && (
        <Select
          label="Margin"
          width="240"
          placeholder="마진을 선택하세요."
          option={["NONE", "XS", "S", "M", "L", "XL"]}
          value={foundCurrentItem()?.margin as string}
          onChange={changeOptionHandler}
        />
      )}

      {foundCurrentItem()?.color !== undefined && (
        <Input
          label="Color"
          width="240"
          placeholder="000000"
          maxLength={6}
          value={foundCurrentItem()?.color as string}
          onChange={changeOptionHandler}
        />
      )}
      {foundCurrentItem()?.fill !== undefined && (
        <Input
          label="Fill"
          width="240"
          placeholder="FFFFFF"
          maxLength={6}
          value={foundCurrentItem()?.fill as string}
          onChange={changeOptionHandler}
        />
      )}
      <div className="action-wrapper">
        <Button
          label="Delete"
          btnType="SECONDARY"
          states={currentItemId ? "DEFAULT" : "DISABLED"}
          size="MEDIUM"
          onClick={deletHandler}
          fixedWidth
        />
        <Button
          label="Save"
          btnType="PRIMARY"
          size="MEDIUM"
          onClick={saveHandler}
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
