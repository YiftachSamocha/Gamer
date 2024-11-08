import { store } from '../store'
import { sudokuService } from '../../services/Sudoku/sudoku.service'
import { SET_CELL, SET_CELLS, UPDATE_CELL } from '../reducers/sudoku.reducer'

export async function loadCells(level) {
    try {
        const cells = await sudokuService.query(level)
        store.dispatch(getCmdSetCells(cells))
    } catch (err) {
        console.log('Cannot load cells', err)
        throw err
    }
}

export async function loadCell(currCell) {
    try {
        store.dispatch(getCmdSetCell(currCell))
    } catch (err) {
        console.log('Cannot load cell', err)
        throw err
    }
}

export async function updateCell(updatedCell) {
    try {
        const newTable = await sudokuService.update(updatedCell, loc)
        store.dispatch(getCmdUpdateCell(newTable, updatedCell))
    } catch (err) {
        console.log('Cannot save cell', err)
        throw err
    }
}



// Command Creators:
function getCmdSetCells(cells) {
    return {
        type: SET_CELLS,
        cells
    }
}
function getCmdSetCell(currCell) {
    return {
        type: SET_CELL,
        currCell
    }
}

function getCmdUpdateCell(cells, currCell) {
    return {
        type: UPDATE_CELL,
        cells,
        currCell
    }
}



