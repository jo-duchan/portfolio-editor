import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import IconSet from "components/ui/IconSet";
import ColorSystem from "styles/color-system";
export type ChipSize = "SMALL" | "MEDIUM";

interface Props {
  value: string;
  index: number;
  icon?: string | undefined;
  size?: ChipSize;
  onUpdate: (updateData: string, index: number) => void;
  onRemove: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => void;
}
interface StyledProps {
  isFocus?: boolean;
  paddingLeft: boolean;
  size: ChipSize | undefined;
}

function Chip({ value, index, size, icon, onUpdate, onRemove }: Props) {
  const text = useRef(value as string);
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
    setIsFocus(false);
    if (text.current === "") return;
    onUpdate(text.current, index);
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
      <DeleteButton onClick={(e) => onRemove(e, index)}>
        <IconSet type="CLOSE" />
      </DeleteButton>
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
  background: ${ColorSystem.Neutral[250]};

  & span {
    outline: initial;
  }

  &:hover {
    background: ${ColorSystem.Neutral[300]};
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
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${ColorSystem.Secondary[400]};
  opacity: 0;
  z-index: 50;
  pointer-events: none;
  transition: 200ms ease-in-out;
  transition-property: opacity;
  cursor: pointer;

  & svg {
    width: 10px;
  }

  & svg path {
    fill: ${ColorSystem.Neutral[0]};
  }

  ${Container}:hover & {
    opacity: 1;
    pointer-events: all;
  }

  &:active {
    background: ${ColorSystem.Secondary[600]};
  }
`;
