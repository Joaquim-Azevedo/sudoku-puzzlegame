var numSelected = null;
var tileSelected = null;

var easyBtn = document.getElementById("easyButton");
var mediumBtn = document.getElementById("mediumButton");
var hardBtn = document.getElementById('hardButton')

easyBtn.addEventListener('click', function() {
  localStorage.clear();
  if (window.location.pathname.endsWith("index.html")) {
    return;
  } else {
    window.location.href = "../index.html"
  }
});

mediumBtn.addEventListener('click', function() {
  var mediumBoardJSON = JSON.stringify(mediumBoard);
  var mediumSolutionJSON = JSON.stringify(mediumSolution);
  localStorage.setItem('Board', mediumBoardJSON);
  localStorage.setItem('Solution', mediumSolutionJSON);
  
  if (window.location.pathname.endsWith("medio.html")) {
    return;
  } else if (window.location.pathname.endsWith("dificil.html")) {
    window.location.href = "medio.html"
  } else {
    window.location.href = "./Dificuldades/medio.html";
  }
  
  document.getElementById("board").innerHTML = '';
  document.getElementById("digits").innerHTML = '';
  
});

hardBtn.addEventListener('click', function() {
  var hardBoardJSON = JSON.stringify(hardBoard);
  var hardSolutionJSON = JSON.stringify(hardSolution);
  localStorage.setItem('Board', hardBoardJSON);
  localStorage.setItem('Solution', hardSolutionJSON);

  if (window.location.pathname.endsWith("dificil.html")) {
    return;
  } else if (window.location.pathname.endsWith("medio.html")) {
    window.location.href = "dificil.html"
  } else {
    window.location.href = "./Dificuldades/dificil.html";
  }

  document.getElementById("board").innerHTML = '';
  document.getElementById("digits").innerHTML = '';
  
})

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

var hardBoard = [
  "-8-------",
  "--61--9-5",
  "-4--62-1-",
  "--9----5-",
  "--8---3--",
  "-5----1--",
  "-9-48--2-",
  "3-7--15--",
  "-------3-",
]

var hardSolution = [
  "981754263",
  "276138945",
  "543962817",
  "139827456",
  "468519372",
  "752346198",
  "695483721",
  "327691584",
  "814275639",
]


window.onload = function() {
  if (localStorage.getItem('Board') && localStorage.getItem('Solution') && window.location.pathname.endsWith('medio.html')) {
    Board = JSON.parse(localStorage.getItem('Board'));
    Solution = JSON.parse(localStorage.getItem('Solution'));
  }

  if (localStorage.getItem('Board') && localStorage.getItem('Solution') && window.location.pathname.endsWith('dificil.html')) {
    Board = JSON.parse(localStorage.getItem('Board'));
    Solution = JSON.parse(localStorage.getItem('Solution'));
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
      tile.classList.add("tile");
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
      
      tile.addEventListener('click', highlightTile);
      tile.addEventListener('click', selectTile);
      
      document.getElementById("board").append(tile);
      }
    }
}

function selectNumber(){
  if (numSelected != null){
    numSelected.classList.remove('number-selected')
  }

  if (numSelected === this) {
    numSelected = null;
  } else {
    numSelected = this;
    numSelected.classList.add('number-selected');
  }
}

function selectTile(){

  // Coords = "0-0" "0-1", then 
  tileSelected = this.id.split("-"); // => ["0", "0"]
  row = parseInt(tileSelected[0]);
  col = parseInt(tileSelected[1]);

  if(this.classList.contains('tile-start')){
    return;
  } else if (numSelected == null){
    this.innerText = "";
    this.addEventListener('click', highlightTile)
    return;
  } else {
    this.innerText = numSelected.id;

    // Checking if the number is correct, if it is, will display the number in the selected tile. If else, it will be displayed in red color.
    if (Solution[row][col] == numSelected.id) {
      this.classList.remove('wrong-number');
    } else if (window.location.pathname.endsWith("medio.html")){
      errors += 1;
      document.getElementById("errors").innerText = errors;
    } else if(window.location.pathname.endsWith("dificil.html")){
      errors += 1;
      document.getElementById("errors").innerText = errors;
      
    } else {
      errors += 1;
      document.getElementById("errors").innerText = errors;
      let wrongcoordsnumber = row.toString() + '-' + col.toString();
      var wrongnumber = document.getElementById(wrongcoordsnumber);
      wrongnumber.classList.add('wrong-number');
    }
    if (window.location.pathname.endsWith("medio.html") && errors === 4){
      alert('Você perdeu! Nessa dificuldade a quantidade de erros permitida é: 3');
      location.reload();
    } else if (window.location.pathname.endsWith("dificil.html") && errors === 1) {
      alert('Você perdeu! Nessa dificuldade, ao errar você perde!');
      location.reload();
    } 
  }
}

function highlightTile() {
  if (tileSelected && this.id === tileSelected.join("-")) {
    clearHighlights();
    tileSelected = null;
    return;
  } else if(window.location.pathname.endsWith('dificil.html')){
    return;
  } else {
    clearHighlights();
    this.classList.add('tile-target');
  }

  tileSelected = this.id.split("-"); // ["row", "col"]
  let row = parseInt(tileSelected[0]);
  let col = parseInt(tileSelected[1]);
  
  // Add the column and row hightlights
  for (let i = 0; i < 9; i++) {
    // Line
    let rowTile = document.getElementById(row + "-" + i);
    if (rowTile) {
      rowTile.classList.add("tile-highlight");
    }
    
    // Column
    let colTile = document.getElementById(i + "-" + col);
    if (colTile) {
      colTile.classList.add("tile-highlight");
    }
  }
}

// Função para limpar os destaques
function clearHighlights() {
  let highlightedTiles = document.querySelectorAll(".tile-highlight");
  highlightedTiles.forEach(tile => {
    tile.classList.remove("tile-highlight");
    tile.classList.remove('tile-target');
  });
}

