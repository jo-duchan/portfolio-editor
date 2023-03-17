import React, { useRef } from "react";
import styled from "styled-components";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

// Type
import { ContentItem, Size, Aline } from "type/contentDataType";

interface Props {
  data: ContentItem;
  onUpdateHandler: (updateData: ContentItem) => void;
}

interface StyledProps {
  size?: string;
  margin?: Size;
  aline?: Aline;
}

function TitleElement({ data, onUpdateHandler }: Props) {
  const text = useRef(data.content.text as string);
  // const onChangeHandler = (e: React.FormEvent<HTMLParagraphElement>) => {
  //   const updateItme = data;
  //   updateItme.content.text = e.currentTarget.textContent;
  //   onUpdateHandler(updateItme);
  //   console.log(e.currentTarget.textContent, updateItme.content.text);
  // };
  const onChangeHandler = (ev: ContentEditableEvent) => {
    console.log(ev.target.value);
    text.current = ev.target.value;
  };

  const handleBlur = () => {
    const updateItme = data;
    updateItme.content.text = text.current;
    onUpdateHandler(updateItme);
    console.log(text, data); // incorrect value
  };

  return (
    <Container
      size={data.option.size}
      margin={data.option.margin}
      aline={data.option.aline}
    >
      {/* <Content
        contentEditable
        suppressContentEditableWarning
        // onInput={onChangeHandler}
      >
        {data.content.text}
      </Content> */}
      <ContentEditable
        html={text.current}
        disabled={false}
        onChange={onChangeHandler}
        onBlur={handleBlur}
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
  font-size: ${(props) => {
    switch (props.size) {
      case "XS":
        return "14px";
      case "S":
        return "16px";
      case "M":
        return "18px";
      case "L":
        return "20px";
      case "XL":
        return "24px";
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
  line-height: 20px;
  & p:focus {
    outline: none;
  }
`;
