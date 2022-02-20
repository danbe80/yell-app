import React from "react";
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
`;

const Title = styled.h2`
  height: 25px;
  padding-top: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;




function DragDrop(){
  const [toDos, setToDos] = useRecoilState(toDoState);
  // form은 무조건 같은 보드판에서 움직임
  const onDragEnd = (info:DropResult) => {
    const {destination, source, draggableId} = info;
    console.log(destination)
    console.log(source)
    console.log(draggableId)
    if(!destination) return;
    if(destination.droppableId === source.droppableId){
      if(destination.index !== source.index){
        console.log(source.index) // 1
        console.log(destination.index) // 0
        setToDos((allCards) => {
          const cardCopy = [...allCards[source.droppableId]];
          const cardObj = cardCopy[source.index];
          console.log(cardCopy)
          console.log(cardObj)
          console.log(source.droppableId)
          console.log(destination.droppableId)
          cardCopy.splice(source.index, 1);
          cardCopy.splice(destination.index, 0, cardObj);
          console.log(cardCopy)
          console.log(cardObj)
          console.log(allCards);
          return {
            ...allCards,
            [source.index]: cardCopy
          }
        })
      }
      else {
        const allForm = Object.keys(toDos);
        const allValue = Object.values(toDos);
        const toFormCopy = [...allForm];
        const toDosCopy = [...allValue];
        toFormCopy.splice(source.index, 1);
        toFormCopy.splice(destination.index, 0 , draggableId);
        toDosCopy.splice(source.index, 1);
        toDosCopy.splice(destination.index, 0, allValue[source.index]);
        const r = toFormCopy.reduce((key, name, idx)=>{
          return {...key, [name]:toDosCopy[idx]}
        }, {})
        setToDos({...r});
        console.log(toDos)
      }
   }
    if(destination.droppableId !== source.droppableId){
        setToDos((allCards) => {
          const sourceCard = [...allCards[source.droppableId]]
          const cardObj = sourceCard[source.index]
          const destinationCard = [...allCards[destination.droppableId]];
          sourceCard.splice(source.index, 1);
          destinationCard.splice(destination.index, 0, cardObj);
          return {
            ...allCards,
            [source.droppableId]: sourceCard,
            [destination.droppableId]: destinationCard
          }
        })
    }
  }
  return (
  <DragDropContext onDragEnd={onDragEnd} >
    <Droppable droppableId="one" direction="horizontal" type="COLUMN">
      {(p)=>(
        <Boards ref={p.innerRef}>
          {Object.keys(toDos).map((boardId, index, toForm) => (
            <Draggable draggableId={boardId} index={index} key={boardId}>
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

export default React.memo(DragDrop);




