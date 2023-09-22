import React from "react";
import styled from "styled-components";
import { TitlePC, TextPC } from "styles/typography";
import { MarginPC } from "styles/margin";
import { Option, FontSize, MarginSize, Aline, Sort } from "type/option";

interface Props {
  children: React.ReactNode;
  sort?: Sort;
  option: Option;
  onClick?: () => void;
}

interface StyledProps {
  fill?: string;
  sort?: "h4" | "p";
  size?: FontSize;
  margin?: MarginSize;
  aline?: Aline;
  color?: string;
}

function TextElement({ children, sort, option }: Props) {
  const componentSort = sort === "TITLE" ? "h4" : "p";
  const fill = option.fill;
  const size = option.size;
  const margin = option.margin;
  const aline = option.aline;
  const color = option.color;

  return (
    <Container fill={fill}>
      <ContentWrapper
        sort={componentSort}
        size={size}
        margin={margin}
        aline={aline}
        color={color}
      >
        {children}
      </ContentWrapper>
    </Container>
  );
}

export default TextElement;

const Container = styled.div<StyledProps>`
  background: ${({ fill }) => `#${fill}`};
`;

const ContentWrapper = styled.div<StyledProps>`
  display: flex;
  width: auto;
  justify-content: ${({ aline }) => aline};
  ${({ sort, size }) =>
    sort === "h4" ? `${TitlePC[size!]}` : `${TextPC[size!]}`}
  color: ${({ color }) => `#${color}`};

  margin-inline: ${({ margin }) => `${MarginPC[margin!]}`};
  & > *:focus {
    outline: none;
  }
`;
