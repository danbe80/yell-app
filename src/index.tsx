import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

//recoil state를 사용할 컴포넌트는 RecoilRoot 태그로 감싸주어야 함.
// 전체를 사용할 것이기 때문에 root 컴포넌트에 적용시킴
