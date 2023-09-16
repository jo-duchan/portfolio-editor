import React from "react";
import styled from "styled-components";
import useContentAction from "context/useContentAction";
import useCurrentItem from "context/useCurrentItem";
import { nanoid } from "nanoid";
import ColorSystem from "styles/color-system";
import IconSet from "components/ui/IconSet";
import { ContentItem } from "type/portfolio";
import { Sort } from "type/option";

export type EventType = React.MouseEvent<HTMLButtonElement, MouseEvent>;

function Creator() {
  const action = useContentAction();
  const [currentItem, setCurrentItem] = useCurrentItem();

  const onCreateHandler = (createData: ContentItem) => {
    action.create(createData, currentItem?.id);
    setCurrentItem(createData);
  };

  const onCreateText = (sort: Sort) => {
    const CreateData: ContentItem = {
      id: nanoid(),
      sort: sort,
      content: {
        text: "",
      },
      option: {
        size: "S",
        margin: "NONE",
        aline: "LEFT",
        color: "",
        fill: "",
      },
    };
    onCreateHandler(CreateData);
  };

  const onCreateGap = () => {
    const CreateData: ContentItem = {
      id: nanoid(),
      sort: "GAP",
      option: {
        gap: "XS",
        fill: "",
      },
    };
    onCreateHandler(CreateData);
  };

  const onCreateImage = () => {
    const CreateData: ContentItem = {
      id: nanoid(),
      sort: "IMG",
      content: {
        image: [
          {
            file: "",
            type: "",
          },
        ],
      },
      option: {
        margin: "NONE",
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
