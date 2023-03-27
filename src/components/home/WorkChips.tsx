import React, { useState } from "react";
import styled from "styled-components";

// Style
import ColorSystem from "styles/color-system";

// Components
import Chip from "components/ui/Chip";

function WorkChips() {
  const [list, setList] = useState(["text01", "text02", "text03"]);

  const onAddHandler = () => {
    setList((prev) => [...prev, ""]);
  };
  return (
    <Container>
      {list.map((item) => (
        <Chip />
      ))}
      <div className="add" onClick={onAddHandler}>
        +
      </div>
    </Container>
  );
}

export default WorkChips;

const Container = styled.div`
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
  }
`;
