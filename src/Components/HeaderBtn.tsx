import styled from "styled-components";

const BtnWrap = styled.div`
  height: 25px;
  margin-left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  button {
    margin: 2px;
  }
`;
const DelBtn = styled.button`
  background-color: red;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: none;
  &:hover {
    box-shadow: 2px 1px 5px rgba(0,0,0,.5) inset;
  }
`
const ChangeTheme = styled.button`
  background-color: green;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: none;
  &:hover {
    box-shadow: 2px 1px 5px rgba(0,0,0,.5) inset;
  }
`;

function HeaderBtn(){
  const onDelete = () => {
    // 폼 삭제할 수 있는 부분
  }
  const onChangeColor = () => {
    // theme color 변경
  }
  return (
    <BtnWrap>
      <DelBtn onClick={onDelete}/>
      <ChangeTheme onClick={onChangeColor}/>
    </BtnWrap>
  );
}

export default HeaderBtn;