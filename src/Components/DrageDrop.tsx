import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "./Board";

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

function DragDrop(){
  const [toDos, setToDos] = useRecoilState(toDoState);
  console.log(Object.keys(toDos).map((boardId,index, toForm)=> console.log(boardId , toForm, index)));

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
       <Droppable droppableId="form">
         {(p)=>(
           <Boards ref={p.innerRef}>
             {Object.keys(toDos).map((boardId, index) => (
               <Draggable draggableId={boardId} index={index}>
                 {(p) => (
                    <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>{boardId}</div>
                 )}
               </Draggable>
             ))}
           </Boards>
         )}

       </Droppable>
    </DragDropContext>
  );
}

export default DragDrop;