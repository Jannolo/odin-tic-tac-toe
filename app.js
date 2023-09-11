const playerFactory = (name, mark) => {
    
    const getName = () => {return name;}
    const getMark = () => {return mark;}

    return{getMark, getName}
}

const gameBoard = (() => {
    const fieldFactory = (i) => {
        let marker = "";
        let occupied = false;
        let number = i;

        const getMarker = () => {return marker;}
        const setMarker = (mark) => {marker = mark};
        const getOccupied = () => {return occupied;}
        const setOccupied = () => {occupied = true;}
        const getNumber = () => {return number;}

        return {getMarker, setMarker, getOccupied, setOccupied, getNumber}
    }

    let fields = [];
    for (let index = 0; index < 9; index++) {
        fields.push(fieldFactory(index))
    }
    const renderGB = () => {
        const gameSpace = document.querySelector('#gameSpace')
        while(gameSpace.firstChild) {
            gameSpace.removeChild(gameSpace.firstChild)
        }
        let rowDiv
        for (let i = 0; i  < 9; i++) {
            if(i % 3 == 0) {
                rowDiv = document.createElement("div")
                rowDiv.className = "row"
                gameSpace.appendChild(rowDiv)
            }
            const fieldDiv = document.createElement("div")
            fieldDiv.classList.add("field")
            fieldDiv.id = fields[i].getNumber()
            fieldDiv.textContent = fields[i].getMarker()

            rowDiv.appendChild(fieldDiv)
        }
    }

    return {renderGB, fields};
})()

gameBoard.renderGB()

const gameFlow = (() => {
    let playerOne
    let playerTwo
    let currentPlayer

    const newGameBtn = document.querySelector("#newGame")
    newGameBtn.addEventListener("click", () => {
        const playerDialog = document.querySelector("#playerDialog")
        playerDialog.show()

        })
        const startGameBtn = document.querySelector("#startGame")
        startGameBtn.addEventListener("click", (e) => {
            e.preventDefault()
            playerOne = playerFactory(document.querySelector("#playerOne").value, 'X')
            playerTwo = playerFactory(document.querySelector("#playerTwo").value, 'O')
            //console.log(playerOne.getName())
            currentPlayer = playerOne
            playerDialog.close()
    })

    const checkRows = () => {
        if (gameBoard.fields[0].getMarker() != "" && gameBoard.fields[0].getMarker() == gameBoard.fields[1].getMarker() && gameBoard.fields[1].getMarker() == gameBoard.fields[2].getMarker()) {
            return true;
        } else if (gameBoard.fields[3].getMarker() != "" && gameBoard.fields[3].getMarker() == gameBoard.fields[4].getMarker() && gameBoard.fields[4].getMarker() == gameBoard.fields[5].getMarker()) {
            return true;
        } else if (gameBoard.fields[6].getMarker() != "" && gameBoard.fields[6].getMarker() == gameBoard.fields[7].getMarker() && gameBoard.fields[7].getMarker() == gameBoard.fields[8].getMarker()) {
            return true;
        } else {
            return false;
        }
    }

    const checkCols = () => {
        if (gameBoard.fields[0].getMarker() != "" && gameBoard.fields[0].getMarker() == gameBoard.fields[3].getMarker() && gameBoard.fields[3].getMarker() == gameBoard.fields[6].getMarker()) {
            return true;
        } else if (gameBoard.fields[1].getMarker() != "" && gameBoard.fields[1].getMarker() == gameBoard.fields[4].getMarker() && gameBoard.fields[4].getMarker() == gameBoard.fields[7].getMarker()) {
            return true;
        } else if (gameBoard.fields[2].getMarker() != "" && gameBoard.fields[2].getMarker() == gameBoard.fields[5].getMarker() && gameBoard.fields[5].getMarker() == gameBoard.fields[8].getMarker()) {
            return true;
        } else {
            return false;
        }
    }

    const checkDia = () => {
        if (gameBoard.fields[0].getMarker() != "" && gameBoard.fields[0].getMarker() == gameBoard.fields[4].getMarker() && gameBoard.fields[4].getMarker() == gameBoard.fields[8].getMarker()) {
            return true;
        } else if (gameBoard.fields[2].getMarker() != "" && gameBoard.fields[2].getMarker() == gameBoard.fields[4].getMarker() && gameBoard.fields[4].getMarker() == gameBoard.fields[6].getMarker()) {
            return true;
        } else {
            return false;
        }
    }

    const draw = () => {
      for (let index = 0; index < 9; index++) {
        if(!gameBoard.fields[index].getOccupied()) {
            return false;
        }

      }
      return true;
    }

    const winner = () => {
        const winnerDialog = document.querySelector('#winnerDialog')
        if (checkRows() || checkCols() || checkDia()) {

            const closeBtn = document.createElement("button")
            closeBtn.textContent = "X"
            closeBtn.addEventListener("click", () => {
                winnerDialog.close()
            })
            winnerDialog.appendChild(closeBtn)
            winnerDialog.textContent = "Glückwunsch du hast gewonnen, " + currentPlayer.getName() + "!"
            winnerDialog.show()
        } else if (draw()) {
            winnerDialog.textContent = "Es ist ein Unentschieden!"
            winnerDialog.show()
        }
    }

    const attachFields = () => {
    fieldsDiv = document.querySelectorAll('div.field')
    //console.log(fieldsDiv)
    fieldsDiv.forEach(field => {
       const button = document.createElement("button")
       button.id = "field-button"
       button.addEventListener("click", () => {
        if(gameBoard.fields[field.id].getOccupied() == false) {

            gameBoard.fields[field.id].setMarker(currentPlayer.getMark())
            gameBoard.fields[field.id].setOccupied()
            gameBoard.renderGB()
            winner();
            attachFields();
            if(currentPlayer == playerOne) {
                currentPlayer = playerTwo
            } else {
                currentPlayer = playerOne
            }
        }
       })
       field.appendChild(button)
        })
    }
    /* gameBoard.fields.forEach(field => {
        const button = document.createElement("button")
       button.id = "field-button"
       button.addEventListener("click", () => {
        if(field.textContent == "") {
            field.textContent = currentPlayer.getMark()
            if(currentPlayer == playerOne) {
                currentPlayer = playerTwo
            } else {
                currentPlayer = playerOne
            }
        }
       })
        field.appendChild(button)
    }) */
    attachFields()
    })();

//console.log(gameBoard.fields)