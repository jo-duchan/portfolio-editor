import React from "react";
import styled from "styled-components";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";

// Style
import ColorSystem from "styles/color-system";

// Components
import IconSet from "components/ui/IconSet";

// Type
import { ContentItem, ContentSort } from "type/contentList";
export type EventType = React.MouseEvent<HTMLButtonElement, MouseEvent>;

function Creator() {
  const action = useContentAction();
  const [currentItem, setCurrentItem] = useCurrentItem();

  const onCreateHandler = (createData: ContentItem) => {
    action.create(createData, currentItem?.id);
    setCurrentItem(createData);
  };

  const onCreateText = (sort: ContentSort) => {
    const CreateData: ContentItem = {
      id: Math.random().toString(),
      sort: sort,
      content: {
        text: "",
        image: undefined,
      },
      option: {
        size: "S",
        margin: "NONE",
        aline: "LEFT",
        gap: undefined,
        color: "",
        fill: "",
        column: undefined,
      },
    };
    onCreateHandler(CreateData);
  };

  const onCreateGap = () => {
    const CreateData: ContentItem = {
      id: Math.random().toString(),
      sort: "GAP",
      content: {
        text: undefined,
        image: undefined,
      },
      option: {
        size: undefined,
        margin: undefined,
        aline: undefined,
        gap: "XS",
        color: undefined,
        fill: "",
        column: undefined,
      },
    };
    onCreateHandler(CreateData);
  };

  const onCreateImage = () => {
    const CreateData: ContentItem = {
      id: Math.random().toString(),
      sort: "IMG",
      content: {
        text: undefined,
        image: [
          {
            file: {} as File,
            preview: "",
            type: "",
          },
        ],
      },
      option: {
        size: undefined,
        margin: "NONE",
        aline: undefined,
        gap: undefined,
        color: undefined,
        fill: "",
        column: "2",
      },
    };
    onCreateHandler(CreateData);
  };

  return (
    <Container>
      <Button onClick={() => onCreateText("TITLE")}>
        <IconSet type="TITLE" />
      </Button>
      <Button onClick={() => onCreateText("TEXT")}>
        <IconSet type="TEXT" />
      </Button>
      <Button onClick={onCreateGap}>
        <IconSet type="GAP" />
      </Button>
      <Button onClick={onCreateImage}>
        <IconSet type="IMG" />
      </Button>
    </Container>
  );
}

export default Creator;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  width: 100%;
  height: auto;
  background: ${ColorSystem.Neutral[0]};
  padding: 12px;
  border-radius: 6px;
  box-sizing: border-box;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 126px;
  height: 126px;
  box-sizing: border-box;
  background: ${ColorSystem.Neutral[100]};
  border: none;
  transition: 200ms ease-in-out;
  transition-property: background;
  cursor: pointer;

  & svg path {
    fill: ${ColorSystem.Neutral[500]};
    transition: 200ms ease-in-out;
    transition-property: fill;
  }

  &:hover {
    background: ${ColorSystem.Neutral[200]};
  }

  &:hover svg path {
    fill: ${ColorSystem.Primary[600]};
  }

  &:active svg path {
    fill: ${ColorSystem.Primary[700]};
  }
`;
