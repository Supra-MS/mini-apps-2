import 'jsdom-global/register';
import React from 'react';
import renderer from 'react-test-renderer';
import App from "../client/components/app";
import GameLogic from "../client/utils/GameLogic";

let data1 = [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]]; // 20
let data2 = [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 9, 9]]; // 37
let data3 = [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [10, 9, 1]]; // 38
let data4 = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 10, 10]]; // 300
let data5 = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [1, 1]]; // 245
let data10 = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [1, 9, 10]]; // 271
let data6 = [[10], [1, 1], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]; // 14
let data7 = [[5, 5], [3, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]; // 16
let data11 = [[5, 5], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]; // 10
let data8 = [[8, 2], [7, 3], [3, 4], [10], [2, 8], [10], [10], [8, 0], [10], [8, 2, 9]]; // 170
let data9 = [[8, 2], [7, 3], [3, 4], [10], [2, 8], [10], [10], [0, 8], [10], [8, 2, 9]]; // 162

describe("Test Bowling Game Logic: ", () => {

  it("Initial Check - handleClick() should be called", (done) => {
    const spy = jest.spyOn(App.prototype, "handleClick");
    const component = renderer.create(<App />).getInstance();
    component.handleClick(1);
    expect(spy).toBeCalled();
    done();
  });

  it("All 1s should be 20", (done) => {
    let updatedScore;
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let frame = 0; frame < data1.length; frame++) {
      updatedScore = GameLogic(frame, score, data1);
    }
    expect(updatedScore).toBe(20);
    done();
  });


  it("Check Spares in last frame for 1s - should be 37", (done) => {
    let updatedScore;
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let frame= 0; frame< data5.length; frame++) {
      updatedScore = GameLogic(frame, score, data2);
    }
    expect(updatedScore).toBe(37);
    done();
  });

  it("Check Strikes in last frame for 1s - should be 38", (done) => {
    let updatedScore;
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let frame = 0; frame < data5.length; frame++) {
      updatedScore = GameLogic(frame, score, data3);
    }
    expect(updatedScore).toBe(38);
    done();
  });

  it("All 10s should be 300", (done) => {
    let updatedScore;
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let frame= 0; frame< data4.length; frame++) {
      updatedScore = GameLogic(frame, score, data4);
    }
    expect(updatedScore).toBe(300);
    done();
  });

  it("Check Spares in last frame for 10s - should be 271", (done) => {
    let updatedScore;
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let frame = 0; frame < data10.length; frame++) {
      updatedScore = GameLogic(frame, score, data10);
    }
    expect(updatedScore).toBe(271);
    done();
  });

  it("Check Open throws in last frame for 10s - should be 245", (done) => {
    let updatedScore;
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let frame = 0; frame < data5.length; frame++) {
      updatedScore = GameLogic(frame, score, data5);
    }
    expect(updatedScore).toBe(245);
    done();
  });

  it("Check Strikes", (done) => {
    let updatedScore;
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let frame = 0; frame < data6.length; frame++) {
      updatedScore = GameLogic(frame, score, data6);
    }
    expect(updatedScore).toBe(14);
    done();
  });

  it("Check Spares", (done) => {
    let updatedScore;
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let frame = 0; frame < data7.length; frame++) {
      updatedScore = GameLogic(frame, score, data7);
    }
    expect(updatedScore).toBe(16);
    done();
  });

  it("Check Spares - first roll to be 0", (done) => {
    let updatedScore;
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let frame = 0; frame < data11.length; frame++) {
      updatedScore = GameLogic(frame, score, data11);
    }
    expect(updatedScore).toBe(10);
    done();
  });

  it("Check possible combos for Strikes, Spares, Open throws - second roll to be 0 for Strike", (done) => {
    let updatedScore;
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let frame = 0; frame < data8.length; frame++) {
      updatedScore = GameLogic(frame, score, data8);
    }
    expect(updatedScore).toBe(170);
    done();
  });

  it("Check possible combos for Strikes, Spares, Open throws - first roll to be 0 for Strike", (done) => {
    let updatedScore;
    let score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let frame = 0; frame < data9.length; frame++) {
      updatedScore = GameLogic(frame, score, data9);
    }
    expect(updatedScore).toBe(162);
    done();
  });

});


