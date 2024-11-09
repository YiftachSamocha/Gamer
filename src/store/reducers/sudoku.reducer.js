export const SET_CELLS = 'SET_CELLS'
export const SET_CELL = 'SET_CELL'
export const UPDATE_CELL = 'UPDATE_CELL'
export const SET_NEW_GAME = 'SET_NEW_GAME'
export const CHANGE_NOTE_MODE = 'CHANGE_NOTE_MODE'
export const SET_HINT = 'SET_HINT'
export const SET_DIFFICULTY = 'SET_DIFFICULTY'
export const SET_MISTAKES_AMOUNT = 'SET_MISTAKES_AMOUNT'


const initialState = {
    cells: [],
    currSell: { row: null, col: null },
    isNoteMode: false,
    hint: { row: null, col: null },
    difficulty: 'easy',
    mistakesAmount: 0,
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
            newState = { ...state, cells: action.cells, difficulty: action.difficulty }
            break

        case CHANGE_NOTE_MODE:
            newState = { ...state, isNoteMode: action.isNoteMode }
            break

        case SET_HINT:
            newState = { ...state, hint: action.hint }
            break

        case SET_DIFFICULTY:
            newState = { ...state, difficulty: action.difficulty }
            break

        case SET_MISTAKES_AMOUNT:
            newState = { ...state, mistakesAmount: action.mistakesAmount }
            break

        default:
    }
    return newState
}



