import React from "react";

const Key = ({ pins, handleClick, disabled, isActiveGame, spare }) => {
  return (
    <div className={`key ${disabled && `disabled`} ${(!disabled && spare) && `spare-key`} `}
      onClick={() => { isActiveGame && handleClick(pins) }}>{spare ? '/' : pins === 10 ? 'X' : pins}
    </div>
  );
};

export default Key;
