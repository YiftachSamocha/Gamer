import { createSudoku } from "../services/Sudoku/sudoku.service"

export function SudokuTable() {
    const table = createSudoku()
    console.log(table)
    return <section>


    </section>

}