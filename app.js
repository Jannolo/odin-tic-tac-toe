let currentPlayer
const playerFactory = (name, mark) => {
    this.name = name
    this.mark = mark
    
    const getName = () => name;
    const getMark = () => mark;

    return {getName, getMark}

}
const fieldFactory = () => {
    let occupied = false
    let mark = ''
    let button = document.createElement('button')
    
    const getOccupied= () => {
        return occupied;
    }
    const getMark = () => {
        return mark;
    }
    const setOccupied = () => {
        occupied = true;
    }
    const setMark = (marker) => {
        mark = marker;
        button.textContent = mark;
    }

    button.textContent = mark
    button.id = 'field-button'
    button.addEventListener('click', () => {
        setMark(currentPlayer.getMark());
    })

    return {getOccupied, getMark, setOccupied, setMark, button}
}

//create empty gameboard + winner function to determine if winner constellation is given
const gameBoard = (() => {
    const rowOne = [fieldFactory(), fieldFactory(), fieldFactory()]
    const rowTwo = [fieldFactory(), fieldFactory(), fieldFactory()]
    const rowThree = [fieldFactory(), fieldFactory(), fieldFactory()]

    const winner = () => {
        if(rowOne[0].getMark() != '' && rowOne[0].getMark() == rowOne[1].getMark() && rowOne[0].getMark() == rowOne[2].getMark()) {
            console.log('A')
            return true
        } else if(rowTwo[0].getMark() != '' && rowTwo[0].getMark() == rowTwo[1].getMark() && rowTwo[0].getMark() == rowTwo[2].getMark()) {
            console.log('B')
            return true
        } else if (rowThree[0].getMark() != '' && rowThree[0].getMark() == rowThree[1].getMark() && rowThree[0].getMark() == rowThree[2].getMark()) {
            console.log('C')
            return true
        } else if (rowOne[0].getMark() != '' && rowOne[0].getMark() == rowTwo[0].getMark() && rowOne[0].getMark() == rowThree[0].getMark()) {
            console.log('D')
            return true
        } else if (rowOne[1].getMark() != '' && rowOne[1].getMark() == rowTwo[1].getMark() && rowOne[1].getMark() == rowThree[1].getMark()) {
            console.log('E')
            return true
        } else if (rowOne[2].getMark() != '' && rowOne[2].getMark() == rowTwo[2].getMark() && rowOne[2].getMark() == rowThree[2].getMark()) {
            console.log('F')
            return true
        } else if (rowOne[0].getMark() != '' && rowOne[0].getMark() == rowTwo[1].getMark() && rowOne[0].getMark() == rowThree[2].getMark()) {
            console.log('G')
            return true
        } else if (rowOne[2].getMark() != '' && rowOne[2].getMark() == rowTwo[1].getMark() && rowOne[2].getMark() == rowThree[0].getMark()) {return true}
        else {
            return false
        }
    }


    return{rowOne,rowTwo,rowThree, winner}
})();


//renders gameboard
const renderGB = () => {
    const gameSpace = document.querySelector('#gameSpace')

    const rowOneDiv = document.createElement('div')
    rowOneDiv.id = 'row'
    gameBoard.rowOne.forEach(field => {
        const fieldDiv = document.createElement('div')
        fieldDiv.id = 'field'
        fieldDiv.appendChild(field.button)
        rowOneDiv.appendChild(fieldDiv)
    });

    const rowTwoDiv = document.createElement('div')
    rowTwoDiv.id = 'row'
    gameBoard.rowTwo.forEach(field => {
        const fieldDiv = document.createElement('div')
        fieldDiv.id = 'field'
        fieldDiv.appendChild(field.button)
        rowTwoDiv.appendChild(fieldDiv)
    });

    const rowThreeDiv = document.createElement('div')
    rowThreeDiv.id = 'row'
    gameBoard.rowThree.forEach(field => {
        const fieldDiv = document.createElement('div')
        fieldDiv.id = 'field'
        fieldDiv.appendChild(field.button)
        rowThreeDiv.appendChild(fieldDiv)
    });

    gameSpace.append(rowOneDiv, rowTwoDiv, rowThreeDiv)
}
gameBoard.rowOne[0].setMark('X')
gameBoard.rowOne[1].setMark('X')
gameBoard.rowOne[2].setMark('O')

//initiating game + filling out player names
const initiateGame = (() => {
    let playerOne
    let playerTwo
    const newGameBtn = document.querySelector('#newGame')
    const playerDialog = document.querySelector('#playerDialog')

    newGameBtn.addEventListener('click', () => {
        playerDialog.showModal();
    })

    const startGameBtn = document.querySelector('#startGame')
    startGameBtn.addEventListener ('click', (e) => {
        e.preventDefault()
        console.log('yes')
        playerOne = playerFactory(document.querySelector('#playerOne').value, 'X')
        playerTwo = playerFactory(document.querySelector('#playerTwo').value, 'O')
        playerDialog.close()
    })
    

    currentPlayer = playerOne;
    renderGB()

})();

