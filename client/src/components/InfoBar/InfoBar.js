import React from "react";
import "./InfoBar.css";

import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

const TurnStatus = (turn) => {
  if (turn === 1) return "흑돌 차례입니다.";
  else if (turn === 2) return "백돌 차례입니다.";
  else return "게임이 종료되었습니다.";
};

const InfoBar = ({ turn }) => {
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
      <div className='turnStatus'>{TurnStatus(turn)}</div>
    </div>
  );
};

export default InfoBar;
