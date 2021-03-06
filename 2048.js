class MyArray {
  //the rule of name let
  constructor() {
    // constructor
    this.arr = new Array(); //let of class
    for (let i = 0; i < 4; i++) {
      this.arr[i] = new Array();
      for (let j = 0; j < 4; j++) {
        this.arr[i][j] = 0;
      }
    }
  }
  init() {
    // no need to add "function" behind the function name
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.setValue(i, j, 0);
      }
    }
  }
  setValue(x, y, val) {
    // the format of function name
    let id = "cell-" + x + "-" + y;
    let cell = document.getElementById(id);
    cell.remove();
    let container = document.getElementById("container");
    cell = document.createElement("div");
    cell.id = "cell-" + x + "-" + y;
    cell.style.top = 120 * y + 20 + "px";
    cell.style.left = 120 * x + 20 + "px";
    cell.classList.add("cell");
    if (val == 0 || isNaN(val)) {
      cell.innerText = "";
    } else {
      cell.innerText = val;
      cell.classList.add("cell-" + val);
    }
    container.append(cell);
    // let cell=document.getElementById()
    return cell;
  }
  getValue(x, y) {
    return parseInt(document.getElementById("cell-" + x + "-" + y).innerText);
  }
  randomInt(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
  }
  getRandomPosition() {
    let posPos = new Array();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let cell = document.getElementById("cell-" + i + "-" + j);
        if (cell.innerText == "") {
          posPos.push([i, j]);
        }
      }
    }
    let pos = this.randomInt(0, posPos.length - 1);
    if (posPos[pos] == undefined) {
      alert("Game Over!");
      this.init();
      return 0;
    }
    return posPos[pos]; //return [i,j] a possible position
  }
  setValueInRandomPosition(num) {
    let pos = this.getRandomPosition();
    return this.setValue(pos[0], pos[1], num);
  }
  cellScale(cell) {
    cell.animate([{ transform: "scale(0.2) " }, { transform: "scale(1) " }], {
      duration: INTERVAL
    });
  }
  cellMoveTo(cell, x, y) {
    let cellx = cell.id.split("-")[1];
    let celly = cell.id.split("-")[2];
    let left = getCellPosLeftAndTop(x, y)[0];
    let top = getCellPosLeftAndTop(x, y)[1];
    cell = $("#cell-" + cellx + "-" + celly);

    // cell.animate({ "left": left+"px", "top": top+"px" }, "slow");
    cell.animate({ left: left, top: top }, INTERVAL);
  }
}
function getCellPosLeftAndTop(x, y) {
  return [parseInt(120 * x + 20), parseInt(120 * y + 20)];
}

function updateView(tmp, keyCode) {
  for (let i = 0; i < 4; i++) {
    switch (keyCode) {
      case 37:
        for (let j = 0; j < tmp[i].length; j++) {
          CELLS.setValue(j, i, tmp[i][j]);
        }
        for (let j = tmp[i].length; j < 4; j++) {
          CELLS.setValue(j, i, 0);
        }
        break;
      case 38:
        for (let j = 0; j < tmp[i].length; j++) {
          CELLS.setValue(i, j, tmp[i][j]);
        }
        for (let j = tmp[i].length; j < 4; j++) {
          CELLS.setValue(i, j, 0);
        }
        break;
      case 39:
        for (let j = 0; j < tmp[i].length; j++) {
          CELLS.setValue(3 - j, i, tmp[i][j]);
        }
        for (let j = 3 - tmp[i].length; j >= 0; j--) {
          CELLS.setValue(j, i, 0);
        }
        break;
      case 40:
        for (let j = 0; j < tmp[i].length; j++) {
          CELLS.setValue(i, 3 - j, tmp[i][j]);
        }
        for (let j = 3 - tmp[i].length; j >= 0; j--) {
          CELLS.setValue(i, j, 0);
        }
        break;
    }
  }
}
function pressKey(keyCode) {
  let tmp = new Array();
  let cellList = new Array();
  for (let i = 0; i < 4; i++) {
    tmp[i] = new Array();
    cellList[i] = new Array();
    switch (keyCode) {
      case 37: //left
        for (let j = 0; j < 4; j++) {
          if (isNaN(CELLS.getValue(j, i)) == false) {
            let cell = document.getElementById("cell-" + j + "-" + i);
            cellList[i].push(cell);
            tmp[i].push(CELLS.getValue(j, i));
          }
        }

        break;
      case 38: //up
        for (let j = 0; j < 4; j++) {
          if (isNaN(CELLS.getValue(i, j)) == false) {
            tmp[i].push(CELLS.getValue(i, j));
            let cell = document.getElementById("cell-" + i + "-" + j);
            cellList[i].push(cell);
          }
        }
        break;
      case 39: //right
        for (let j = 3; j >= 0; j--) {
          if (isNaN(CELLS.getValue(j, i)) == false) {
            tmp[i].push(CELLS.getValue(j, i));
            let cell = document.getElementById("cell-" + j + "-" + i);
            cellList[i].push(cell);
          }
        }

        break;
      case 40: //down
        for (let j = 3; j >= 0; j--) {
          if (isNaN(CELLS.getValue(i, j)) == false) {
            tmp[i].push(CELLS.getValue(i, j));
            let cell = document.getElementById("cell-" + i + "-" + j);
            cellList[i].push(cell);
          }
        }

        break;
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < tmp[i].length; j++) {
      console.log(tmp[i]);
      if (tmp[i][j] == tmp[i][j + 1]) {
        SCORE += tmp[i][j] * 2;
        $("#score").text(SCORE);
        switch (keyCode) {
          case 37: //left
            CELLS.cellMoveTo(cellList[i][j + 1], j, i);
            console.log("move to", j, i);
            break;
          case 38: //up
            CELLS.cellMoveTo(cellList[i][j + 1], i, j);
            break;
          case 39: //right
            CELLS.cellMoveTo(cellList[i][j + 1], 3 - j, i);
            break;
          case 40: //down
            CELLS.cellMoveTo(cellList[i][j + 1], i, 3 - j);
            break;
        }
        tmp[i][j] = tmp[i][j] * 2;
        tmp[i].splice(j + 1, 1);
        cellList[i].splice(j + 1, 1);
      }
      switch (keyCode) {
        case 37: //left
          CELLS.cellMoveTo(cellList[i][j], j, i);
          console.log("cell");
          console.log("move to", j, i);
          break;
        case 38: //up
          CELLS.cellMoveTo(cellList[i][j], i, j);
          break;
        case 39: //right
          CELLS.cellMoveTo(cellList[i][j], 3 - j, i);
          break;
        case 40: //down
          CELLS.cellMoveTo(cellList[i][j], i, 3 - j);
          break;
      }
    }
  }
  setTimeout(function() {
    updateView(tmp, keyCode);
    let cell = CELLS.setValueInRandomPosition(2);
    CELLS.cellScale(cell);
  }, INTERVAL);
}

function arrangeCells() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let tmp = document.getElementById("cell-" + i + "-" + j);
      tmp.style.left = 120 * i + 20 + "px";
      tmp.style.top = 120 * j + 20 + "px";
    }
  }
}
function newGame() {
  SCORE = 0;
  $("#score").text(0);
  CELLS.setValueInRandomPosition(2);
  CELLS.setValueInRandomPosition(2);
  document.onkeydown = function(event) {
    let e = event || window.event || arguments.callee.caller.arguments[0];
    // Up:38 Down:40   Left:37 Right:39
    if (
      e &&
      (e.keyCode == 40 || e.keyCode == 39 || e.keyCode == 38 || e.keyCode == 37)
    ) {
      pressKey(e.keyCode);
    }
  };
}
$("#newgame").click(function() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      CELLS.setValue(i, j, 0);
    }
  }
  newGame();
});
let INTERVAL = 200;
let SCORE = 0;
let CELLS = new MyArray();
arrangeCells();
