import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "./Board";

const Wrapper = styled.div`
  width: 300px;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,.2);
  margin-bottom: 5px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.boardsColor};
`;

const Boards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 15px;
  border: 1px solid blue;
  box-sizing: border-box;
`;

const Title = styled.h2`
  height: 25px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

function DragDrop(){
  const [toDos, setToDos] = useRecoilState(toDoState);
  console.log(Object.keys(toDos).map((boardId,index, toForm)=> console.log(boardId , index, toForm[index])));

  const onDragEnd = () => {}
 /*  
  const onDragEnd = (info:DropResult) => {
    const {destination, source, droppableId} = info;
    console.log(source, destination);
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
  } */
  /* if(destination.droppableId !== source.droppableId){
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
  } */
// }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
       <Droppable droppableId="form" direction="horizontal">
         {(p)=>(
           <Boards ref={p.innerRef}>
             {Object.keys(toDos).map((boardId, index, toForm) => (
               <Draggable draggableId={boardId} index={index}>
                 {(p) => (
                    <Wrapper ref={p.innerRef} {...p.draggableProps}>
                      <Title {...p.dragHandleProps}>{boardId}</Title>
                      <Board boardId={boardId} key={index} toForm={toForm[index]} />
                    </Wrapper>
                 )}
               </Draggable>
             ))}
             {p.placeholder}
           </Boards>
         )}

       </Droppable>
    </DragDropContext>
  );
}

export default DragDrop;