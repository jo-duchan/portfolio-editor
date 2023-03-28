import React, { useRef, useEffect } from "react";
import styled from "styled-components";

// Style
import ColorSystem from "styles/color-system";

// Type

type States = "DEFAULT" | "FOCUSED" | "DISABLED";

interface Props {
  states?: States;
  width?: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
  value: string;
  onChange: (value: string, label: string) => void;
}

interface StyledProps {
  width?: string;
}

function Input({
  states,
  width,
  label,
  placeholder,
  maxLength,
  value,
  onChange,
}: Props) {
  const InputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!InputRef) return;

    if (states === "FOCUSED") {
      InputRef.current?.focus();
    }
  }, [states]);

  return (
    <Container width={width}>
      <Label>
        {label}
        <InputElm
          type="text"
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value, label)}
          disabled={states === "DISABLED"}
          autoComplete="off"
          spellCheck={false}
          maxLength={maxLength && 6}
          ref={InputRef}
        />
      </Label>
    </Container>
  );
}

export default Input;

Input.defaultProps = {
  states: "DEFAULT",
  width: undefined,
  placeholder: "Placeholder",
  maxLength: undefined,
  errorText: "Error text",
};

const Container = styled.div<StyledProps>`
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 16px;
  font-weight: 600;
  color: ${ColorSystem.Neutral[900]};
  cursor: pointer;
  user-select: none;
`;

const InputElm = styled.input`
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${ColorSystem.Neutral[300]};
  background: ${ColorSystem.Neutral[0]};
  box-sizing: border-box;
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

  &:disabled::placeholder {
    color: ${ColorSystem.Neutral[400]};
  }
`;
