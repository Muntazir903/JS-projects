const boxes = document.querySelectorAll(`.box`);
const resetGame = document.querySelector(`#resetBtn`);
const winMsg = document.querySelector(`#msg`)

let playerO = true;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [6, 4, 2],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (playerO) {
          markO = box.innerText = "O"
          box.classList.add("markO");
            playerO = false;
        } else {
            box.innerText = "X";
            markX = box.innerText = "X"
            playerO = true;
        }
        box.disabled = true;
        winner()

    });

});

const winner = () => {
    for (pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {

                pattern.forEach(index => {
                    boxes[index].classList.add('winner');
                });

                message(pos1Val)
                disableAllBoxes()
            }
        }
    }
}

const message = (player) => {
    winMsg.innerText = `Player ${player} wins.`
}

const disableAllBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

const playAgain = resetGame.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerText = "";
        playerO = true;
        box.disabled = false;
        winMsg.innerText = "Message";
        box.classList.remove(`winner`)
    })
});