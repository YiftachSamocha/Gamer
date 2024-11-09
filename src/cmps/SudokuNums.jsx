import { useSelector } from "react-redux"
import { updateCell } from "../store/actions/sudoku.actions"

export function SudokuNums() {
    const table = useSelector(state => state.sudokuModule.cells)
    const loc = useSelector(state => state.sudokuModule.currCell)
    const isNoteMode = useSelector(state => state.sudokuModule.isNoteMode)

    async function setNum(num) {
        if (loc.row === null || loc.col === null) return
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
        await clearNotes(loc, num)
    }

    async function clearNotes(loc, num) {
        for (var i = 0; i < 9; i++) {
            if (loc.col !== i && !table[loc.row][i].isGiven && table[loc.row][i].notes.includes(num)) {
                const newNotes = table[loc.row][i].notes.filter(note => note !== num)
                await updateCell({ ...table[loc.row][loc.col], notes: newNotes }, { row: loc.row, col: i })
            }
        }
        for (var i = 0; i < 9; i++) {
            if (loc.row !== i && !table[i][loc.col].isGiven && table[i][loc.col].notes.includes(num)) {
                const newNotes = table[i][loc.col].notes.filter(note => note !== num)
                await updateCell({ ...table[loc.row][loc.col], notes: newNotes }, { row: i, col: loc.col })
            }
        }
        const startBox = { row: Math.floor(curr.row / 3) * 3, col: Math.floor(curr.col / 3) * 3 }
        for (var i = startBox.row; i < startBox + 3; i++) {
            for (var j = startBox.col; j < startBox.col + 3; j++) {
                if (!(loc.row === i && loc.col === j) && !table[i][j].isGiven && table[i][j].notes.includes(num)) {
                    const newNotes = table[i][j].notes.filter(note => note !== num)
                    await updateCell({ ...table[i][j], notes: newNotes }, { row: i, col: j })
                }
            }
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