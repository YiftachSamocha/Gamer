import { store } from '../store'
import { sudokuService } from '../../services/Sudoku/sudoku.service'
import { CHANGE_DIFFICULTY, SET_CELL, SET_CELLS, UPDATE_CELL } from '../reducers/sudoku.reducer'

export async function loadCells() {
    try {
        const cells = await sudokuService.query()
        store.dispatch(getCmdSetCells(cells))
    } catch (err) {
        console.log('Cannot load cells', err)
        throw err
    }
}

export async function setCurrCell(loc) {
    try {
        store.dispatch(getCmdSetCell(loc))
    } catch (err) {
        console.log('Cannot set cell', err)
        throw err
    }
}

export async function changeDifficulty(diff) {
    try {
        const newTable = await sudokuService.changeDiff(diff)
        store.dispatch(getCmdChangeDiff(newTable))
    } catch (err) {
        console.log('Cannot change difficulty', err)
        throw err
    }

}

export async function updateCell(updatedCell, loc) {
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

function getCmdChangeDiff(cells) {
    return {
        type: CHANGE_DIFFICULTY,
        cells,
    }
}



