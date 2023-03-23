import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

// Style
import ColorSystem from "styles/color-system";

// Type
export type LineType = "LEFT" | "RIGHT" | "NONE";

interface Props {
  label: string;
  option: string[];
  value: string;
  onChange: (value: string, label: string) => void;
}

interface StyledProps {
  active?: boolean;
  posIdx?: number;
  line?: LineType;
}

function PillTab({ label, option, value, onChange }: Props) {
  const [posIdx, setPosIdx] = useState<number>(0);

  const handleClick = (item: string, index: number) => {
    setPosIdx(index);
    onChange(item, label);
  };

  useEffect(() => {
    option.forEach((item, idx) => {
      if (item === value) {
        setPosIdx(idx);
        return;
      }
    });
  }, [value]);

  const calcDirection = (index: number): LineType => {
    if (index !== 0 && index + 1 !== option.length && index < posIdx) {
      return "LEFT";
    }

    if (index !== 0 && index + 1 !== option.length && index > posIdx) {
      return "RIGHT";
    }

    return "NONE";
  };
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <Label>{label}</Label>
      <Innerwrapper>
        <Tab>
          {option.map((item, index) => (
            <Option
              active={posIdx === index}
              line={calcDirection(index)}
              onClick={() => handleClick(item, index)}
              key={item}
            >
              {`${item}`}
            </Option>
          ))}
        </Tab>
        <Pill posIdx={posIdx} />
      </Innerwrapper>
    </Container>
  );
}

export default PillTab;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const Innerwrapper = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  height: 40px;
  background: ${ColorSystem.Neutral[100]};
  border-radius: 20px;
  overflow: hidden;
`;

const Tab = styled.div`
  display: flex;
  z-index: 10;
  width: fit-content;
  height: 100%;
`;

const Option = styled.span<StyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100%;
  cursor: pointer;
  user-select: none;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 16px;
    background: ${ColorSystem.Neutral[300]};
    opacity: 0;
    transition: 200ms ease-in-out;
    transition-property: opacity;
  }

  &::before {
    content: "";
    position: absolute;
    right: 0mm;
    width: 1px;
    height: 16px;
    background: ${ColorSystem.Neutral[300]};
    opacity: 0;
    transition: 200ms ease-in-out;
    transition-property: opacity;
  }

  ${(props) => {
    switch (props.line) {
      case "LEFT":
        return css`
          &::after {
            opacity: 1;
          }

          &::before {
            opacity: 0;
          }
        `;
      case "RIGHT":
        return css`
          &::after {
            opacity: 0;
          }

          &::before {
            opacity: 1;
          }
        `;
      case "NONE":
        return css`
          &::after {
            opacity: 0;
          }

          &::before {
            opacity: 0;
          }
        `;
      default:
        return;
    }
  }}

  ${(props) =>
    props.active
      ? css`
          font-size: 12px;
          font-weight: 600;
          color: ${ColorSystem.Primary[600]};
        `
      : css`
          font-size: 12px;
          font-weight: 600;
          color: ${ColorSystem.Neutral[500]};
        `};
  transition: 200ms ease-in-out;
  transition-property: color;
`;

const Pill = styled.div<StyledProps>`
  position: absolute;
  top: 4px;
  left: ${(props) => `calc(4px + (80px * ${props.posIdx}))`};
  width: 72px;
  height: 32px;
  border-radius: 16px;
  background: ${ColorSystem.Neutral[0]};
  box-shadow: 0px 0px 8px rgba(20, 23, 26, 0.08),
    0px 0px 4px rgba(20, 23, 26, 0.04);
  transition: 200ms ease-in-out;
  transition-property: left;
`;
