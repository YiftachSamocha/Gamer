const allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function createSolvedSudoku() {
    const table = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    if (fillTable(table, 0, 0)) {
        return table
    } else {
        return "Failed to generate Sudoku"
    }
}

function fillTable(table, row, col) {
    if (row === 9) return true
    if (col === 9) return fillTable(table, row + 1, 0)
    const nums = [...allNums]

    while (nums.length > 0) {
        const randomIndex = Math.floor(Math.random() * nums.length)
        const num = nums.splice(randomIndex, 1)[0]
        if (isValid(table, { row, col }, num)) {
            table[row][col] = num
            if (fillTable(table, row, col + 1)) {
                return true
            }
            table[row][col] = 0
        }
    }
    return false
}

function isInRow(table, row, num) {
    for (var i = 0; i < 9; i++) {
        if (table[row][i] === num) return true
    }
    return false
}

function isInCol(table, col, num) {
    for (var i = 0; i < 9; i++) {
        if (table[i][col] === num) return true
    }
    return false
}


function isInBox(table, loc, num) {
    const startRow = getStartPoint(loc.row)
    const startCol = getStartPoint(loc.col)

    for (var i = startRow; i < startRow + 3; i++) {
        for (var j = startCol; j < startCol + 3; j++) {
            if (table[i][j] === num) return true
        }
    }
    return false
}

function isValid(table, loc, num) {
    return !isInBox(table, loc, num)
        && !isInCol(table, loc.col, num)
        && !isInRow(table, loc.row, num)
}

function getStartPoint(idx) {
    return Math.floor(idx / 3) * 3
}



