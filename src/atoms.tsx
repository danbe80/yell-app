import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
      
    }
  });

export const toFormState = atom<IFormState>({
  key: "postit",
  default: {
    "form": []
  },
})
interface IFormState {
  [key: string]: IForm[];
}

export interface IForm {
  id: number;
  name: string;
}