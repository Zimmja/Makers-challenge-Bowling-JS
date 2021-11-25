const Frame = require("./frame");

class Scorecard {
  constructor(bowls = []) {
    this.bowls = bowls;
    this.frames = this.toFrames(this.sliceBowlsArray(this.bowls));
  }

  score = (frames = this.frames) => {
    return this.sumArr(this.frameScores(frames));
  };

  sumArr = (baseArr) => {
    if (baseArr.length === 0) return 0;
    return baseArr.reduce((prev, next) => prev + next);
  };

  board = (frames = this.frames) => {
    let allscores = this.frameScores(frames);
    let accumulator = [];
    let value = 0;
    for (let i = 0; i < allscores.length; i++) {
      value += allscores[i];
      accumulator.push(value);
    }
    return accumulator;
  };

  // Maps the individual scores of frames 0 - 9
  frameScores = (frames = this.frames) => {
    let allScores = [];
    for (let i = 0; i < this.maxFrames(frames); i += 1) {
      allScores.push(frames[i].score());
    }
    return allScores;
  };

  maxFrames = (frames = this.frames) => {
    if (frames.length >= 10) {
      return 10;
    } else {
      return frames.length;
    }
  };

  // Converts a sliced bowls array into an array of Frame objects
  toFrames = (slicedArr) => {
    return slicedArr.map((_f, index) => {
      return this.createFrame(slicedArr, index);
    });
  };

  createFrame = (slicedArr, index) => {
    return new Frame(
      slicedArr[index],
      slicedArr[index + 1],
      slicedArr[index + 2]
    );
  };

  // Slices a bowls array into 2-value arrays, e.g. [1,2,10,3,4] => [[1,2],[10,0],[3,4]]
  sliceBowlsArray = (bowls = this.bowls) => {
    let preslicedBowls = this.addZerosAfterTens(bowls);
    let slicedBowls = [];
    for (let i = 0; i < preslicedBowls.length; i += 2) {
      slicedBowls.push(preslicedBowls.slice(i, i + 2));
    }
    return slicedBowls;
  };

  addZerosAfterTens = (bowls) => {
    let newBowls = bowls;
    for (let i = 0; i < bowls.length; i++) {
      if (newBowls[i] == 10) {
        newBowls.splice(i + 1, 0, 0);
      }
    }
    return newBowls;
  };

  // Display functions to test if functions are working correctly
  showBowls = (bowls = this.bowls) => {
    console.log(bowls);
  };

  myBowls = () => this.bowls;

  myFrames = () => this.frames;
}

module.exports = Scorecard;

// let mySc = new Scorecard([
//   1, 4, 4, 5, 6, 4, 5, 5, 10, 0, 1, 7, 3, 6, 4, 10, 2, 8, 6,
// ]);

// let newFrame = mySc.createFrame(
//   [
//     [2, 2],
//     [3, 5],
//     [1, 7],
//   ],
//   0
// );
// console.log(newFrame.score());

// console.log(
//   mySc.toFrames([
//     [3, 3],
//     [2, 2],
//     [4, 3],
//   ])
// );

// console.log(mySc.myFrames());

// console.log(mySc.frameScores());
