import styled from "styled-components";
import HeaderBtn from "./Components/HeaderBtn";
import Timer from "./Components/Timer";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 2000px;
  min-height: 650px;
`;

const CreateFrom = styled.form`

`;
const BoardsWrap = styled.div`
  display: flex;
  width: 98%;
  height: 100%;
  margin: 0 2%;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 15px;
`;

const Header = styled.header<IHeader>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.bgColor};
  box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
  margin-bottom: 20px;
`
interface IHeader {
  bgColor: string;
}


function App() {

  
  return(
    <Wrapper>
      <Header bgColor={'#dfe4ea'}>
       <HeaderBtn />
        <CreateFrom>
          <input 
            type="text"
            placeholder="폼을 입력하시오."/>
        </CreateFrom>
        <Timer />
      </Header>
    </Wrapper>
  );
}

export default App;