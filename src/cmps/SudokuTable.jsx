import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { loadCells, setCurrCell, updateCell } from "../store/actions/sudoku.actions"

export function SudokuTable() {
    const table = useSelector(state => state.sudokuModule.cells)
    const isNoteMode = useSelector(state => state.sudokuModule.isNoteMode)
    const [curr, setCurr] = useState({ row: null, col: null })

    useEffect(() => {
        loadCells()
    }, [])

    async function chooseCell(loc) {
        await setCurrCell(loc)
        setCurr(loc)
    }

    async function handleKeyInput(e, loc) {
        let enteredNum = parseInt(e.key, 10)
        if (isNaN(enteredNum) || enteredNum < 1 || enteredNum > 9) return
        const newCell = { ...table[loc.row][loc.col] }
        if (isNoteMode) {
            await enterNumNote(newCell, enteredNum, loc)
        } else {
            newCell.input = enteredNum
            newCell.notes = []
            await updateCell(newCell, loc)
            await clearNotes(loc, enteredNum)
        }
    }

    async function enterNumNote(cellToUpdate, input, loc) {
        if (cellToUpdate.notes.includes(input)) {
            cellToUpdate.notes = cellToUpdate.notes.filter(note => note !== input)
        } else {
            cellToUpdate.notes.push(input)
        }
        await updateCell(cellToUpdate, loc)
    }

    function getClass(checked) {
        if (curr.row === null || curr.col === null) return ''
        if (curr.row === checked.row && curr.col === checked.col) return 'chosen'
        const checkedCell = { ...table[checked.row][checked.col] }
        const currCell = { ...table[curr.row][curr.col] }
        if (currCell.isGiven || currCell.input === currCell.num) {
            if (checkedCell.num === currCell.num && (checkedCell.isGiven || checkedCell.input === checkedCell.num)) {
                return 'same-num'
            }
        }
        if (curr.row === checked.row || curr.col === checked.col) return 'mark'

        const startBox = {
            row: Math.floor(curr.row / 3) * 3,
            col: Math.floor(curr.col / 3) * 3
        }
        if (checked.row >= startBox.row && checked.row < startBox.row + 3 && checked.col >= startBox.col && checked.col < startBox.col + 3) return 'mark'
        return ''
    }

    async function clearNotes(loc, num) {
        if (table[loc.row][loc.col].num !== num) return
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
        for (var i = startBox.row; i < startBox.row + 3; i++) {
            for (var j = startBox.col; j < startBox.col + 3; j++) {
                if (!(loc.row === i && loc.col === j) && !table[i][j].isGiven && table[i][j].notes.includes(num)) {
                    const newNotes = table[i][j].notes.filter(note => note !== num)
                    await updateCell({ ...table[i][j], notes: newNotes }, { row: i, col: j })
                }
            }
        }
    }

    return (
        <section className="sudoku-table">
            <table>
                <tbody>
                    {table.map((rowSec, row) => (
                        <tr key={row}>
                            {rowSec.map((cell, col) => (
                                <td
                                    key={col}
                                    onClick={() => chooseCell({ row, col })}
                                    onKeyDown={(e) => curr.row === row && curr.col === col && handleKeyInput(e, { row, col })}
                                    className={getClass({ row, col })}
                                    tabIndex={0}
                                >
                                    {cell.isGiven ? (
                                        <span className="given">{cell.num}</span>
                                    ) : (
                                        <div>
                                            {cell.notes.length > 0 ? (
                                                <div className="note-container">
                                                    {[...Array(9)].map((_, i) => (
                                                        <span key={i}>{cell.notes.includes(i + 1) ? i + 1 : ''}</span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span
                                                    className={`num ${cell.input !== '' && Number(cell.input) === Number(cell.num) ? '' : 'wrong'}`}
                                                >
                                                    {cell.input}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
