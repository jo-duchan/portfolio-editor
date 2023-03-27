import React from "react";
import styled from "styled-components";
import useTopVisualValue from "context/useTopVisualValue";
import useTopVisualAction from "context/useTopVisualAction";

// Style
import ColorSystem from "styles/color-system";

// Components
import Chip from "components/ui/Chip";

// Type
import { TopVisual } from "type/topVisual";

function WorkChips() {
  const value = useTopVisualValue();
  const action = useTopVisualAction();

  const onUpdateHandler = (update: TopVisual) => {
    action(update);
  };

  const onAddHandler = () => {
    action((prev) => {
      const copydata = { ...prev };
      copydata.work = [...copydata.work, ""];
      return copydata;
    });
  };
  return (
    <Container>
      <Label>Topic</Label>
      <Chips>
        {value.work.map((item, index) => (
          <Chip
            key={Math.random() * index}
            index={index}
            onUpdateHandler={onUpdateHandler}
          />
        ))}
        <div className="add" onClick={onAddHandler}>
          +
        </div>
      </Chips>
    </Container>
  );
}

export default WorkChips;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Chips = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & .add {
    width: 50px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${ColorSystem.Neutral[200]};
    cursor: pointer;
    transition: 200ms ease-in-out;
    transition-property: background;
  }

  & .add:hover {
    background: ${ColorSystem.Neutral[250]};
  }

  & .add:active {
    background: ${ColorSystem.Neutral[300]};
  }
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${ColorSystem.Neutral[900]};
`;
