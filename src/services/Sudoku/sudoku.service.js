import { loadFromStorage, saveToStorage } from "../util.service.js";
import { createSolvedSudoku } from "./sudoku.creation.js";
const STORAGE_KEY = 'sudoku'
const LEVEL_EASY = 42
const LEVEL_MEDIUM = 45
const LEVEL_HARD = 51
const LEVEL_EXPERT = 56



export const sudokuService = { query, update, createNewGame, restart, clearNotes }

function query() {
    const table = loadFromStorage(STORAGE_KEY)
    if (!table || table.length === 0) {
        const newTable = createSudoku('easy')
        return newTable
    }
    return table
}

function update(cell, loc) {
    const table = loadFromStorage(STORAGE_KEY)
    table[loc.row][loc.col] = cell
    saveToStorage(STORAGE_KEY, table)
    return table
}

function createNewGame(diff) {
    const newTable = createSudoku(diff)
    return newTable
}

function restart(table) {
    const tableToUpdate = [...table]
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (!tableToUpdate[i][j].isGiven) {
                tableToUpdate[i][j].input = ''
                tableToUpdate[i][j].notes = []
            }
        }
    }
    saveToStorage(STORAGE_KEY, tableToUpdate)
    return tableToUpdate
}
function clearNotes(tableToUpdate, loc, num) {
    const table = [...tableToUpdate]
    if (table[loc.row][loc.col].num !== num) return
    for (var i = 0; i < 9; i++) {
        if (loc.col !== i && !table[loc.row][i].isGiven && table[loc.row][i].notes.includes(num)) {
            const newNotes = table[loc.row][i].notes.filter(note => note !== num)
            table[loc.row][loc.col].notes = newNotes
        }
    }
    for (var i = 0; i < 9; i++) {
        if (loc.row !== i && !table[i][loc.col].isGiven && table[i][loc.col].notes.includes(num)) {
            const newNotes = table[i][loc.col].notes.filter(note => note !== num)
            table[loc.row][loc.col].notes = newNotes
        }
    }
    const startBox = { row: Math.floor(loc.row / 3) * 3, col: Math.floor(loc.col / 3) * 3 }
    for (var i = startBox.row; i < startBox.row + 3; i++) {
        for (var j = startBox.col; j < startBox.col + 3; j++) {
            if (!(loc.row === i && loc.col === j) && !table[i][j].isGiven && table[i][j].notes.includes(num)) {
                const newNotes = table[i][j].notes.filter(note => note !== num)
                table[i][j].notes = newNotes
            }
        }
    }
    saveToStorage(STORAGE_KEY, table)
    return table
}


function createSudoku(level) {
    const table = createSolvedSudoku()
    const totalEmptyCells = Number(getEmptyTotal(level))
    const newTable = table.map(row => {
        return row.map(num => {
            return { num, isGiven: true }
        })
    })
    let emptyCellsCount = 0
    while (emptyCellsCount < totalEmptyCells) {
        const randomRow = Math.floor(Math.random() * 9)
        const randomCol = Math.floor(Math.random() * 9)


        if (newTable[randomRow][randomCol].isGiven) {
            newTable[randomRow][randomCol].isGiven = false
            newTable[randomRow][randomCol].input = ''
            newTable[randomRow][randomCol].notes = []

            emptyCellsCount++;
        }
    }
    saveToStorage(STORAGE_KEY, newTable)
    return newTable
}

function getEmptyTotal(level) {
    var total
    switch (level) {
        case 'easy':
            total = LEVEL_EASY
            break
        case 'medium':
            total = LEVEL_MEDIUM
            break
        case 'hard':
            total = LEVEL_HARD
            break
        case 'expert':
            total = LEVEL_EXPERT
            break

    }
    return total
}


