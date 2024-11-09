import { store } from '../store'
import { sudokuService } from '../../services/Sudoku/sudoku.service'
import { SET_NEW_GAME, SET_CELL, SET_CELLS, UPDATE_CELL } from '../reducers/sudoku.reducer'

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

export async function setNewGame(diff) {
    try {
        const newTable = await sudokuService.createNewGame(diff)
        store.dispatch(getCmdNewGame(newTable))
    } catch (err) {
        console.log('Cannot change difficulty', err)
        throw err
    }

}

export async function updateCell(updatedCell, loc) {
    try {
        const newTable = await sudokuService.update(updatedCell, loc)
        store.dispatch(getCmdUpdateCell(newTable, loc))
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

function getCmdNewGame(cells) {
    return {
        type: SET_NEW_GAME,
        cells,
    }
}



