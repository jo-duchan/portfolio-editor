import React from "react";
import styled from "styled-components";

// Style
import { GapStylePC } from "styles/gap";

// Type
import { ContentItem, Gap } from "type/contentDataType";

interface Props {
  data: ContentItem;
}

interface StyledProps {
  gap: Gap;
}

function GapElement({ data }: Props) {
  return <Container gap={data.option.gap!} />;
}

export default GapElement;

const Container = styled.div<StyledProps>`
  margin-bottom: ${(props) => `${GapStylePC(props.gap)}`};
`;
