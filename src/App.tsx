import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1,1fr);
`;
const Board = styled.div`
  padding: 30px 10px 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Card = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  margin-bottom: 5px;
`;



function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({destination, source}:DropResult) => {};
  return(
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        {/* 모든 보드판을 묶고 있는 영역 */}
        <Boards>
          <Droppable droppableId="one">
            {/* ex 보드판 영역 component*/}
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDos, index) => (
                  <Draggable key={index} draggableId={toDos} index={index}>
                    {/* ex 포스트잇 부분 component */}
                    {(provided) => (
                      <Card ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps}>
                        {toDos}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;