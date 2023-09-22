import styled from "styled-components";
import { GapPC } from "styles/gap";
import { ContentItem } from "type/portfolio";
import { Gap } from "type/option";

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
  padding-bottom: ${({ gap }) => `${GapPC[gap]}`};
  background: ${({ fill }) => `#${fill}`};
`;
