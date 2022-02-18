**_ 공부를 목적으로 만든 프로젝트입니다. _**

# Yell App - 옐

- IMac Color를 바탕으로 theme로 만든 Kanban App 입니다.

## 사용한 스킬(Using Skills)

- react / typescript

## [reset CSS](https://www.npmjs.com/package/styled-reset)

> npm i styled-reset

```ts
// App.tsx
import { Reset } from "styled-reset";

return (
  <div>
    <Reset />
  </div>
);
```

or

```ts
const GlobalStyle = createGlobalStyle`
    ${Reset}
  `;
```

##