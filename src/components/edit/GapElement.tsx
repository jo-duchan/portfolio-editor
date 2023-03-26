import React from "react";
import styled from "styled-components";

// Style
import { GapStylePC } from "styles/gap";

// Type
import { ContentItem, Gap } from "type/contentList";

interface Props {
  data: ContentItem;
}

interface StyledProps {
  gap: Gap;
  fill: string;
}

function GapElement({ data }: Props) {
  return <Container gap={data.option.gap!} fill={data.option.fill!} />;
}

export default GapElement;

const Container = styled.div<StyledProps>`
  padding-bottom: ${(props) => `${GapStylePC(props.gap)}`};
  background: ${(props) => `#${props.fill}`};
`;
