import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import ColorSystem from "styles/color-system";
import { ContentItem } from "type/portfolio";
import TextElement from "components/common/TextElement";

interface Props {
  data: ContentItem;
  onUpdateHandler: (updateData: ContentItem) => void;
  isFocus: boolean;
}

function TextEditor({ data, onUpdateHandler, isFocus }: Props) {
  const text = useRef(data.content!.text as string);
  const inner = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(true);
  const componentSort = data.sort === "TITLE" ? "h4" : "p";

  useEffect(() => {
    // init
    if (text.current !== "") {
      setIsPlaceholder(false);
    }
  }, []);

  useEffect(() => {
    if (isFocus) {
      onHidePlaceholder();
    }
    if (!isFocus) {
      inner.current?.blur();
    }
  }, [isFocus]);

  const onChangeHandler = (ev: ContentEditableEvent) => {
    // text.current = ev.target.value; Html 속성 전부 넘어오는 값 제거.
    text.current = ev.currentTarget.innerText;
    setIsPlaceholder(false);
  };

  const onBlurHandler = () => {
    if (text.current === "") setIsPlaceholder(true);
    const updateItem = data;
    updateItem.content!.text = text.current.toString();
    onUpdateHandler(updateItem);
  };

  const onHidePlaceholder = () => {
    inner.current?.focus();
    inner.current?.setAttribute("spellcheck", "false");
    if (text.current !== "") {
      setIsPlaceholder(false);
    }
  };

  return (
    <TextElement
      sort={data.sort}
      option={data.option}
      onClick={onHidePlaceholder}
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
    </TextElement>
  );
}

export default TextEditor;

const Placeholder = styled.span`
  color: ${ColorSystem.Neutral[300]};
`;
