import {IToDoState} from "./atoms";


export const LOCAL_TODO = 'toDos';

export const loadToDos = () => {
  const localToDos = localStorage.getItem(LOCAL_TODO);
  if(localToDos){
    return JSON.parse(localToDos);
  }
  return null;
};

export const saveToDos = (todos: IToDoState) => {
  localStorage.setItem(LOCAL_TODO, JSON.stringify(todos))
}
