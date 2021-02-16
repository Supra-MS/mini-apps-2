const FillFrameContent = (nthFrame, pinsKnocked) => {
  const obj = {};
  const isTotalFrame = (nthFrame === 10);
  const isLastFrame = (nthFrame === 9)

  if (!isTotalFrame) {
    let isStrike = pinsKnocked[nthFrame][0] === 10;
    let isSpare = pinsKnocked[nthFrame][0] + pinsKnocked[nthFrame][1] === 10;

    switch (true) {
      case isStrike:
        if (isLastFrame) {
          obj.roll1 = "X";
          obj.roll2 = pinsKnocked[nthFrame][1] === 10 ? "X" : pinsKnocked[nthFrame][1];
          obj.roll3 = pinsKnocked[nthFrame][2] === 10 ? "X" : pinsKnocked[nthFrame][2];
          break;
        } else {
          obj.roll2 = "X";
          break;
        }
      case isSpare:
        obj.roll1 = pinsKnocked[nthFrame][0];
        obj.roll2 = "/";
        obj.roll3 = pinsKnocked[nthFrame][2];
        break;
      default:
        obj.roll1 = pinsKnocked[nthFrame][0];
        obj.roll2 = pinsKnocked[nthFrame][1];
        obj.roll3 = pinsKnocked[nthFrame][2];
        break;
    }
  }
  return obj;
};

module.exports = FillFrameContent;