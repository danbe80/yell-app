import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const FormWrap = styled.div``;

const CreateFrom = styled.form`
 display: flex;
  height: 100%;
  justify-content: center;
  input {
    background-color: transparent;
    border: none;
    padding: 2px;
  }
`;


const FormBtn = styled.button`
  display: block;
  background-color: transparent;
  padding: 2px 10px;
  border-radius: 2px;
  border: none;
  text-align: center;
  &:hover {
    background-color: ${(props) => props.theme.cardColor};
    box-shadow: 0px 1px 5px rgba(0,0,0,.2) inset;
  }
`;

interface IForm{
  fName : string;
}

function CreateBoardForm(){
  const [createFormBtn, setCreateFormBtn] = useState(false);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const {register, setValue, handleSubmit} = useForm<IForm>({defaultValues: {fName: ""}});
  const onValid = ({fName}:IForm) => {
    if(fName !== ''){
      if(
        Object.keys(toDos).some(
          (v) => v.toLowerCase() === fName.toLowerCase(),
        )
      ) return;
      setToDos({...toDos, [fName]: []});
      setValue("fName", '');
      setCreateFormBtn(false);
    }
  }

  const onClick = () => {
    if(createFormBtn){
      setCreateFormBtn(false);
    }
    else{
      setCreateFormBtn(true);
    }
  }

  return (    
    <FormWrap>
      { createFormBtn ? 
      <CreateFrom onSubmit={handleSubmit(onValid)}>
        <input {...register("fName", {required: true})}
          type="text"
          placeholder="보드의 이름을 적어주세요."
          autoFocus
          />
      </CreateFrom> :
      <FormBtn onClick={onClick}>보드판 만들기</FormBtn>}
    </FormWrap>
  )
}

export default CreateBoardForm;