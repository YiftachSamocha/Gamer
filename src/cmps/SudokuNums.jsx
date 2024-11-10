import { useDispatch, useSelector } from "react-redux"
import { onClearNotes, updateCell } from "../store/actions/sudoku.actions"
import { SET_MISTAKES_AMOUNT } from "../store/reducers/sudoku.reducer"

export function SudokuNums() {
    const table = useSelector(state => state.sudokuModule.cells)
    const loc = useSelector(state => state.sudokuModule.currCell)
    const isNoteMode = useSelector(state => state.sudokuModule.isNoteMode)
    const dispatch = useDispatch()
    const mistakesAmount = useSelector(state => state.sudokuModule.mistakesAmount)

    async function setNum(num) {
        if (loc.row === null || loc.col === null) return
        if (table[loc.row][loc.col].isGiven) return
        const currCell = { ...table[loc.row][loc.col] }
        if (isNoteMode) {
            if (currCell.notes.includes(num)) {
                currCell.notes = currCell.notes.filter(note => note !== num)
            } else {
                currCell.notes.push(num)
            }
            currCell.input = ''
            await updateCell(currCell, loc)
            return
        }

        currCell.input = Number(num)
        currCell.notes = []
        await updateCell(currCell, loc)
        if (currCell.input !== currCell.num) {
            dispatch({ type: SET_MISTAKES_AMOUNT, mistakesAmount: mistakesAmount + 1 })
        } else {
            table[loc.row][loc.col].input = num
            await onClearNotes(table, loc, num)
        }
    }

    return <section className="sudoku-nums">
        <button onClick={() => setNum(1)}>1</button>
        <button onClick={() => setNum(2)}>2</button>
        <button onClick={() => setNum(3)}>3</button>
        <button onClick={() => setNum(4)}>4</button>
        <button onClick={() => setNum(5)}>5</button>
        <button onClick={() => setNum(6)}>6</button>
        <button onClick={() => setNum(7)}>7</button>
        <button onClick={() => setNum(8)}>8</button>
        <button onClick={() => setNum(9)}>9</button>
    </section>
}