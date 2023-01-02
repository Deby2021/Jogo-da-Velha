const boardRegions = document.querySelectorAll("#gameBoard span");
let vBoard = [],
  turnPlayer = "",
  points = 0,
  points2 = 0;
function updateTitle() {
  const b = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = b.value;
}
function initializeGame() {
  (vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]),
    (turnPlayer = "player1"),
    (document.querySelector("h3").innerHTML =
      'Vez de: <span id="turnPlayer"></span>'),
    updateTitle(),
    boardRegions.forEach(function (b) {
      b.classList.remove("win"),
        (b.innerText = ""),
        b.classList.add("cursor-pointer"),
        b.addEventListener("click", handboardClick);
    });
}
function disableRegion(b) {
  b.classList.remove("cursor-pointer"),
    b.removeEventListener("click", handboardClick);
}
function getWinRegions() {
  const b = [];
  return (
    vBoard[0][0] &&
      vBoard[0][0] === vBoard[0][1] &&
      vBoard[0][0] === vBoard[0][2] &&
      b.push("0.0", "0.1", "0.2"),
    vBoard[1][0] &&
      vBoard[1][0] === vBoard[1][1] &&
      vBoard[1][0] === vBoard[1][2] &&
      b.push("1.0", "1.1", "1.2"),
    vBoard[2][0] &&
      vBoard[2][0] === vBoard[2][1] &&
      vBoard[2][0] === vBoard[2][2] &&
      b.push("2.0", "2.1", "2.2"),
    vBoard[0][0] &&
      vBoard[0][0] === vBoard[1][0] &&
      vBoard[0][0] === vBoard[2][0] &&
      b.push("0.0", "1.0", "2.0"),
    vBoard[0][1] &&
      vBoard[0][1] === vBoard[1][1] &&
      vBoard[0][1] === vBoard[2][1] &&
      b.push("0.1", "1.1", "2.1"),
    vBoard[0][2] &&
      vBoard[0][2] === vBoard[1][2] &&
      vBoard[0][2] === vBoard[2][2] &&
      b.push("0.2", "1.2", "2.2"),
    vBoard[0][0] &&
      vBoard[0][0] === vBoard[1][1] &&
      vBoard[0][0] === vBoard[2][2] &&
      b.push("0.0", "1.1", "2.2"),
    vBoard[0][2] &&
      vBoard[0][2] === vBoard[1][1] &&
      vBoard[0][2] === vBoard[2][0] &&
      b.push("0.2", "1.1", "2.0"),
    b
  );
}
function handleWin(c) {
  c.forEach(function (b) {
    document.querySelector('[data-region="' + b + '"]').classList.add("win");
  });
  const a = document.getElementById(turnPlayer).value;
  document.querySelector("h3").innerHTML = a + " Venceu!!";
}
function handboardClick(h) {
  const i = h.currentTarget,
    a = i.dataset.region,
    b = a.split("."),
    c = b[0],
    d = b[1];
  "player1" === turnPlayer
    ? ((i.innerText = "X"), (vBoard[c][d] = "X"))
    : ((i.innerText = "O"), (vBoard[c][d] = "O")),
    console.clear(),
    console.table(vBoard),
    disableRegion(i);
  const e = getWinRegions();
  if (0 < e.length) {
    handleWin(e);
    const b = document.getElementById(turnPlayer).value;
    "X" === i.innerText
      ? (++points,
        (document.querySelector("#p1").innerHTML =
          b + ": " + points + " pontos!"),
        console.log(points))
      : (points2++,
        (document.querySelector("#p2").innerHTML =
          b + ": " + points2 + " pontos!")),
      document.querySelector("#p1").classList.add("font"),
      document.querySelector("#p2").classList.add("font"),
      boardRegions.forEach(function (b) {
        b.classList.remove("cursor-pointer"),
          b.removeEventListener("click", handboardClick);
      });
  } else
    vBoard.flat().includes("")
      ? ((turnPlayer = "player1" === turnPlayer ? "player2" : "player1"),
        updateTitle())
      : (document.querySelector("h3").innerHTML = "Empate");
}
document.getElementById("start").addEventListener("click", initializeGame);
