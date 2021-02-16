import React from "react";
import Frame from "./Frame.jsx";

const ScoreBoard = ({ pinsKnocked, score, totalScore, frame, roll, isCurrentPlayer }) => {
  return (
    <div className="score-board container">
        <div className="score-row">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((nthFrame, i) => {
            return (
              <div className="score-col" key={i}>
                <Frame nthFrame={nthFrame} pinsKnocked={pinsKnocked} score={score} totalScore={totalScore} currentFrame={frame === i} roll={roll} isCurrentPlayer={isCurrentPlayer} />
              </div>
            )
          }
          )}
        </div>
    </div>
  );
};

export default ScoreBoard;
