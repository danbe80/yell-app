import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

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
  toForm: string;
}

function CreateBoardForm(){
  const [toDos, setToDos] = useRecoilState(toDoState);
  const {register, setValue, handleSubmit} = useForm<IForm>({defaultValues: {toForm: ""}});
  const onValid = ({toForm}:IForm) => {
    if(toForm !== ''){
      if(
        Object.keys(toDos).some(
          (v) => v.toLowerCase() === toForm.toLowerCase(),
        )
      )
      return;
      setToDos({...toDos, [toForm]: []});
      setValue('toForm', '');
    }
  }
  return (
    <CreateFrom onSubmit={handleSubmit(onValid)}>
      <input {...register("toForm", {required: true})}
        type="text"
        placeholder="보드의 이름을 적어주세요."/>
    </CreateFrom>
  )
}

export default CreateBoardForm;