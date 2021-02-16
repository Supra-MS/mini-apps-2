const SetInitialState = () => {
  let initialState;
  const pinsKnocked = [...new Array(10)].map(()=> []);
  const score = [...new Array(10)].map(()=> 0);

  initialState = {
    pinsKnocked,
    score,
    frame: 0,
    roll: 0,
    pinsRemaining: 10,
    totalScore: 0,
    isActiveGame: true,
    modal: true
  }

  return initialState;
};

module.exports = SetInitialState;