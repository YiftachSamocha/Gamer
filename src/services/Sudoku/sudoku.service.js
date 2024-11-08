const allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var table = [
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
export function createSudoku() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            const loc = { row: i, col: j }
            table[i][j] = getNum(table, loc)
        }
    }
    return table
}

function getNum(table, loc) {
    var isPossible = false
    const nums = [...allNums]
    var num = 0
    while (!isPossible) {
        if (nums.length === 0) return -1
        const randomIndex = Math.floor(Math.random() * nums.length)
        num = nums.splice(randomIndex, 1)[0]
        const box = isInBox(table, loc, num)
        if (!box) {
            const row = isInRow(table, loc.row, num)
            if (!row) {
                const col = isInCol(table, loc.col, num)
                if (!col) {
                    isPossible = true
                }
            }
        }
    }
    return num

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
    const start = {
        row: getStartPoint(loc.row),
        col: getStartPoint(loc.col)
    }

    for (var i = start.row; i < 3; i++) {
        for (var j = start.col; j < 3; j++) {
            if (table[i][j] === num) return true
        }
    }
    return false
}

function getStartPoint(idx) {
    var start
    switch (idx) {
        case 0:
        case 1:
        case 2:
            start = 0
            break
        case 3:
        case 4:
        case 5:
            start = 3
            break
        case 6:
        case 7:
        case 8:
            start = 6
            break

    }
    return start
}

