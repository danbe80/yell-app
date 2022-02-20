import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Time = styled.div`
  height: 100%;
  font-weight: 400;
  font-size: 14px;
  margin-right: 5px;
  margin-top: 8px;
`;


function Timer(){
  const [time, setTime] = useState<String>();
  // 시간 만드는 function
  const checkTime = () => {
    const currentTime = new Date();
    let hours = currentTime.getHours() < 9 ? String(currentTime.getHours()).padStart(2, "0") : currentTime.getHours();
    let minutes = currentTime.getMinutes() < 9 ? String(currentTime.getMinutes()).padStart(2, "0") : currentTime.getMinutes();
    let times = `${hours} : ${minutes} `;
    setTime(times);
  }
  // 1초마다 checkTime()을 업데이트
   useEffect(() => {
      setInterval(() => {
        checkTime();
      }, 1000); 
    });
  return (
    <Time>
      {time}
    </Time>
  );
}

export default Timer;


