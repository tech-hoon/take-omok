import Board from "../Board/Board";
import Stone from "../Stone/Stone";
import Chat from "../Chat/Chat";

const Play = () => {
  return (
    <div>
      <div className='title'>Play Page</div>
      <Board />
      <Chat />
    </div>
  );
};

export default Play;
