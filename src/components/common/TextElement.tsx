import React, { useRef } from "react";
import styled, { css } from "styled-components";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

// Type
import { ContentItem, FontSize, MarginSize, Aline } from "type/contentDataType";

interface Props {
  data: ContentItem;
  onUpdateHandler: (updateData: ContentItem) => void;
}

interface StyledProps {
  size?: FontSize;
  margin?: MarginSize;
  aline?: Aline;
}

function TextElement({ data, onUpdateHandler }: Props) {
  const text = useRef(data.content.text as string);

  const onChangeHandler = (ev: ContentEditableEvent) => {
    text.current = ev.target.value;
  };

  const onBlurHandler = () => {
    const updateItme = data;
    updateItme.content.text = text.current;
    onUpdateHandler(updateItme);
  };

  return (
    <Container
      size={data.option.size}
      margin={data.option.margin}
      aline={data.option.aline}
    >
      <ContentEditable
        html={text.current}
        disabled={false}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        tagName="p"
      />
    </Container>
  );
}

export default TextElement;

const Container = styled.div<StyledProps>`
  display: flex;
  text-align: ${(props) => props.aline};
  width: 100%;
  ${(props) => {
    switch (props.size) {
      case "XS":
        return css`
          font-size: 14px;
          line-height: 1.429em;
        `;
      case "S":
        return css`
          font-size: 16px;
          line-height: 1.5em;
        `;
      case "M":
        return css`
          font-size: 18px;
          line-height: 1.444em;
        `;
      case "L":
        return css`
          font-size: 20px;
          line-height: 1.4em;
        `;
      case "XL":
        return css`
          font-size: 24px;
          line-height: 1.417em;
        `;
      default:
        return css`
          font-size: 14px;
        `;
    }
  }};
  margin-inline: ${(props) => {
    switch (props.margin) {
      case "NONE":
        return "0";
      case "XS":
        return "84px";
      case "S":
        return "156px";
      case "M":
        return "228px";
      case "L":
        return "300px";
      case "XL":
        return "360px";
    }
  }};

  & > *:focus {
    outline: none;
  }
`;
