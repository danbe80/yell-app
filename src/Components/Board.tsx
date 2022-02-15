import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardsColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;
interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
const Area = styled.div<IAreaProps>`
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
  toDos: IToDo[];
  boardId: string;
}

interface IForm{
  toDo: string;
}

function Board({toDos, boardId}:IBoardProps){
  const setToDos = useSetRecoilState(toDoState)
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
      <Title>{boardId}</Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <input 
            {...register("toDo", {required: true})}
            type="text"
            placeholder={`Add task on ${boardId}`}
          />
        </Form>
      <Droppable droppableId={boardId}>
        {/* ex 보드판 영역 component*/}
        {(provided, info) => (
          <Area 
            isDraggingOver={info.isDraggingOver} 
            isDraggingFromThis={Boolean(info.draggingFromThisWith)} 
            ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
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
export default Board;