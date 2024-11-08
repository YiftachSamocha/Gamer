import { loadFromStorage, saveToStorage } from "../util.service.js";
import { createSolvedSudoku } from "./sudoku.creation.js";
const STORAGE_KEY = 'sudoku'
const LEVEL_EASY = 42
const LEVEL_MEDIUM = 45
const LEVEL_HARD = 51
const LEVEL_EXPERT = 56



export const sudokuService = { query, update, changeDiff }

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

function changeDiff(diff) {
    const newTable = createSudoku(diff)
    return newTable
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


