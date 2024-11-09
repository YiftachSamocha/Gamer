export const SET_CELLS = 'SET_CELLS'
export const SET_CELL = 'SET_CELL'
export const UPDATE_CELL = 'UPDATE_CELL'
export const SET_NEW_GAME = 'SET_NEW_GAME'
export const CHANGE_NOTE_MODE = 'CHANGE_NOTE_MODE'
export const SET_HINT = 'SET_HINT'


const initialState = {
    cells: [],
    currSell: { row: null, col: null },
    isNoteMode: false,
    hint: { row: null, col: null },
}

export function sudokuReducer(state = initialState, action) {
    var newState = state
    var cells
    switch (action.type) {
        case SET_CELLS:
            newState = { ...state, cells: action.cells }
            break
        case SET_CELL:
            newState = { ...state, currCell: action.currCell }
            break
        case UPDATE_CELL:
            cells = action.cells
            const currCell = action.currCell
            newState = { ...state, cells, currCell }
            break

        case SET_NEW_GAME:
            cells = action.cells
            newState = { ...state, cells }
            break

        case CHANGE_NOTE_MODE:
            newState = { ...state, isNoteMode: action.isNoteMode }
            break

        case SET_HINT:
            newState = { ...state, hint: action.hint }
            break

        default:
    }
    return newState
}



