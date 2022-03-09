import { atom } from "recoil";
import { loadTheme } from "./localstorage";

export interface ITheme {
  color: string;
}
// 테마 컬러
export const colorState = atom({
  key: "colors",
  default: loadTheme(),
});
