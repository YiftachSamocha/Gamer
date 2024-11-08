import { SudokuDifficulty } from "./SudokuDifficulty";
import { SudokuInfo } from "./SudokuInfo";

export function SudokuHeader() {
    return <section className="sudoku-header">
        <SudokuDifficulty />
        <SudokuInfo />

    </section>
}