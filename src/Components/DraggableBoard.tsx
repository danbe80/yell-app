/* import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Board from "./Board";

const Wrapper = styled.div`` */
function DraggableBoard(/* {boardId, index, toDos} */){
  return null; 
  
  /* (
    <Droppable droppableId={boardId}>
      {(provided, info)=> (
        <Wrapper
          isDraggingOver={info.isDraggingOver}
          isDraggingFromThis={Boolean(info.draggingFromThisWith)}
          ref={provided.innerRef} {...provided.droppableProps}>
          <Draggable draggableId={boardId} index={index}>
           {(provided, snapshot)=> (
             <Board 
              boardId={boardId} 
              key={boardId} 
              toDos={toDos[boardId]} 
              index={index}/>
           )}
          </Draggable> 
        </Wrapper>
      )}
    </Droppable>
  ); */ 
}

export default DraggableBoard;