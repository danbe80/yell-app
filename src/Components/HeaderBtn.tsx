import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { colorState } from "../Atoms/color";
import { saveTheme } from "../Atoms/localstorage";

const BtnWrap = styled.div`
  height: 25px;
  margin-left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const ChangeTheme = styled.button`
  background-color: ${props => props.theme.boardsColor};
  width: 20px;
  height: 20px;
  margin-left: 8px;
  border-radius: 50%;
  border: 1px solid rgba(194, 194, 194, 0.498);
  box-sizing: border-box;
  &:hover {
    box-shadow: 1px 1px 4px rgba(0,0,0,.3) inset;
  }
`;

const ColorPicker = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 35px;
  border-radius: 5px;
  background-color: rgba(204, 204, 204, .8);
  width: 35px;
  height: 170px;
`
interface IColorProps {
  top: string;
  Color: string;
}

const Colors = styled.button<IColorProps>`
  position: absolute;
  width: 20px;
  height: 20px;
  top: ${props => props.top};
  border-radius: 50%;
  background-color: ${props => props.Color};
  border: none;
  &:hover {
    border: 1px solid rgba(194, 194, 194, 0.498);
    box-sizing: border-box;
    box-shadow: 1px 1px 4px rgba(0,0,0,.3) inset;
  }
`
function HeaderBtn(){
  const [colorPicker, setColorPricker] = useState(false);
  const [colors, setColor] = useRecoilState(colorState);

  const onClick = (data:any) => {
    setColor(data.target.id)
    setColorPricker(false)
  }
  const onColorPicker = () => {
    // theme color picker on/off
    if(colorPicker){
      setColorPricker(false);
    }
    else {
      setColorPricker(true);
    }
  }
  useEffect(() => {
    saveTheme(colors);
  }, [colors])
  return (
    <BtnWrap>
      <ChangeTheme onClick={onColorPicker}/>
      {colorPicker ? 
        <ColorPicker>
          <Colors onClick={onClick} id="redTheme" type="button" Color="#e74c3c" top="5px"/>
          <Colors onClick={onClick} id="yellowTheme" type="button" Color="#f6b93b" top="27px"/>
          <Colors onClick={onClick} id="greenTheme" type="button" Color="#16a085" top="49px"/>
          <Colors onClick={onClick} id="blueTheme" type="button" Color="#0c2461" top="71px"/>
          <Colors onClick={onClick} id="purpleTheme" type="button" Color="#574b90" top="93px"/>
          <Colors onClick={onClick} id="silverTheme" type="button" Color="#dfe6e9" top="115px"/>
          <Colors onClick={onClick} id="blackTheme" type="button" Color="#1e272e" top="137px"/>
        </ColorPicker> 
        : null}
    </BtnWrap>
  );
}

export default HeaderBtn;