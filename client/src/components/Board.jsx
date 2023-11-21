import React from "react";
import "../index.css";
import Square from "./Square";

const Board = () => {
  const gameBoard = [
    [ null, 'X',  null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, 'X',  null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, 'X',  null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, 'X',  null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, 'O',  null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]
  ];

  return (
    <div className="flex justify-center items-center w-screen">
      <div className="border-2 grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-0 w-[500px] h-[500px]">
        { (() => {

          <Square player="O" />
        })() }
      </div>
    </div>
  );
};

export default Board;
