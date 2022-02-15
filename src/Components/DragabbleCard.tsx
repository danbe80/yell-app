import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 10px;
  background-color: ${(props) => 
    props.isDragging ? props.theme.draggingCardColor 
    :props.theme.cardColor};
  border-radius: 5px;
  margin-bottom: 5px;
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragabbleCard({toDoId, toDoText, index}: IDragabbleCardProps){
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {/* ex 포스트잇 부분 component */}
      {(provided, snapshot) => (
        <Card ref={provided.innerRef} 
        isDragging={snapshot.isDragging}
        {...provided.draggableProps} 
        {...provided.dragHandleProps}>
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

// React memo는 계속 Card가 리렌더링 되는 것을 막기 위해서
export default React.memo(DragabbleCard);