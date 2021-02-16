const GameLogic = (frame, newScore, pinsKnocked) => {
  let updatedScore;

  for (let i = 0; frame <= 7 ? i < frame + 2 : i < 10; i++) {
    let score, nextFirstRoll, nextSecondRoll;
    let isSpare = pinsKnocked[i][0] + pinsKnocked[i][1] === 10;
    let isStrike = pinsKnocked[i][0] === 10;
    let isLastFrame = (i === 9);

    if (isSpare) {
      if (isLastFrame) {
        nextFirstRoll = pinsKnocked[i][2];
      } else {
        nextFirstRoll = pinsKnocked[i + 1][0];
      }
      // Handle nextFirstRoll = 0
      if (nextFirstRoll || nextFirstRoll === 0) {
        score = 10 + nextFirstRoll;
      }

    } else if (isStrike) {
      if (isLastFrame) {
        nextFirstRoll = pinsKnocked[i][1];
        nextSecondRoll = pinsKnocked[i][2];
      } else if (i === 8) {
        nextFirstRoll = pinsKnocked[i + 1][0];
        nextSecondRoll = pinsKnocked[i + 1][1];
      } else {
        nextFirstRoll = pinsKnocked[i + 1][0];
        nextSecondRoll = pinsKnocked[i + 1][1] === 0 ? pinsKnocked[i + 1][1] : pinsKnocked[i + 1][1] || pinsKnocked[i + 2][0];
      }
      // Handle nextFirstRoll = 0
      if ((nextFirstRoll && (nextSecondRoll === 0 || nextFirstRoll)) ||
      ((nextFirstRoll && (nextSecondRoll === 0 || nextFirstRoll)) === 0)) {
        score =  10 + nextFirstRoll + nextSecondRoll;
      }

      // OPEN THROWS
    } else {
      score = pinsKnocked[i][0] + pinsKnocked[i][1];
    }

    let previousScore = newScore[i - 1] || 0;
    let checkScore = previousScore + score;

    if (!isNaN(checkScore)) {
      newScore[i] = checkScore;
      updatedScore = checkScore;
    }

  }

  return updatedScore;
}

module.exports = GameLogic;