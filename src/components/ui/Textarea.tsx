import React from "react";
import styled, { css } from "styled-components";

// Style
import ColorSystem from "styles/color-system";

// Type
export type States = "DEFAULT" | "DISABLED";

export type Sizes = "SMALL" | "MEDIUM" | "LARGE";

export interface Props {
  states?: States;
  width?: string;
  size?: Sizes;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string, label: string) => void;
}

interface StyledProps {
  width?: string;
  size?: Sizes;
}

function Textarea({
  states,
  width,
  size,
  label,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <Container width={width}>
      <Label>
        {label}
        <TextareaElm
          size={size}
          placeholder={placeholder}
          disabled={states === "DISABLED"}
          autoComplete="off"
          value={value || ""}
          onChange={(e) => onChange(e.target.value, label)}
        />
      </Label>
    </Container>
  );
}

export default Textarea;

Textarea.defaultProps = {
  states: "DEFAULT",
  width: undefined,
  size: "SMALL",
  placeholder: "Placeholder",
};

const Container = styled.div<StyledProps>`
  display: flex;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  font-size: 16px;
  font-weight: 600;
  color: ${ColorSystem.Neutral[900]};
`;

const TextareaElm = styled.textarea<StyledProps>`
  border-radius: 12px;
  border: 1px solid ${ColorSystem.Neutral[300]};
  padding: 12px 16px;
  box-sizing: border-box;
  resize: none;
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  font-weight: 400;
  color: ${ColorSystem.Neutral[900]};
  transition: 300ms ease-in-out;
  transition-property: background, border-color, color;

  &::placeholder {
    color: ${ColorSystem.Neutral[500]};
  }

  &:hover {
    border-color: ${ColorSystem.Neutral[400]};
  }

  &:focus {
    padding: 13px 17px;
    border-width: 0px;
    outline: 2px solid ${ColorSystem.Primary[600]};
  }

  &:disabled {
    background: ${ColorSystem.Neutral[100]};
    color: ${ColorSystem.Neutral[500]};
    border-color: ${ColorSystem.Neutral[200]};
  }

  ${(props) => {
    switch (props.size) {
      case "SMALL": {
        return css`
          width: 100%;
          height: 120px;
        `;
      }
      case "MEDIUM": {
        return css`
          width: 100%;
          height: 160px;
        `;
      }
      case "LARGE": {
        return css`
          width: 100%;
          height: 200px;
        `;
      }
      default: {
        return css``;
      }
    }
  }}
`;
