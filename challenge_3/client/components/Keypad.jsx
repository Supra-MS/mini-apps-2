import React from "react";
import Key from "./Key.jsx";

const Keypad = ({ pinsRemaining, handleClick, isActiveGame }) => {
  return (
    <div className="keypad keypad-col">
      <div className="keypad-row">
        <p>Click Pins To Knock Down</p>
      </div>
      {[[0], [1, 2, 3], [4, 5, 6], [7, 8, 9], [10]].map((row, i) => {
        return (
          <div className="keypad-row" key={i}>
            {row.map((pins, i) => {
              return (
                <div className="keypad-col" key={i}>
                  <Key
                    disabled={(pins > pinsRemaining) || !isActiveGame}
                    handleClick={handleClick}
                    pins={pins}
                    isActiveGame={isActiveGame}
                    spare={pins === pinsRemaining && pins !== 10}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keypad;
