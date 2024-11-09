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

    function getClass(checked) {
        if (curr.row === null || curr.col === null) return ''
        if (curr.row === checked.row && curr.col === checked.col) return 'chosen'
        const checkedCell = { ...table[checked.row][checked.col] }
        const currCell = { ...table[curr.row][curr.col] }
        if (currCell.isGiven || currCell.input === currCell.num) {
            if (checkedCell.num === currCell.num) {
                if (checkedCell.isGiven || checkedCell.input === checkedCell.num) return 'same-num'
            }
        }
        // if (currCell.isGiven || currCell.input === currCell.isGiven) {
        //     if (checkedCell.isGiven || checkedCell.input === checkedCell.isGiven){
        //         if()
        //     }
        // }
        // if (checkedCell.isGiven && checkedCell.num === currCell.num) return 'same-num'
        // if (!checkedCell.isGiven && checkedCell.input === currCell.num) return 'same-num'
        if (curr.row === checked.row) return 'mark'
        if (curr.col === checked.col) return 'mark'


        const startBox = {
            row: Math.floor(curr.row / 3) * 3,
            col: Math.floor(curr.col / 3) * 3
        }
        if (checked.row >= startBox.row && checked.row < startBox.row + 3 && checked.col >= startBox.col && checked.col < startBox.col + 3) return 'mark'
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