import styled from "styled-components";
import CreateBoardForm from "./Components/CreateBoardForm";
import DragDrop from "./Components/DrageDrop";
import HeaderBtn from "./Components/HeaderBtn";
import Timer from "./Components/Timer";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import {
  redTheme,
  yellowTheme,
  greenTheme,
  blueTheme,
  purpleTheme,
  silverTheme,
  blackTheme,
} from "./theme";
import { useRecoilValue } from "recoil";
import { colorState } from "./Atoms/color";
import { Helmet } from "react-helmet";

// styled-reset
const GlobalStyle = createGlobalStyle`
  ${reset}
  // 추가 초기 css
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  body {
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    background-color:${(props) => props.theme.bgColor};
    color: #111;
    line-height: 1.2;
  }
  a {
    text-decoration:none;
    color:inherit;
  }
  `;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  min-height: 650px;
`;

const BoardsWrap = styled.div``;

const Header = styled.header<IHeader>`
  display: flex;
  width: 100%;
  min-height: 28px;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  text-align: center;
`;

interface IHeader {
  bgColor: string;
}

function App() {
  // Color의 State값 기져오기
  const colors = useRecoilValue(colorState);

  return (
    <>
      {/* theme color 변경 */}
      <ThemeProvider
        theme={
          colors === "yellowTheme"
            ? yellowTheme
            : colors === "redTheme"
            ? redTheme
            : colors === "greenTheme"
            ? greenTheme
            : colors === "blueTheme"
            ? blueTheme
            : colors === "purpleTheme"
            ? purpleTheme
            : colors === "silverTheme"
            ? silverTheme
            : blackTheme
        }
      >
        <GlobalStyle />
        <Wrapper>
          {/* Tab 제목 변경 : Helmet */}
          <Helmet>
            <title>Yell</title>
          </Helmet>

          {/* 헤더 영역 */}
          <Header bgColor="#f1f2f6">
            <HeaderBtn />
            <CreateBoardForm />
            <Timer />
          </Header>

          {/* 칸반 영역(Drag & Drop) */}
          <BoardsWrap>
            <DragDrop />
          </BoardsWrap>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
