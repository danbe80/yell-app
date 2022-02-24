import { atom } from "recoil";
import { loadTheme } from "./localstorage";

export interface ITheme{
  color: string;
}

export const colorState = atom({
  key: "colors",
  default: loadTheme(),
})