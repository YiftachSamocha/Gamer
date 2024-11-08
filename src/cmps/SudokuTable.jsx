import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { loadCells, setCurrCell, updateCell } from "../store/actions/sudoku.actions"



export function SudokuTable() {
    const table = useSelector(state => state.sudokuModule.cells)
    const [curr, setCurr] = useState({ row: null, col: null })

    useEffect(() => {
        loadCells()
    }, [])

    async function chooseCell(loc) {
        await setCurrCell(loc)
        setCurr(loc)
    }

    async function enterNum({ target }) {
        const { value, name } = target
        let enteredNum = Number(value)
        if (isNaN(enteredNum)) return
        if (enteredNum === 0) return
        if (enteredNum > 9) {
            enteredNum = enteredNum % 10
        }
        const row = parseInt(name[0])
        const col = parseInt(name[2])

        const newCell = { ...table[row][col] }
        newCell.input = enteredNum
        newCell.notes = []
        await updateCell(newCell, { row, col })
    }

    function getClass(loc) {
        if (curr.row === null || curr.col === null) return ''
        if (curr.row === loc.row && curr.col === loc.col) return 'chosen'
        if (curr.row === loc.row) return 'mark'
        if (curr.col === loc.col) return 'mark'
        const startBox = {
            row: Math.floor(curr.row / 3) * 3,
            col: Math.floor(curr.col / 3) * 3
        }
        if (loc.row >= startBox.row && loc.row < startBox.row + 3 && loc.col >= startBox.col && loc.col < startBox.col + 3) return 'mark'
        return ''

    }

    return <section className="sudoku-table">
        <table>
            <tbody>
                {table.map((rowSec, row) => {
                    return <tr >
                        {rowSec.map((cell, col) => {
                            return <td onClick={() => chooseCell({ row, col })}
                                className={getClass({ row, col })}>
                                {cell.isGiven ?
                                    <span className="given">{cell.num}</span> :
                                    <input name={row + '-' + col}
                                        className={(cell.input !== '' && Number(cell.input) === Number(cell.num)) ? '' : 'wrong'}
                                        onInput={enterNum} value={cell.input}></input>}

                            </td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>




    </section>

}