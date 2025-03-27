var numSelected = null;
var tileSelected = null;

var easyBtn = document.getElementById("easyButton");
var mediumBtn = document.getElementById("mediumButton");
easyBtn.addEventListener('click', function() {
  if (window.location.pathname.endsWith("index.html")) {
    return;
  } else {
    window.location.href = "../index.html"
  }
});

mediumBtn.addEventListener('click', function() {
  var mediumBoardJSON = JSON.stringify(mediumBoard)
  var mediumSolutionJSON = JSON.stringify(mediumSolution)
  localStorage.setItem('Board', mediumBoardJSON);
  localStorage.setItem('Solution', mediumSolutionJSON);
  
  if (window.location.pathname.endsWith("medio.html")) {
    return;
  }
  
  document.getElementById("board").innerHTML = '';
  document.getElementById("digits").innerHTML = '';
  
  window.location.href = "./Dificuldades/medio.html";
});


var errors = 0;

var Board = [
  "--74916-5",
  "2---6-3-9",
  "-----7-1-",
  "-586----4",
  "--3----9-",
  "--62--187",
  "9-4-7---2",
  "67-83----",
  "81--45---"
];

var Solution = [
  "387491625",
  "241568379",
  "569327418",
  "758619234",
  "123784596",
  "496253187",
  "934176852",
  "675832941",
  "812945763"
];

var mediumBoard = [
  "---6-1---",
  "38-----74",
  "---------",
  "6-18-27-5",
  "--3-6-2--",
  "8-29-76-3",
  "---------",
  "79-----86",
  "---4-5---"
]

var mediumSolution = [
  "527641839",
  "386259174",
  "419378562",
  "641832795",
  "973564218",
  "852917643",
  "234786951",
  "795123486",
  "168495327",
]

window.onload = function() {
  if (localStorage.getItem('Board') && localStorage.getItem('Solution')) {
    Board = JSON.parse(localStorage.getItem('Board'));
    Solution = JSON.parse(localStorage.getItem('Solution'));
    localStorage.removeItem('Board');
    localStorage.removeItem('Solution');
  } else {
    console.warn("No board or solution found in localStorage. Using default values.");
  }

setGame();
}

function setGame(){

  // Digits 1 - 9
  for (let i = 1; i <= 9; i++) {
    // <div id="1" class="number">1</div>
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener('click', selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  
    // Board (9x9)
    for (let r = 0; r < 9; r++){
      for (let c = 0; c < 9; c++){
        var tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        if(Board[r][c] != "-"){
          tile.innerText = Board[r][c];
          tile.classList.add('tile-start');
        }
        if (r == 2 || r == 5){
          tile.classList.add('horizontal-line');
        }
        if (c == 5 || c == 2) {
          tile.classList.add('vertical-line');
        }
        tile.addEventListener('click', selectTile);
        tile.classList.add("tile");
        document.getElementById("board").append(tile);
      }
    }
}

function selectNumber(){
  if (numSelected != null){
    numSelected.classList.remove('number-selected')
  }
  
  numSelected = this;
  numSelected.classList.add('number-selected');
  numSelected.addEventListener('click', deselectNumber);
}

// A function that will deselect the number and will allow the user to erase the placed number in the table.
function deselectNumber(){
  if(numSelected){
    numSelected.removeEventListener('click', deselectNumber);
    numSelected.classList.remove('number-selected');
    numSelected = null
  }
}

function selectTile(){
  // Coords = "0-0" "0-1", then 
  let coords = this.id.split("-"); // => ["0", "0"]
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  if(this.classList.contains('tile-start')){
    return;
  } else if (numSelected == null){
    this.innerText = "";
    return;
  } else {
    this.innerText = numSelected.id;

    // Checking if the number is correct, if it is, will display the number in the selected tile. If else, it will be displayed in red color.
    if (Solution[r][c] == numSelected.id) {
      this.classList.remove('wrong-number');
    } else {
      errors += 1;
      document.getElementById("errors").innerText = errors;
      let wrongcoordsnumber = r.toString() + '-' + c.toString();
      var wrongnumber = document.getElementById(wrongcoordsnumber);
      wrongnumber.classList.add('wrong-number');
    }
  }
}
