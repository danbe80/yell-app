import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { colorState } from "../Atoms/color";

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
interface IColor{
  color: string;
}
function HeaderBtn(){
  const [colorPicker, setColorPricker] = useState(false);
  const [colors, setColor] = useRecoilState(colorState);

  const onColorPicker = () => {
    // theme color picker on/off
    if(colorPicker){
      setColorPricker(false);
    }
    else {
      setColorPricker(true);
    }
  }
  return (
    <BtnWrap>
      <ChangeTheme onClick={onColorPicker}/>
      {colorPicker ? 
        <ColorPicker>
          <Colors onClick={() => {setColor("redTheme"); setColorPricker(false);}} type="button" Color="#e74c3c" top="5px"/>
          <Colors onClick={() => {setColor("yellowTheme"); setColorPricker(false);}} type="button" Color="#f6b93b" top="27px"/>
          <Colors onClick={() => {setColor("greenTheme"); setColorPricker(false);}} type="button" Color="#16a085" top="49px"/>
          <Colors onClick={() => {setColor("blueTheme" ); setColorPricker(false);}} type="button" Color="#0c2461" top="71px"/>
          <Colors onClick={() => {setColor("purpleTheme"); setColorPricker(false);}} type="button" Color="#574b90" top="93px"/>
          <Colors onClick={() => {setColor("silverTheme"); setColorPricker(false);}} type="button" Color="#f1f1f1" top="115px"/>
          <Colors onClick={() => {setColor("blackTheme"); setColorPricker(false);}} type="button" Color="#111111" top="137px"/>
        </ColorPicker> 
        : null}
    </BtnWrap>
  );
}

export default HeaderBtn;