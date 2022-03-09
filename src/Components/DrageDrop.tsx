/* 
  기능: 보드와 카드 Drag & Drop 
  작성자: Lee Hye Rin (danbe80)
  git address: https://github.com/danbe80/yell-app

  2022.3.9 : 수정 작업
*/

import React, { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../Atoms/atoms";
import { saveToDos } from "../Atoms/localstorage";
import Board from "./Board";

const Wrapper = styled.div`
  width: 300px;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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
  display: flex;
  width: 100%;
  height: 100%;
  display: block;
  padding-top: 10px;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  position: relative;
`;

const DeleteBtn = styled.span`
  position: absolute;
  right: 0;
  display: inline-block;
  cursor: pointer;
`;

function DragDrop() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // const delForm = useRecoilValue()

  // Drag가 끝나고 난 뒤 이벤트
  const onDragEnd = (info: DropResult) => {
    const { destination, source, type } = info;

    // 위치를 바꾸지 않거나 움직이지 않음
    if (!destination) return;

    // 다른 폼으로 이동 시
    if (destination.droppableId !== source.droppableId) {
      // 카드가 다른 폼의 다른 자리로 이동
      if (destination.index !== source.index) {
        return setToDos((allCards) => {
          const sourceCardCopy = [...allCards[source.droppableId]];
          const destinationCardCopy = [...allCards[destination.droppableId]];
          const cardObj = sourceCardCopy[source.index];
          sourceCardCopy.splice(source.index, 1);
          destinationCardCopy.splice(destination.index, 0, cardObj);
          return {
            ...allCards,
            [source.droppableId]: sourceCardCopy,
            [destination.droppableId]: destinationCardCopy,
          };
        });
      }
      // 카드가 다른 폼의 같은 자리로 이동
      return setToDos((allCards) => {
        const sourceCard = [...allCards[source.droppableId]];
        const cardObj = sourceCard[source.index];
        const destinationCard = [...allCards[destination.droppableId]];
        sourceCard.splice(source.index, 1);
        destinationCard.splice(destination.index, 0, cardObj);
        return {
          ...allCards,
          [source.droppableId]: sourceCard,
          [destination.droppableId]: destinationCard,
        };
      });
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      if (type === "COLUMN") {
        // 보드 전체가 다른 자리로 이동
        // 버벅이는 부분이 있지만,, 성공해서 행복해..이틀 걸렸다...
        // 숫자는 순서 변경이 안되는 오류가 있음...
        return setToDos((allBoards) => {
          const allEntries = Object.entries(allBoards);
          const [addForm] = allEntries.splice(source.index, 1);
          allEntries.splice(destination.index, 0, addForm);
          const r = Object.fromEntries(allEntries);
          return r;
        });
      }
      return setToDos((allCards) => {
        // 같은 보드에서 카드 자리만 이동
        const cardCopy = [...allCards[source.droppableId]];
        const cardObj = cardCopy[source.index];
        cardCopy.splice(source.index, 1);
        cardCopy.splice(destination.index, 0, cardObj);
        return {
          ...allCards,
          [source.droppableId]: cardCopy,
        };
      });
    }
  };
  // 보드 삭제하기
  const onDeleteForm = (id: string) => {
    setToDos((allBoards) => {
      const copyForm = Object.entries(allBoards);
      const newForm = copyForm.filter((v) => v[0] !== id);
      const newFormObj = Object.fromEntries(newForm);
      return { ...newFormObj };
    });
  };
  // localstorage에 보드와 카드 저장
  useEffect(() => {
    saveToDos(toDos);
  }, [toDos]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="one" direction="horizontal" type="COLUMN">
        {(provided) => (
          <Boards ref={provided.innerRef}>
            {Object.keys(toDos).map((boardId, index, toForm) => (
              <Draggable draggableId={boardId + ""} index={index} key={boardId}>
                {(provided) => (
                  <Wrapper ref={provided.innerRef} {...provided.draggableProps}>
                    <Title {...provided.dragHandleProps}>
                      {boardId}
                      <DeleteBtn
                        onClick={() => {
                          onDeleteForm(
                            provided.draggableProps["data-rbd-draggable-id"]
                          );
                        }}
                      >
                        ❌
                      </DeleteBtn>
                    </Title>
                    <Board
                      boardId={boardId}
                      key={index}
                      toForm={toForm[index]}
                    />
                  </Wrapper>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Boards>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default React.memo(DragDrop);
