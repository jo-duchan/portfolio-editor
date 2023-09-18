import React from "react";
import styled from "styled-components";
import useContent from "context/useContent";
import { nanoid } from "nanoid";
import ColorSystem from "styles/color-system";
import IconSet from "components/ui/IconSet";
import { ContentItem } from "type/portfolio";
import { Sort } from "type/option";

interface Props {
  currentItemId: string | null;
  setCurrentItemId: React.Dispatch<React.SetStateAction<string | null>>;
}

export type EventType = React.MouseEvent<HTMLButtonElement, MouseEvent>;

function Creator({ currentItemId, setCurrentItemId }: Props) {
  const action = useContent.Action();

  const createHandler = (createData: ContentItem) => {
    action.create(createData, currentItemId);
    setCurrentItemId(createData.id);
  };

  const createText = (sort: Sort) => {
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
    createHandler(CreateData);
  };

  const createGap = () => {
    const CreateData: ContentItem = {
      id: nanoid(),
      sort: "GAP",
      option: {
        gap: "XS",
        fill: "",
      },
    };
    createHandler(CreateData);
  };

  const createImage = () => {
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
    createHandler(CreateData);
  };

  return (
    <Container>
      <Button onClick={() => createText("TITLE")}>
        <IconSet type="TITLE" />
      </Button>
      <Button onClick={() => createText("TEXT")}>
        <IconSet type="TEXT" />
      </Button>
      <Button onClick={createGap}>
        <IconSet type="GAP" />
      </Button>
      <Button onClick={createImage}>
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
