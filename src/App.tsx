import styled from "styled-components";
import CreateBoardForm from "./Components/CreateBoardForm";
import DragDrop from "./Components/DrageDrop";
import HeaderBtn from "./Components/HeaderBtn";
import Timer from "./Components/Timer";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 2000px;
  height: 100vh;
  min-height: 650px;
`;

const BoardsWrap = styled.div`
`;


const Header = styled.header<IHeader>`
  display: flex;
  width: 100%;
  min-height: 28px;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.bgColor};
  box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
  margin-bottom: 20px;
`

interface IHeader {
  bgColor: string;
}


function App() {
  return(
    <Wrapper>
      <Header bgColor="#f1f2f6">
        <HeaderBtn />
        <CreateBoardForm />
        <Timer />
      </Header>
      <BoardsWrap>
         <DragDrop />
      </BoardsWrap>
    </Wrapper>
  );
}

export default App;