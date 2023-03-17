import React, { useRef } from "react";
import styled, { css } from "styled-components";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

// Type
import { ContentItem, Size, Aline } from "type/contentDataType";

interface Props {
  data: ContentItem;
  onUpdateHandler: (updateData: ContentItem) => void;
}

interface StyledProps {
  size: string;
  margin: Size;
  aline: Aline;
}

function TitleElement({ data, onUpdateHandler }: Props) {
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

export default TitleElement;

const Container = styled.div<StyledProps>`
  display: flex;
  text-align: ${(props) => props.aline};
  width: 100%;
  line-height: 1.193em;
  ${(props) => {
    switch (props.size) {
      case "XS":
        return css`
          font-size: 24px;
        `;
      case "S":
        return css`
          font-size: 36px;
        `;
      case "M":
        return css`
          font-size: 48px;
        `;
      case "L":
        return css`
          font-size: 60px;
        `;
      case "XL":
        return css`
          font-size: 72px;
        `;
      default:
        return css`
          font-size: 24px;
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
