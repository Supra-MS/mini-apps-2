import React from "react";
import FillFrameContent from "../utils/FillFrameContent";

const Frame = ({ nthFrame, pinsKnocked, score, totalScore, currentFrame, roll }) => {
  let isLastFrame = (nthFrame === 9);
  let isTotalFrame = (nthFrame === 10);
  let { roll1, roll2, roll3 } = FillFrameContent(nthFrame, pinsKnocked);

  return (
    <>
      <div className="frame-title">
        {isTotalFrame
          ? <span>Total</span>
          : <span>Frame {nthFrame + 1}</span>
        }
      </div>

      <div className={`frame-box`}>
        {!isTotalFrame &&
          <div className="frame-roll">
            <span className={`frame-roll-score ${typeof roll1 !== 'undefined' && `green`} ${currentFrame && roll === 0 && 'orange'}`}>
              {roll1}
            </span>
            <span className={`frame-roll-score ${typeof roll2 !== 'undefined' && `green`} ${currentFrame && roll === 1 && 'orange'} ${roll2 === '/' && 'spare'}`}>
              {roll2}
            </span>
            {isLastFrame && (
              <span className={`frame-roll-score ${typeof roll3 !== 'undefined' && `green`} ${currentFrame && roll === 2 && 'orange'}`}>
                {roll3}
              </span>
            )}
          </div>
        }
        {isTotalFrame
          ? <div className={`total-frame`}>{totalScore}</div>
          : <div className="nframe-score">{score[nthFrame] || ""}</div>
        }
      </div>
    </>
  );
};

export default Frame;
