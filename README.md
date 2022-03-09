**_ 공부를 목적으로 만든 프로젝트입니다. _**

# [Yell App](https://danbe80.github.io/yell-app/) - 옐

- IMac Color를 바탕으로 theme로 만든 Kanban App 입니다.

## 사용한 스킬(Using Skills)

<img src="https://img.shields.io/badge/-React-1687A7?style=flat-square&logo=React">
<img src="https://img.shields.io/badge/-typescript-%233178C6?style=flat-square&logo=typescript&logoColor=white">

모바일, 패드, PC 환경에서 사용 가능

---

## 목표

React 프레임워크 사용해 웹사이트만들기 <br>
TypeScript를 이용하기 <br>
localStorage 이용해 데이터 저장

---

## 전체적인 기능

<img src="https://user-images.githubusercontent.com/85651246/157296882-7c6cf0b3-e7aa-4037-8348-8dc57b2131f5.gif">

---

## 목차

## 1. [Header](#1-header-영역-기능)

- [Color Theme](#①-컬러-테마-바꾸기)
- [Board & Card Create](#②-보드와-카드-생성하기)
- [Time](#③-시계)

## 2. [Main](#2-main-영역-기능)

- [Board Drag & Drop](#①-DragDrop)
- [Card Drag & Drop](#①-DragDrop)
- [Delete Board & Card](#②-보드와-카드-삭제)
- [localStorage Save](#③-localstorage-저장)

## 3. [라이브러리](#3-사용한-라이브러리)

- [react-hook-form](#①-react-hook-form)
- [react-helmet](#②-react-helmet)
- [react-beautiful-dnd](#③-react-beautiful-dnd)
- [styled-components](#④-styled-components)
- [styled-reset](#⑤-styled-reset)
- [recoil](#⑥-recoil)

## 4. [프로젝트 진행 느낌점]()

- [어려웠던 점]()
- [앞으로 고칠 점]()

---

# 1. Header 영역 기능

## ① 컬러 테마 바꾸기

🙋‍♀️ 다양한 컬러로 테마를 변경할 수 있습니다.

🎨 컬러 색상은 IMac Color를 참고로 설정했습니다.

🗨 기본 컬러 설정은 Yellow Theme 입니다.

  <img src="https://user-images.githubusercontent.com/85651246/157379693-90722f88-5439-4581-81b1-fb9c1def64dc.gif">

---

## ② 보드와 카드 생성하기

☝ '보드판 만들기' 버튼 클릭 시 입력창이 나옵니다.

<img src="https://user-images.githubusercontent.com/85651246/157381756-89bcfb72-6ef0-49d4-b310-7d576d2321ca.gif">

---

## ③ 시계

🕑 1초마다 시간을 업데이트 해준다.

```js
useEffect(() => {
  setInterval(() => {
    checkTime();
  }, 1000);
});
```

<img src="https://user-images.githubusercontent.com/85651246/157382279-e7459399-7026-41de-b05f-7de1669ad39e.JPG">

---

# 2. Main 영역 기능

## ① DragDrop

🗨 [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) 라이브러리 사용해 Drag & Drop 구현

-> dnd를 간단하게 구현할 수 있기 때문에 사용하였음.

☝ 보드와 카드를 원하는 위치에 옮긴 후 페이지를 새로고침해도 그대로 저장 (localStorage 저장)

<img src="https://user-images.githubusercontent.com/85651246/157385111-2af82f80-af3a-43ec-b1f4-ad9fa2196458.gif">

---

## ② 보드와 카드 삭제

```js
// DragDrop.tsx
// 보드 삭제하기
const onDeleteForm = (id: string) => {
  setToDos((allBoards) => {
    const copyForm = Object.entries(allBoards);
    const newForm = copyForm.filter((v) => v[0] !== id);
    const newFormObj = Object.fromEntries(newForm);
    return { ...newFormObj };
  });
};

// DragabbleCard.tsx
// 카드 삭제하기
const onDeleteBtn = (id: string) => {
  setToDos((toDoCards) => {
    const copyBoard = { ...toDoCards };
    const keys = Object.keys(copyBoard);
    keys.forEach((key) => {
      copyBoard[key] = toDoCards[key].filter(
        (toDoCard) => toDoCard.id !== Number(id)
      );
    });
    return copyBoard;
  });
};
```

- 보드와 카드를 삭제 후 useEffect로 변수의 값 변경을 감지해 localStorage에 저장

```js
// localstorage에 보드와 카드 저장
useEffect(() => {
  saveToDos(toDos);
}, [toDos]);
```

<img src="https://user-images.githubusercontent.com/85651246/157385708-b2106d4b-35ff-4db1-bf19-43c3452ebe20.gif">

---

## ③ localStorage 저장

<img src="https://user-images.githubusercontent.com/85651246/157394828-70a87294-8836-4cd0-8d11-ff32fd1f1da6.JPG">

---

# 3. 사용한 라이브러리

## ① [react-hook-form](https://react-hook-form.com/)

- [react-hook-form npm](https://www.npmjs.com/package/react-hook-form)

- 간단하게 폼의 유효성을 검사할 수 있다.

```js
const onValid = ({ toDo }: IForm) => {
  const newToDo = {
    id: Date.now(),
    text: toDo,
  };
  setToDos((allCards) => {
    return {
      ...allCards,
      [boardId]: [newToDo, ...allCards[boardId]],
    };
  });
  setValue("toDo", "");
};

<Form onSubmit={handleSubmit(onValid)}>
  <input
    {...register("toDo", { required: true })}
    type="text"
    placeholder={`Add task on ${boardId}`}
  />
</Form>;
```

---

## ② [react-helmet](https://www.npmjs.com/package/react-helmet)

- 페이지의 타이틀을 변경 가능

```js
//App.tsx
<Helmet>
  <title>Yell</title> // 타이틀명
</Helmet>
```

## ③ [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

- [react-beautiful-dnd kr](https://github.com/LeeHyungGeun/react-beautiful-dnd-kr)

- drag and drop을 쉽게 구성할 수 있도록 해주는 라이브러리

- <DragDropContext /> : 끌어서 놓기를 활성화하려는 응용 프로그램 부분을 래핑
- <Droppable /> : 드롭될 수 있는 영역.
- <Draggable /> : 끌 수 있는 것

```js
<DragDropContext onDragEnd={onDragEnd}>
  {" "}
  // onDragEnd props가 필수로 들어감
  <Droppable droppableId="drop">
    {" "}
    // droppableId props는 필수
    {
      //자식들은 반드시 ReactElement를 반환하는 함수
      //provided.innerRef를 ReactElement의 최상단 DOM 노드에 바인드(bind)해야 함.
      //snapshot.isDraggingOver은 드래그 중에 Droppable 모양을 변경하기 위해 사용
      (provided, snapshot) => (
        <div ref={provided.innerRef}>
          // DraggableId props는 필수
          <Draggable draggableId="drag">
            {
              //자식들은 반드시 ReactElement를 반환하는 함수
              (provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                  <h1 {...provided.dragHandleProps}>drag me</h1>
                </div>
              )
            }
          </Draggable>
          // 요소가 드래그 된 공간을 줄이지 않고 fixed 시켜줌
          {provided.placeholder}
        </div>
      )
    }
  </Droppable>
</DragDropContext>
```

---

## ④ [styled-components](https://styled-components.com/)

- JS파일 내에서 CSS를 사용할 수 있게 해주는 CSS-in-JS라이브러리로 React 프레임워크를 주요 대상으로 한 라이브러리

- CSS를 컴포넌트화하여 JSX로 사용 가능

- CSS에 Props 사용 가능

---

## ⑤ [styled-reset](https://www.npmjs.com/package/styled-reset)

- [reset css](https://meyerweb.com/eric/tools/css/reset/) 를 styled로 사용할 수 있게 만듬

---

## ⑥ [recoil](https://recoiljs.org/ko/)

- react를 위한 상태관리 라이브러리

- recoil 상태를 사용하는 컴포넌트는 부모 트리 어딘가에 나타나는 RecoilRoot가 필요.

  ### Atom

  - 상태(State)의 일부를 나타낸다. 어떤 컴포넌트에서나 읽고 쓸 수 있음.

  - atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독함. atom에 어떤 변화가 있으면, atom을 구독하는 모든 컴포넌트들이 재 렌더링 되는 결과가 발생
