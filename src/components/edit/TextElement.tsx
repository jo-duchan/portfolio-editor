import React, { useRef, useState } from "react";
import styled from "styled-components";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

// Style
import { TitleSizePC, TextSizePC } from "styles/typography";
import { marginStylePC } from "styles/margin";

// Type
import { ContentItem, FontSize, MarginSize, Aline } from "type/contentDataType";

interface Props {
  data: ContentItem;
  onUpdateHandler: (updateData: ContentItem) => void;
}

interface StyledProps {
  sort: "h4" | "p";
  size: FontSize;
  margin: MarginSize;
  aline: Aline;
}

function TitleElement({ data, onUpdateHandler }: Props) {
  const text = useRef(data.content.text as string);
  const inner = useRef<HTMLHeadingElement | HTMLParagraphElement | null>(null);
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(true);
  const componentSort = data.sort === "TITLE" ? "h4" : "p";

  const onChangeHandler = (ev: ContentEditableEvent) => {
    text.current = ev.target.value;
    console.log(inner.current);
  };

  const onBlurHandler = () => {
    if (text.current === "") setIsPlaceholder(true);
    const updateItme = data;
    updateItme.content.text = text.current;
    onUpdateHandler(updateItme);
  };

  const onHidePlaceholder = () => {
    inner.current?.focus();
    setIsPlaceholder(false);
  };

  return (
    <Container
      onClick={onHidePlaceholder}
      sort={componentSort}
      size={data.option.size!}
      margin={data.option.margin!}
      aline={data.option.aline!}
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
    </Container>
  );
}

export default TitleElement;

const Container = styled.div<StyledProps>`
  display: flex;
  width: auto;
  justify-content: ${(props) => props.aline};
  ${(props) =>
    props.sort === "h4"
      ? `${TitleSizePC(props.size)}`
      : `${TextSizePC(props.size)}`};
  margin-inline: ${(props) => `${marginStylePC(props.margin)}`};

  & > *:focus {
    outline: none;
  }
`;

const Placeholder = styled.span`
  color: #aaa;
`;
