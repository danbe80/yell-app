import { atom } from "recoil";
import { loadToDos } from "./localstorage";

export interface IToDo {
  id: number; // 카드 구분 id
  text: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDos", // 고유한 key
  default: loadToDos() ?? {},
  /* 
  loadToDos의 retunr이 null 또는 undefined가 아니라면
  localStorage에 저장된 값을 넣어준다.
  */
});

export interface IDelete {
  deleteBtn: boolean;
}
