export const SET_CELLS = 'SET_CELLS'
export const SET_CELL = 'SET_CELL'
export const UPDATE_CELL = 'UPDATE_CELL'
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY'


const initialState = {
    cells: [],
    currSell: { row: null, col: null },
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

        case CHANGE_DIFFICULTY:
            cells = action.cells
            newState = { ...state, cells }
            break

        default:
    }
    return newState
}



