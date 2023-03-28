import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import useTopVisualValue from "context/useTopVisualValue";

// Style
import ColorSystem from "styles/color-system";

//Type
import { TopVisual } from "type/topVisual";
export type ChipSize = "SMALL" | "MEDIUM";

interface Props {
  index: number;
  onUpdateHandler: (update: TopVisual) => void;
  icon?: string | undefined;
  size?: ChipSize;
}
interface StyledProps {
  isFocus?: boolean;
  paddingLeft: boolean;
  size: ChipSize | undefined;
}

function Chip({ index, onUpdateHandler, size, icon }: Props) {
  const value = useTopVisualValue();
  const text = useRef(value.work[index] as string);
  const inner = useRef<HTMLSpanElement | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const onChangeHandler = (ev: ContentEditableEvent) => {
    text.current = ev.target.value;
  };

  const onPasteHandler = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    text.current = e.clipboardData.getData("text/plain");
    onBlurHandler();
  };

  const onBlurHandler = () => {
    if (text.current === "") return;
    const copyData = value;
    copyData.work[index] = text.current;
    onUpdateHandler(copyData);
    setIsFocus(false);
  };

  const onClickHandler = () => {
    inner.current?.focus();
    inner.current?.setAttribute("spellcheck", "false");
    setIsFocus(true);
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(inner.current!);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  useEffect(() => {
    if (text.current === "") inner.current?.focus();
    if (document.activeElement === inner.current) setIsFocus(true);
  }, []);

  return (
    <Container
      isFocus={isFocus}
      size={size}
      paddingLeft={!icon}
      onClick={onClickHandler}
    >
      <ContentEditable
        html={text.current}
        innerRef={inner}
        disabled={false}
        onChange={onChangeHandler}
        onPaste={onPasteHandler}
        onBlur={onBlurHandler}
        tagName="span"
      />
      <DeleteButton></DeleteButton>
    </Container>
  );
}

export default Chip;

Chip.defaultProps = {
  icon: undefined,
  size: "SMALL",
};

const Container = styled.div<StyledProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: fit-content;
  min-width: 50px;
  padding: ${(props) => (props.paddingLeft ? "8px 20px 8px 16px" : "8px 20px")};
  box-sizing: border-box;
  transition: 200ms ease-in-out;
  transition-property: background, color;
  cursor: pointer;
  user-select: none;
  color: ${ColorSystem.Neutral[900]};
  background: ${ColorSystem.Neutral[200]};

  & span {
    outline: initial;
  }

  &:hover {
    background: ${ColorSystem.Neutral[250]};
  }

  ${(props) => {
    switch (props.size) {
      case "SMALL":
        return css`
          height: 36px;
          border-radius: 18px;
          font-size: 14px;
          font-weight: 400;
        `;
      case "MEDIUM":
        return css`
          height: 40px;
          border-radius: 20px;
          font-size: 16px;
          font-weight: 400;
        `;
      default:
        return css``;
    }
  }}

  &::after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    width: 100%;
    height: 100%;
    padding: 2px;
    outline: 2px solid ${ColorSystem.Primary[600]};
    border-radius: 24px;
    opacity: ${(props) => (props.isFocus ? 1 : 0)};
    transition: 200ms ease-in-out;
    transition-property: opacity;
  }
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(-30%, -30%, 0);
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: red;
  z-index: 50;
`;
