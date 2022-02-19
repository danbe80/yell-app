 /*    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="form">
          {(provied)=> (
            <div ref={provied.innerRef}>
              {Object.keys(toDos).map((toDo, index, boardId) => (
                <Draggable key={boardId[index]} draggableId={boardId[index]} index={index}>
                  {(provied, snapshot) => (
                    <div ref={provied.innerRef} {...provied.draggableProps}>
                      <Board boardId={boardId[index]} key={boardId[index]} toDos={toDos[index]} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
            )} */

          // {/* {()=>( */}
          // {/* 모든 보드판을 묶고 있는 영역 */}
            // {/* <Boards> */}
              // {/* {Object.keys(toDos).map((boardId: Key | null | undefined, index: number) => ( */}
                // {/* <Draggable> */}
                  // {/* <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} index={index}/> */}
                // {/* </Draggable> */}
              // {/* ))} */}
            // {/* </Boards> */}
          // {/* )} */}
          
        // {/* </Droppable> */}

      // {/* </DragDropContext> */}

      function memo(){
        return null;
      }
      export default memo;