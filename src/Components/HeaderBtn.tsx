import { useState } from "react";
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
const ChangeTheme = styled.button`
  background-color: ${props => props.theme.boardColor};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid rgba(194, 194, 194, 0.498);
  box-sizing: border-box;
  &:hover {
    box-shadow: 1px 1px 4px rgba(0,0,0,.3) inset;
  }
`;

function HeaderBtn(){
  const [changeColor, setChangeColor] = useState(false);

  const onChangeColor = () => {
    // theme color 변경
    if(changeColor){
      console.log("색 picker on");
      setChangeColor(false);
    }
    else {
      console.log("색 picker off");
      setChangeColor(true);
    }
  }
  return (
    <BtnWrap>
      <ChangeTheme onClick={onChangeColor}/>
      {}
    </BtnWrap>
  );
}

export default HeaderBtn;