import { useSelector } from "react-redux"
import { useEffect } from "react"
import { loadCells } from "../store/actions/Sudoku.actions"


export function SudokuTable() {
    const table= useSelector(state=> state.sudokuModule.cells)
    useEffect(()=>{
        loadCells('hard')

    },[])

    return <section className="sudoku-table">
        <table>
            {table.map(row => {
                return <tr>
                    {row.map(cell => {
                        return <td>
                            {cell.isGiven ?
                                <span className="given">{cell.num}</span> :
                                <input></input>}


                        </td>
                    })}
                </tr>
            })}
        </table>




    </section>

}