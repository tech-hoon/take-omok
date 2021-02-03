import { useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className='homeOuterContainer'>
      <div className='homeInnerContainer'>
        <div className='titleBox'>
          <div className='logoBox'>
            <img className='logo' src='./baduk.jpg' />
          </div>
          <h1 className='heading'>Take-Omok</h1>
        </div>
        <div>
          <input
            placeholder='Name'
            className='homeInput'
            type='text'
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='Room'
            className='homeInput mt-20'
            type='text'
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/play?name=${name}&room=${room}`}
        >
          <button className='button mt-20' type='submit'>
            시작하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
