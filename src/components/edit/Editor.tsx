import styled from "styled-components";
import useContentValue from "context/useContentValue";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";
import { nanoid } from "nanoid";
import ColorSystem from "styles/color-system";
import Select from "components/ui/Select";
import PillTab from "components/ui/PillTab";
import Input from "components/ui/Input";
import Button from "components/ui/Button";
import { ContentList, ContentItem } from "type/portfolio";
import { Root } from "type/option";

interface Props {
  rootOption: Root;
  setRootOption: React.Dispatch<React.SetStateAction<Root>>;
  onSubmit: (option: Root, contentList: ContentList) => void;
}

function Editor({ rootOption, setRootOption, onSubmit }: Props) {
  const data = useContentValue();
  const action = useContentAction();
  const [currentItem, setCurrentItem] = useCurrentItem();

  const onChangeValue = (value: string, sort: string) => {
    if (!currentItem || !value) return;
    const updateItme = currentItem;

    const key = sort.toLocaleLowerCase();
    updateItme.option[key] = value;

    onChangeHandler(updateItme, currentItem.id);
  };

  const onChangeHandler = (updateItme: ContentItem, id: string) => {
    action.update(updateItme, id);
  };

  const onChangeRoot = (value: string, sort: string) => {
    const sortOut = sort.replace("All ", "").toLocaleLowerCase();

    setRootOption((prev) => {
      const newOption = { ...prev };
      newOption[sortOut] = value;
      return newOption;
    });
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
    onSubmit(rootOption, data);
  };

  return (
    <Container>
      {/* 전체 color, bg-color 수정 input */}
      {!currentItem && (
        <Input
          label="All Color"
          width="240"
          placeholder="000000"
          maxLength={6}
          value={rootOption.color as string}
          onChange={onChangeRoot}
        />
      )}
      {!currentItem && (
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
