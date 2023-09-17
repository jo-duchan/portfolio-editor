import { json, useLoaderData, useNavigate } from "react-router-dom";
import { ref, child, get } from "firebase/database";
import { db } from "firebase-config";
import styled from "styled-components";
import { TopVisual } from "type/portfolio";
import { TitleSizePC, TextSizePC } from "styles/typography";
import ColorSystem from "styles/color-system";

function Preview() {
  const data = useLoaderData() as { [key: string]: { topVisual: TopVisual } };

  return (
    <Container>
      <Title>포트폴리오 리스트</Title>
      <List>
        {Object.keys(data).map((key) => (
          <Item>
            <img
              className="thumbnail"
              src={data[key].topVisual.assets.clientLogo.file}
              alt="project thumbnail"
            />
            <p className="project-title">{data[key].topVisual.title}</p>
          </Item>
        ))}
      </List>
    </Container>
  );
}

export default Preview;

export async function loader() {
  const dbRef = ref(db);
  const data = await get(child(dbRef, "/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw json({ message: "No data available" }, { status: 500 });
      }
    })
    .catch((error) => {
      throw json({ message: error }, { status: 500 });
    });

  return data;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  padding: 40px;
  box-sizing: border-box;
  background: ${ColorSystem.Neutral[100]};
`;

const Title = styled.h3`
  ${TitleSizePC("S")};
  margin-bottom: 40px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 100px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  background: ${ColorSystem.Neutral[200]};

  & .thumbnail {
    width: 160px;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    overflow: hidden;
  }

  & .project-title {
    ${TextSizePC("L")}
  }
`;
