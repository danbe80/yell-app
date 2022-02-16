import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {IForm} from "../atoms";

const BoardForm = styled.form`
  display: flex;
  height: 100%;
  justify-content: center;
  input {
    background-color: transparent;
    border: none;
    &:active {
      border: none;
    }
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

interface IBoardFrom {
  postit: string;
}

interface IFormProps {
  toForm : IForm[];
}
interface IFormName {
  FormName: string;
}


function CreateBoardForm({toForm}:IFormProps){
  const {register, setValue, handleSubmit} = useForm<IBoardFrom>();
  const [isCreateFormBtn, setIsCreateFormBtn] = useState(false);
  const onClick = (event:React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsCreateFormBtn((current) => !current);
  }
  const onValid = ({FormName}:IFormName) => {
    console.log(FormName);
    setValue("postit", "");
  }
  return(
    <BoardForm onSubmit={handleSubmit(onValid)}>
      {isCreateFormBtn ? 
        <input 
        {...register("postit", {required: true})}
        type="text"
        placeholder="폼이름을 입력해주세요."
      /> 
      : <FormBtn onClick={onClick}>FORM</FormBtn>}
    </BoardForm>
  );
}

export default CreateBoardForm;