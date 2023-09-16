import React, { useRef, useState } from "react";
import styled from "styled-components";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import ColorSystem from "styles/color-system";
import { TitleSizePC, TextSizePC } from "styles/typography";
import { marginStylePC } from "styles/margin";
import { ContentItem } from "type/portfolio";
import { FontSize, MarginSize, Aline } from "type/option";

interface Props {
  data: ContentItem;
  onUpdateHandler: (updateData: ContentItem) => void;
}

interface StyledContainer {
  fill: string;
}

interface StyledContentWrapper {
  sort: "h4" | "p";
  size: FontSize;
  margin: MarginSize;
  aline: Aline;
  color: string;
}

function TitleElement({ data, onUpdateHandler }: Props) {
  const text = useRef(data.content.text as string);
  const inner = useRef<HTMLHeadingElement | HTMLParagraphElement | null>(null);
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(true);
  const componentSort = data.sort === "TITLE" ? "h4" : "p";

  const onChangeHandler = (ev: ContentEditableEvent) => {
    text.current = ev.target.value;
  };

  const onBlurHandler = () => {
    if (text.current === "") setIsPlaceholder(true);
    const updateItem = data;
    updateItem.content.text = text.current;
    onUpdateHandler(updateItem);
  };

  const onHidePlaceholder = () => {
    inner.current?.focus();
    inner.current?.setAttribute("spellcheck", "false");
    setIsPlaceholder(false);
  };

  return (
    <Container onClick={onHidePlaceholder} fill={data.option.fill!}>
      <ContentWrapper
        sort={componentSort}
        size={data.option.size!}
        margin={data.option.margin!}
        aline={data.option.aline!}
        color={data.option.color!}
      >
        <ContentEditable
          html={text.current}
          innerRef={inner}
          disabled={false}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          tagName={componentSort}
        />
        {isPlaceholder && (
          <Placeholder>{`Enter the ${data.sort} here.`}</Placeholder>
        )}
      </ContentWrapper>
    </Container>
  );
}

export default TitleElement;

const Container = styled.div<StyledContainer>`
  background: ${(props) => `#${props.fill}`};
`;

const ContentWrapper = styled.div<StyledContentWrapper>`
  display: flex;
  width: auto;
  justify-content: ${(props) => props.aline};
  ${(props) =>
    props.sort === "h4"
      ? `${TitleSizePC(props.size)}`
      : `${TextSizePC(props.size)}`};
  color: ${(props) => `#${props.color}`};
  margin-inline: ${(props) => `${marginStylePC(props.margin)}`};
  & > *:focus {
    outline: none;
  }
`;

const Placeholder = styled.span`
  color: ${ColorSystem.Neutral[300]};
`;
