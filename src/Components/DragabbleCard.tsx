import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../Atoms/atoms";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  position: relative;
  padding: 10px;
  background-color: ${(props) => 
    props.isDragging ? props.theme.draggingCardColor 
    :props.theme.cardColor};
  border-radius: 5px;
  margin-bottom: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
`;
const DelBtn = styled.span`
  position: absolute;
  right: 5px;
  cursor: pointer;
`;
interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragabbleCard({toDoId, toDoText, index}: IDragabbleCardProps){
  const setToDos = useSetRecoilState(toDoState);
  const onDeleteBtn = (id:string) => {
    setToDos((toDoCards) => {
      const copyBoard = {...toDoCards};
      const keys = Object.keys(copyBoard);
      keys.forEach((key) => {
        copyBoard[key] = toDoCards[key].filter(
          (toDoCard) => toDoCard.id !== Number(id)
        );
      });
      return copyBoard;
    });
  }
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {/* ex 포스트잇 부분 component */}
      {(provided, snapshot) => (
        <Card ref={provided.innerRef} 
        isDragging={snapshot.isDragging}
        {...provided.draggableProps} 
        {...provided.dragHandleProps}>
          {toDoText}
          <DelBtn onClick={() => {onDeleteBtn(provided.draggableProps["data-rbd-draggable-id"])}}>❌</DelBtn>
        </Card>
      )}
    </Draggable>
  );
}

// React memo는 계속 Card가 리렌더링 되는 것을 막기 위해서
export default React.memo(DragabbleCard);