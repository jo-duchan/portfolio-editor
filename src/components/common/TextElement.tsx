import React from "react";
import styled from "styled-components";
import { TitlePC, TitleMO, TextPC, TextMO } from "styles/typography";
import { MarginPC, MarginMO } from "styles/margin";
import { ContentItem } from "type/portfolio";
import { FontSize, MarginSize, Aline } from "type/option";

interface Props {
  children: React.ReactNode;
  data: ContentItem;
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

function TextElement({ children, data }: Props) {
  const componentSort = data.sort === "TITLE" ? "h4" : "p";
  const fill = data.option.fill;
  const size = data.option.size;
  const margin = data.option.margin;
  const aline = data.option.aline;
  const color = data.option.color;

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
  color: ${({ color }) => `#${color}`};

  ${({ sort, size }) =>
    sort === "h4" ? `${TitlePC[size!]}` : `${TextPC[size!]}`}
  margin-inline: ${({ margin }) => `${MarginPC[margin!]}`};

  & > *:focus {
    outline: none;
  }

  @media screen and (max-width: 500px) {
    ${({ sort, size }) =>
      sort === "h4" ? `${TitleMO[size!]}` : `${TextMO[size!]}`}
    margin-inline: ${({ margin }) => `${MarginMO[margin!]}`};
  }
`;
