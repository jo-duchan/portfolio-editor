import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import ColorSystem from "styles/color-system";
import { TitlePC, TextPC } from "styles/typography";
import { MarginPC } from "styles/margin";
import { ContentItem } from "type/portfolio";
import { FontSize, MarginSize, Aline } from "type/option";

interface Props {
  data: ContentItem;
  onUpdateHandler: (updateData: ContentItem) => void;
  isFocus: boolean;
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

function TitleElement({ data, onUpdateHandler, isFocus }: Props) {
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
    text.current = ev.target.value;
    setIsPlaceholder(false);
  };

  const onBlurHandler = () => {
    if (text.current === "") setIsPlaceholder(true);
    const updateItem = data;
    updateItem.content!.text = text.current;
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

//Container랑 ContentWarpper로 코어 스타일 컴포넌트 만들면 될듯.
const Container = styled.div<StyledContainer>`
  background: ${({ fill }) => `#${fill}`};
`;

const ContentWrapper = styled.div<StyledContentWrapper>`
  display: flex;
  width: auto;
  justify-content: ${({ aline }) => aline};
  ${({ sort, size }) =>
    sort === "h4" ? `${TitlePC[size]}` : `${TextPC[size]}`}
  color: ${({ color }) => `#${color}`};

  margin-inline: ${({ margin }) => `${MarginPC[margin]}`};
  & > *:focus {
    outline: none;
  }
`;

const Placeholder = styled.span`
  color: ${ColorSystem.Neutral[300]};
`;
