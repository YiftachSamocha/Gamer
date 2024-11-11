import { useDispatch, useSelector } from "react-redux"
import { undo, updateCell } from "../store/actions/sudoku.actions"
import { useState } from "react"
import { CHANGE_NOTE_MODE, SET_HINT } from "../store/reducers/sudoku.reducer"
import { getRandomIntInclusive } from "../services/util.service"

export function SudokuActions() {
    const currCell = useSelector(state => state.sudokuModule.currCell)
    const table = useSelector(state => state.sudokuModule.cells)
    const isNoteMode = useSelector(state => state.sudokuModule.isNoteMode)
    const [hintsNum, setHintsNum] = useState(3)
    const dispatch = useDispatch()
    const history = useSelector(state => state.sudokuModule.history)

    function setNoteMode() {
        dispatch({ type: CHANGE_NOTE_MODE, isNoteMode: !isNoteMode })
    }

    async function erase() {
        const deletedCell = { ...table[currCell.row][currCell.col] }
        const prev = { ...table[currCell.row][currCell.col] }
        prev.row = currCell.row
        prev.col = currCell.col
        deletedCell.input = ''
        deletedCell.notes = []
        await updateCell(deletedCell, currCell, prev)
    }

    async function setHint() {
        if (hintsNum < 1) return
        var isValid = false
        while (!isValid) {
            const row = getRandomIntInclusive(0, 8)
            const col = getRandomIntInclusive(0, 8)
            if (!table[row][col].isGiven && table[row][col].input === '') {
                const cellToUpdate = { ...table[row][col], isGiven: true }
                delete cellToUpdate.notes
                delete cellToUpdate.input
                await updateCell(cellToUpdate, { row, col }, 'hint')
                dispatch({ type: SET_HINT, hint: { row, col } })
                setTimeout(() => {
                    dispatch({ type: SET_HINT, hint: { row: null, col: null } })
                }, 5000)
                isValid = true
                setHintsNum(hintsNum - 1)
            }
        }
    }

    async function onUndo() {
        if (history.length <= 0) return
        const lastCell = history[history.length - 1]
        const lastCellLoc = { row: lastCell.row, col: lastCell.col }
        await undo(lastCell, lastCellLoc)
    }

    return <section className="sudoku-actions">
        <div onClick={onUndo}>
            <button><i className="fa-solid fa-rotate-left"></i></button>
            <p>Undo</p>
        </div>
        <div onClick={erase}>
            <button><i className="fa-solid fa-eraser"></i></button>
            <p>Erase</p>
        </div>
        <div onClick={setNoteMode}>
            <button><i className="fa-solid fa-pencil"></i></button>
            <button className={isNoteMode ? 'note-mode on' : 'note-mode off'}>{isNoteMode ? 'On' : 'Off'}</button>
            <p>Notes</p>
        </div>
        <div onClick={setHint}>
            <button><i className="fa-regular fa-lightbulb"></i></button>
            <button className="hints-counter">{hintsNum}</button>
            <p>Hint</p>
        </div>
    </section>
}