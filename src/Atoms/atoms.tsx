import { atom } from "recoil";
import { loadToDos } from "./localstorage";

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: loadToDos() ?? {}
  });

export interface IDelete {
  deleteBtn: boolean;
}