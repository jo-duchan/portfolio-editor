import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import ColorSystem from "styles/color-system";
import Chip from "components/ui/Chip";

interface Props {
  value: string[];
  onUpdate: React.Dispatch<React.SetStateAction<string[]>>;
}

function TopicChips({ value, onUpdate }: Props) {
  const handleAddChip = () => {
    onUpdate((prev) => {
      return [...prev, ""];
    });
  };

  const handleUpdateChip = (updateData: string, index: number) => {
    onUpdate((prev) => {
      const newDate = [...prev];
      newDate[index] = updateData;
      return newDate;
    });
  };

  const handleRemoveChip = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();

    onUpdate((prev) => {
      const newData = [...prev];
      newData.splice(index, 1);
      return newData;
    });
  };

  return (
    <Container>
      <Label>Topic</Label>
      <Chips>
        <div className="chips-inner">
          {value.map((chip, index) => (
            <Chip
              key={nanoid()}
              value={chip}
              index={index}
              onUpdate={handleUpdateChip}
              onRemove={handleRemoveChip}
            />
          ))}
          <div className="add" onClick={handleAddChip}>
            +
          </div>
        </div>
      </Chips>
    </Container>
  );
}

export default TopicChips;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Chips = styled.div`
  width: 100%;
  height: fit-content;
  overflow-x: auto;
  background: ${ColorSystem.Neutral[100]};
  border-radius: 12px;
  & .chips-inner {
    width: fit-content;
    min-width: fit-content;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
  }

  & .add {
    width: 50px;
    min-width: 50px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${ColorSystem.Neutral[250]};
    cursor: pointer;
    transition: 200ms ease-in-out;
    transition-property: background;
  }

  & .add:hover {
    background: ${ColorSystem.Neutral[300]};
  }

  & .add:active {
    background: ${ColorSystem.Neutral[400]};
  }
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${ColorSystem.Neutral[900]};
`;
