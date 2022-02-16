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
`
const ChangeTheme = styled.button`
  background-color: green;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: none;
`;

function HeaderBtn(){
  return (
    <BtnWrap>
      <DelBtn></DelBtn>
      <ChangeTheme></ChangeTheme>
    </BtnWrap>
  );
}

export default HeaderBtn;