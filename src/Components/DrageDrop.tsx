/* 
  기능: 보드와 카드 Drag & Drop 
  작성자: Lee Hye Rin (danbe80)
  git address: https://github.com/danbe80/yell-app

  2022.3.9 : 수정 작업

  2022.4.23 : code review

  함수형 프로그래밍 짠 이유?
  가장 익숙한 프로그래밍 구조여서?
*/
/* 
  useEffect : 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 Hook
  DragDropContext : Drag & Drop을 활성화하려는 응용 프로그램 부분을 래핑하는 태그
  Droppable : 드롭될 수 있는 영역
  Draggable : 끌 수 있는 것
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
// 상태관리
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
    // 옮겨진 위치(Drag) : destination
    // 선택한 카드 위치(Drop) : source

    console.log(source);
    console.log(destination);
    console.log(toDos);

    // 움직임이 없는 경우 (destination이 undefined일 경우)
    // 위치를 바꾸지 않거나 움직이지 않음
    if (!destination) return;

    // 움직임이 있는 경우
    // 보드의 움직임일 경우
    // 2022. 04.25 update
    if (source.droppableId === "board") {
      // index가 변경될 경우 (보드의 위치가 변경되었다.)
      if (destination.index !== source.index) {
        return setToDos((allBoards) => {
          //Object.entries() : 객체 => 배열
          const allEntries = Object.entries(allBoards);
          // 선택한 보드를 복사
          const [sourceBoardCopy] = allEntries.splice(source.index, 1);
          allEntries.splice(destination.index, 0, sourceBoardCopy);
          allBoards = Object.fromEntries(allEntries);
          return { ...allBoards };
        });
        // return console.log("보드판의 위치가 변경되었다");
      }
      // index가 같은 경우 (보드의 위치가 변경되지 않았다.)
      console.log("보드판의 위치가 변경되지 않았다.");
    }
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
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided) => (
          <Boards ref={provided.innerRef}>
            {Object.keys(toDos).map((boardId, index, toForm) => (
              <Draggable draggableId={boardId} index={index} key={boardId}>
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
