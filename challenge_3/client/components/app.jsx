import React, { Component } from "react";
import Title from "./Title.jsx";
import Reset from "./Reset.jsx";
import ScoreBoard from "./ScoreBoard.jsx";
import Keypad from "./Keypad.jsx";
import Popup from "./Popup.jsx";
import SetInitialState from "../utils/SetInitialState";
import GameLogic from "../utils/GameLogic";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = SetInitialState();
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.reset();
  }

  reset() {
    this.setState(SetInitialState());
  }

  handleClick(pins) {
    let { pinsRemaining, roll, score, frame, pinsKnocked } = this.state;
    let isLastFrame = (frame === 9);
    let pinsRem = pinsRemaining - pins;
    pinsKnocked[frame][roll] = pins;

    let newScore = score.slice();
    let updatedScore = GameLogic(frame, newScore, pinsKnocked);

    this.setState({
      totalScore: updatedScore
    });

    this.setState({
      pinsKnocked,
      score: newScore
    });

    if (roll === 0 && pinsRem > 0) {
      this.setState({
        roll: 1,
        pinsRemaining: pinsRem
      });
    } else if (isLastFrame)  {
      this.setState((prevState) => {
        return {
        frame: prevState.frame,
        roll: prevState.roll + 1,
        pinsRemaining: pinsRem === 0 ? 10 : pinsRem
      }});

      if (roll === 0) {
        this.setState({
          isActiveGame: true
        });
      } else if (roll === 1) {
        this.setState({
          isActiveGame:  pins === 10 || pinsKnocked[9][0] + pins === 10 || pinsKnocked[9][0] === 10
        });
      } else {
        this.setState({
          isActiveGame: false
        });
      }
    } else {
      this.setState((prevState) => {
        return {
        frame: prevState.frame + 1,
        roll: 0,
        pinsRemaining: 10
      }});
    }

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    let { isActiveGame, pinsKnocked, score, pinsRemaining, totalScore, modal, frame, roll } = this.state;

    return (
      <div className="container">
        <Title />
        <Reset
          reset={this.reset}
          />
        <ScoreBoard
          pinsKnocked={pinsKnocked}
          score={score}
          totalScore={totalScore}
          frame={frame}
          roll={roll}
          />
        <Keypad
          pinsRemaining={pinsRemaining}
          isActiveGame={isActiveGame}
          handleClick={this.handleClick}
          />
        <Popup
          isActiveGame={isActiveGame}
          modal={modal}
          totalScore={totalScore}
          toggle={this.toggle}
          reset={this.reset}
          />
      </div>
    );
  }
}

export default App;