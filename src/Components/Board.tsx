import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
const Area = styled.div<IAreaProps>`
  min-height: 220px;
  background-color: ${(props) => 
    //벗아나 도착한 영역
    props.isDraggingOver ? props.theme.overColor 
    // 벗어나고 난 영역
    :props.isDraggingFromThis ? props.theme.FromThisColor 
    // 움직이기 전 보드
    :props.theme.boardColor};
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input{
    width: 100%;
  }
`;
interface IBoardProps {
  toForm: string;
  boardId: string;
  index?: number;
}

interface IForm{
  toDo: string;
}

function Board({toForm, boardId}:IBoardProps){
  const [toDos, setToDos] = useRecoilState(toDoState);
  const {register, setValue, handleSubmit} = useForm<IForm>();
  const onValid = ({toDo}:IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return{
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]]
      };
    });
    setValue("toDo", "");
  }
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <input 
          {...register("toDo", {required: true})}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {/* ex 보드판 영역 component*/}
          {(provided, snapshot) => (
          <Area 
            isDraggingOver={snapshot.isDraggingOver} 
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} 
            ref={provided.innerRef} {...provided.droppableProps}>
            { toDos[toForm] === [] ? null :
            toDos[toForm].map((toDo, index) => (
              <DragabbleCard 
              key={toDo.id} 
              toDoId={toDo.id} 
              toDoText={toDo.text} 
              index={index}/>
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default React.memo(Board);
