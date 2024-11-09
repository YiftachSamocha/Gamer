import { useDispatch, useSelector } from "react-redux"
import { updateCell } from "../store/actions/sudoku.actions"
import { useState } from "react"
import { CHANGE_NOTE_MODE } from "../store/reducers/sudoku.reducer"

export function SudokuActions() {
    const currCell = useSelector(state => state.sudokuModule.currCell)
    const table = useSelector(state => state.sudokuModule.cells)
    const isNoteMode = useSelector(state => state.sudokuModule.isNoteMode)
    const [hints, setHints] = useState(3)
    const dispatch = useDispatch()

    function setNoteMode() {
        dispatch({ type: CHANGE_NOTE_MODE, isNoteMode: !isNoteMode })
    }

    async function erase() {
        const deletedCell = { ...table[currCell.row][currCell.col] }
        deletedCell.input = ''
        await updateCell(deletedCell, currCell)
    }

    return <section className="sudoku-actions">
        <div>
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
        <div>
            <button><i className="fa-regular fa-lightbulb"></i></button>
            <button className="hints-counter">{hints}</button>
            <p>Hint</p>
        </div>
    </section>
}