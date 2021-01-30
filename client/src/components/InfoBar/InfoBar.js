import React from "react";
import "./InfoBar.css";

import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

const InfoBar = (turn) => {
  return (
    <div className='infoBox'>
      <ExitToAppRoundedIcon
        className='exitButton'
        fontSize='large'
        onClick={() => {
          if (window.confirm("게임을 종료하시겠습니까?")) {
            window.location.href = "/";
          }
        }}
      />
      <div className='turnStatus'>
        {turn.turn === 1 ? "흑돌 차례입니다." : "백돌 차례입니다."}
      </div>
    </div>
  );
};

export default InfoBar;
