import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import CreateBoardForm from "./Components/CreateBoardForm";
import HeaderBtn from "./Components/HeaderBtn";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 2000px;
  min-height: 650px;
`;

const BoardsWrap = styled.div`
  display: flex;
  width: 98%;
  height: 100%;
  margin: 0 2%;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 15px;
`;

const Time = styled.div`
  height: 100%;
  font-weight: 400;
  font-size: 14px;
  margin-right: 5px;
`;
const Header = styled.header<IHeader>`
  display: flex;
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
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info:DropResult) => {
    const {destination, source} = info;
    if(!destination) return;
    if(destination.droppableId === source.droppableId){
      //같은 보드판에서의 움직임
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
  }
  if(destination.droppableId !== source.droppableId){
    // 다른 보드판으로의 움직임
    setToDos((allBoards) => {
      const sourceBoard = [...allBoards[source.droppableId]];
      const taskObj = sourceBoard[source.index];
      const destinationBoard = [...allBoards[destination.droppableId]];
      sourceBoard.splice(source.index, 1);
      destinationBoard.splice(destination?.index, 0, taskObj);
      return {
        ...allBoards,
        [source.droppableId]: sourceBoard,
        [destination.droppableId]: destinationBoard
      };
    });
  }
}
  return(
    <Wrapper>
      <Header bgColor={'#dfe4ea'}>
        <HeaderBtn />
        <CreateBoardForm />
        <Time>PM 12 : 23</Time>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* board create form components */}
        <BoardsWrap>
          {/* 모든 보드판을 묶고 있는 영역 */}
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]}/>
            ))}
          </Boards>
        </BoardsWrap>
      </DragDropContext>
    </Wrapper>
  );
}

export default App;