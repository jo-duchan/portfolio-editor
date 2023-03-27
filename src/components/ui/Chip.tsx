import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

// Style
import ColorSystem from "styles/color-system";

//Type
export type ChipSize = "SMALL" | "MEDIUM";

interface Props {
  icon?: string | undefined;
  text?: string;
  size?: ChipSize;
}
interface StyledProps {
  active: boolean;
  paddingLeft: boolean;
  size: ChipSize | undefined;
}

function Chip({ icon, text, size }: Props) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const onSelectHandler = () => {
    setIsActive(!isActive);
  };

  return (
    <Container
      size={size}
      active={isActive}
      paddingLeft={!icon}
      onClick={onSelectHandler}
    >
      <TextWrapper>{text}</TextWrapper>
    </Container>
  );
}

export default Chip;

Chip.defaultProps = {
  icon: undefined,
  text: "Text",
  size: "SMALL",
};

const TextWrapper = styled.span`
  /* color: ${ColorSystem.Neutral[900]}; */
`;

const Container = styled.div<StyledProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: ${(props) => (props.paddingLeft ? "8px 20px 8px 16px" : "8px 20px")};
  box-sizing: border-box;
  transition: 200ms ease-in-out;
  transition-property: background, color;
  cursor: pointer;
  user-select: none;
  ${(props) =>
    props.active
      ? css`
          color: ${ColorSystem.Neutral[0]};
          background: ${ColorSystem.Primary[600]};
          &:hover {
            background: ${ColorSystem.Primary[700]};
          }
        `
      : css`
          color: ${ColorSystem.Neutral[900]};
          background: ${ColorSystem.Neutral[200]};
          &:hover {
            background: ${ColorSystem.Neutral[300]};
          }
        `}

  ${(props) => {
    switch (props.size) {
      case "SMALL":
        return css`
          height: 36px;
          border-radius: 18px;
          ${TextWrapper} {
            font-size: 14px;
            font-weight: 400;
          }
        `;
      case "MEDIUM":
        return css`
          height: 40px;
          border-radius: 20px;
          ${TextWrapper} {
            font-size: 16px;
            font-weight: 400;
          }
        `;
      default:
        return css``;
    }
  }}
`;
