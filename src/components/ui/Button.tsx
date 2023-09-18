import React from "react";
import styled, { css, keyframes } from "styled-components";
import ColorSystem from "styles/color-system";
import IconSet from "components/ui/IconSet";

type BtnType = "PRIMARY" | "SECONDARY";
type States = "DEFAULT" | "LOADING" | "DISABLED";
type Sizes = "XSMALL" | "SMALL" | "MEDIUM" | "LARGE" | "XLARGE";

interface ButtonProps {
  btnType?: BtnType;
  states?: States;
  size?: Sizes;
  fixedWidth?: boolean;
  label: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface StyledProps {
  btnType?: boolean;
  states?: States;
  size?: Sizes;
  fixedWidth?: boolean;
}

function Button({
  btnType,
  states,
  size,
  fixedWidth,
  label,
  onClick,
}: ButtonProps) {
  const renderContent = () => {
    if (states === "LOADING") {
      return (
        <LoadingMotion>
          <IconSet type="PROGRESS" />
        </LoadingMotion>
      );
    }

    return <p>{label}</p>;
  };

  return (
    <Container
      btnType={btnType === "PRIMARY"}
      states={states}
      size={size}
      fixedWidth={fixedWidth}
      disabled={states === "DISABLED"}
      onClick={onClick}
    >
      {renderContent()}
    </Container>
  );
}

export default Button;

Button.defaultProps = {
  btnType: "PRIMARY",
  states: "DEFAULT",
  size: "MEDIUM",
  fixedWidth: false,
};

const AniMation = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const LoadingMotion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${AniMation} 1000ms ease-in-out infinite;
`;

const Primary = css`
  background: ${ColorSystem.Primary[600]};
  color: ${ColorSystem.Neutral[0]};

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 114.41441%;
    height: 133.33333%;
    background: ${ColorSystem.Primary[700]};
    border-radius: 20px;
    filter: blur(8px);
    opacity: 0;
    pointer-events: none;
    transition: 200ms ease-in-out;
    transition-property: opacity;
    z-index: 0;
  }

  &:hover {
    background: ${ColorSystem.Primary[700]};
  }

  &:enabled:active::after {
    opacity: 0.1;
  }

  &:disabled {
    background: ${ColorSystem.Neutral[100]};
    color: ${ColorSystem.Neutral[600]};
  }
`;

const Secondary = css`
  background: ${ColorSystem.Neutral[0]};
  color: ${ColorSystem.Secondary[600]};
  border: 1px solid ${ColorSystem.Neutral[300]};

  &:hover {
    background: ${ColorSystem.Neutral[100]};
  }

  &:disabled {
    background: ${ColorSystem.Neutral[100]};
    color: ${ColorSystem.Neutral[600]};
    border: 1px solid ${ColorSystem.Neutral[100]};
  }

  ${LoadingMotion} {
    svg path {
      fill: ${ColorSystem.Primary[600]};
    }
  }
`;

const Container = styled.button<StyledProps>`
  position: relative;
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: 300ms ease-in-out;
  transition-property: background, border, color;

  ${(props) =>
    props.btnType
      ? css`
          ${Primary}
        `
      : css`
          ${Secondary}
        `}

  ${(props) => {
    switch (props.size) {
      case "XSMALL":
        return css`
          width: ${props.fixedWidth ? "100%" : "80px"};
          height: 32px;
          font-size: 14px;
          font-weight: 600;
        `;
      case "SMALL":
        return css`
          width: ${props.fixedWidth ? "100%" : "88px"};
          height: 40px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
        `;
      case "MEDIUM":
        return css`
          width: ${props.fixedWidth ? "100%" : "111px"};
          height: 48px;
          font-size: 16px;
          font-weight: 600;
        `;
      case "LARGE":
        return css`
          width: ${props.fixedWidth ? "100%" : "133px"};
          height: 60px;
          font-size: 18px;
          font-weight: 600;
        `;
      case "XLARGE":
        return css`
          width: ${props.fixedWidth ? "100%" : "135px"};
          height: 68px;
          font-size: 18px;
          font-weight: 700;
        `;
    }
  }};
`;
