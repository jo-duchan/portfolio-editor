import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";

// Components
import IconSet from "components/ui/IconSet";

// Style
import ColorSystem from "styles/color-system";

// Type
export type States = "DEFAULT" | "DISABLED";
export type EventType = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface Props {
  width?: string;
  states?: States;
  label: string;
  placeholder?: string;
  helpText?: string;
  option: string[];
  value: string;
  onChange: (value: string, label: string) => void;
}

interface StyledProps {
  width?: string;
  focused?: boolean;
  states?: States;
}

function Select({
  width,
  states,
  label,
  placeholder,
  helpText,
  option,
  value,
  onChange,
}: Props) {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string>(value);

  // Show & Hide Option
  const handleClick = useCallback(
    (e: EventType) => {
      e.stopPropagation();
      if (states === "DISABLED") return;
      setIsClick(!isClick);
    },
    [isClick, states]
  );

  // Select Option
  const handleOption = useCallback((e: EventType, optionValue: string) => {
    e.stopPropagation();
    setIsClick(false);
    setSelectValue(optionValue);
  }, []);

  // Callback
  useEffect(() => {
    onChange(selectValue, label as string);
  }, [selectValue]);

  useEffect(() => {
    if (value === selectValue) return;
    setSelectValue(value);
  }, [value]);

  //Mouse Leave Hide Option
  const onClearHandler = () => {
    setIsClick(false);
  };

  return (
    <Container width={width} onMouseLeave={onClearHandler}>
      <Label onClick={handleClick}>{label}</Label>
      <InputWrapper>
        <InputOuter
          onClickCapture={handleClick}
          focused={isClick}
          states={states}
        >
          <InputElement
            placeholder={placeholder}
            value={selectValue || ""}
            disabled
          />
          <IconSet type="CHEVRON-DOWN" />
        </InputOuter>
        {isClick && (
          <OptionWrapper>
            <OptionInner>
              {option.map((optionValue, index) => (
                <Option
                  key={index}
                  onClickCapture={(
                    e: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) => handleOption(e, optionValue)}
                >
                  {optionValue}
                </Option>
              ))}
            </OptionInner>
          </OptionWrapper>
        )}
      </InputWrapper>
      {helpText && !isClick && <HelpText>{helpText}</HelpText>}
    </Container>
  );
}

export default Select;

Select.defaultProps = {
  states: "DEFAULT",
  width: undefined,
  placeholder: undefined,
  helpText: undefined,
};

const Container = styled.div<StyledProps>`
  position: relative;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  display: flex;
  flex-direction: column;
  gap: 6px;
  & :is(div, span) {
    cursor: pointer;
    user-select: none;
  }
`;

const Label = styled.span`
  width: fit-content;
  font-size: 16px;
  font-weight: 600;
`;

const HelpText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${ColorSystem.Neutral[600]};
  cursor: text !important;
  user-select: text !important;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputOuter = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  padding: 12px 14px 12px 16px;
  border-radius: 12px;
  box-sizing: border-box;
  background: ${ColorSystem.Neutral[0]};
  border: 1px solid;
  border-color: ${ColorSystem.Neutral[300]};
  font-size: 16px;
  font-weight: 400;
  color: ${ColorSystem.Neutral[900]};
  transition: 200ms ease-in-out;
  transition-property: border-color;

  & svg {
    transition: 250ms ease-in-out;
    transition-property: transform;
  }

  ${(props) =>
    props.focused &&
    css`
      padding: 13px 15px 13px 17px;
      border-width: 0;
      outline: 2px solid ${ColorSystem.Primary[600]};

      & svg {
        transform: rotate(180deg);
      }
    `};

  ${(props) => {
    switch (props.states) {
      case "DISABLED":
        return css`
          background: ${ColorSystem.Neutral[100]};
          border-color: ${ColorSystem.Neutral[200]};
          color: ${ColorSystem.Neutral[400]};

          & input::placeholder {
            color: ${ColorSystem.Neutral[400]};
          }
          & svg path {
            fill: ${ColorSystem.Neutral[400]};
          }
        `;
      default:
        return css`
          &:hover {
            border-color: ${ColorSystem.Neutral[500]};
          }
        `;
    }
  }}
`;

const InputElement = styled.input`
  pointer-events: none;

  &::placeholder {
    color: ${ColorSystem.Neutral[500]};
  }
`;

const OptionWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: fit-content;
  padding-top: 10px;
  z-index: 400;
`;

const OptionInner = styled.div`
  width: 100%;
  height: auto;
  padding: 12px 0;
  border-radius: 12px;
  box-sizing: border-box;
  background: ${ColorSystem.Neutral[0]};
  border: 1px solid ${ColorSystem.Neutral[300]};
`;

const Option = styled.div`
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 400;
  color: ${ColorSystem.Neutral[900]};
  transition: 200ms ease-in-out;
  transition-property: background;

  &:hover {
    background: ${ColorSystem.Neutral[100]};
  }
`;
