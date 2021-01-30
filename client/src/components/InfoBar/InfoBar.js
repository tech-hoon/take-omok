import React from "react";
import "./InfoBar.css";

const InfoBar = (turn) => {
  console.log(turn.turn);
  return (
    <div className='turnStatus'>
      {turn.turn == 1 ? "흑돌 차례입니다." : "백돌 차례입니다."}
    </div>
  );
};

export default InfoBar;
