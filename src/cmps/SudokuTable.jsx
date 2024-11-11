import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { loadCells, onClearNotes, setCurrCell, updateCell } from "../store/actions/sudoku.actions"
import { SET_IS_VICTORY, SET_MISTAKES_AMOUNT } from "../store/reducers/sudoku.reducer"
import { sudokuService } from "../services/Sudoku/sudoku.service"

export function SudokuTable() {
    const table = useSelector(state => state.sudokuModule.cells)
    const isNoteMode = useSelector(state => state.sudokuModule.isNoteMode)
    const curr = useSelector(state => state.sudokuModule.currCell)
    const hint = useSelector(state => state.sudokuModule.hint)
    const mistakesAmount = useSelector(state => state.sudokuModule.mistakesAmount)
    const dispatch = useDispatch()

    useEffect(() => {
        loadCells()
    }, [hint])

    async function chooseCell(loc) {
        await setCurrCell(loc)
    }

    async function handleKeyInput(e, loc) {
        let enteredNum = parseInt(e.key, 10)
        if (isNaN(enteredNum) || enteredNum < 1 || enteredNum > 9) return
        if (table[loc.row][loc.col].isGiven) return
        const newCell = { ...table[loc.row][loc.col] }
        const prev = { ...table[loc.row][loc.col] }
        prev.row = loc.row
        prev.col = loc.col
        if (isNoteMode) {
            await enterNumNote(newCell, enteredNum, loc)
        } else {
            newCell.input = enteredNum
            newCell.notes = []
            await updateCell(newCell, loc, prev)
            if (newCell.input !== newCell.num) {
                dispatch({ type: SET_MISTAKES_AMOUNT, mistakesAmount: mistakesAmount + 1 })
            } else {
                table[loc.row][loc.col].input = enteredNum
                await onClearNotes(table, loc, enteredNum)
            }

        }
        const isVictory = sudokuService.checkVictory(table)
        if (isVictory) {
            dispatch({ type: SET_IS_VICTORY, isVictory })
        }
    }

    async function enterNumNote(cellToUpdate, input, loc) {
        const prevCopy = JSON.parse(JSON.stringify(cellToUpdate))
        prevCopy.row = loc.row
        prevCopy.col = loc.col
        if (cellToUpdate.notes.includes(input)) {
            cellToUpdate.notes = cellToUpdate.notes.filter(note => note !== input)
        } else {
            cellToUpdate.notes.push(input)
        }
        await updateCell(cellToUpdate, loc, prevCopy)
    }

    function getClass(checked) {
        if ((hint.row && hint.col) && checked.row === hint.row && checked.col === hint.col) return 'hint'
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
