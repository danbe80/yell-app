import { atom } from "recoil";

export interface ITheme{
  color: string;
}

export const colorState = atom({
  key: "colors",
  default: "yellowTheme"
})