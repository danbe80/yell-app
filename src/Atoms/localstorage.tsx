import {IToDoState} from "./atoms";
import { ITheme } from "./color";


export const LOCAL_TODO = 'toDos';
export const LOCAL_THEME = 'color'

export const loadToDos = () => {
  const localToDos = localStorage.getItem(LOCAL_TODO);
  if(localToDos){
    return JSON.parse(localToDos);
  }
  return null;
};

export const loadTheme = () => {
  const localTheme = localStorage.getItem(LOCAL_THEME);
  if(localTheme){
    return JSON.parse(localTheme);
  }
  return "yellowTheme"
}

export const saveToDos = (todos: IToDoState) => {
  localStorage.setItem(LOCAL_TODO, JSON.stringify(todos))
}

export const saveTheme = (colors: ITheme) => {
  localStorage.setItem(LOCAL_THEME, JSON.stringify(colors))
}
