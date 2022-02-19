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
  box-shadow: 0 2px 10px rgba(0,0,0,.2);
  margin-bottom: 5px;
  border: 1px solid red;
  box-sizing: border-box;
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
  toForm: string;
  boardId: string;
  index?: number;
}

interface IForm{
  toDo: string;
}

function Board({toForm, boardId, index}:IBoardProps){
  console.log(toForm);
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
  const onDragEnd = () => {

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
        {() => (<div></div>)}
        {/* ex 보드판 영역 component*/}
       {/*  {(provided, info) => (
          <Area 
            isDraggingOver={info.isDraggingOver} 
            isDraggingFromThis={Boolean(info.draggingFromThisWith)} 
            ref={provided.innerRef} {...provided.droppableProps}>
            {toForm.map((toDo, index) => (
              <DragabbleCard 
              key={toDo.id} 
              toDoId={toDo.id} 
              toDoText={toDo.text} 
              index={index}/>
              
            ))}
            {provided.placeholder}
          </Area>
        )} */}
      </Droppable>
    </Wrapper>
  );
}
export default Board;



/* 
              <Draggable draggableId={toDoId + ""} index={index}>
                {(provided, snapshot) => (
                <Card ref={provided.innerRef} 
                isDragging={snapshot.isDragging}
                {...provided.draggableProps} 
                {...provided.dragHandleProps}>
                  {toDoText}
                </Card>
                )}
             </Draggable> */