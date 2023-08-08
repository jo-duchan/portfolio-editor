import React from "react";
import styled from "styled-components";
import useTopVisualValue from "context/useTopVisualValue";
import useTopVisualAction from "context/useTopVisualAction";

// Style
import ColorSystem from "styles/color-system";

// Components
import Chip from "components/ui/Chip";

function WorkChips() {
  const value = useTopVisualValue();
  const action = useTopVisualAction();

  const onAddHandler = () => {
    action((prev) => {
      const newdata = { ...prev };
      newdata.work.push("");
      return newdata;
    });
  };

  return (
    <Container>
      <Label>Topic</Label>
      <Chips>
        <div className="chips-inner">
          {value.work.map((item, index) => (
            <Chip key={index} value={item} index={index} />
          ))}
          <div className="add" onClick={onAddHandler}>
            +
          </div>
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
