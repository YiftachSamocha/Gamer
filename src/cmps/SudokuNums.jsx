import { useSelector } from "react-redux"
import { updateCell } from "../store/actions/sudoku.actions"

export function SudokuNums() {
    const table = useSelector(state => state.sudokuModule.cells)
    const loc = useSelector(state => state.sudokuModule.currCell)

    async function setNum(num) {
        if (loc.row === null || loc.col === null) return
        const currCell = { ...table[loc.row][loc.col] }
        currCell.input = Number(num)
        await updateCell(currCell, loc)
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