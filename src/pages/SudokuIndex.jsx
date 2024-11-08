import { SudokuActions } from "../cmps/SudokuActions";
import { SudokuHeader } from "../cmps/SudokuHeader";
import { SudokuNums } from "../cmps/SudokuNums";
import { SudokuTable } from "../cmps/SudokuTable";

export function SudokuIndex() {
    return <section  className="sudoku-index">
       
        <div> <h1>Sudoku</h1></div>
        <SudokuHeader />
        <main>
            <SudokuTable />
            <div>
                <SudokuActions />
                <SudokuNums />
                <button className="new-game-btn">New Game</button>

            </div>
        </main>



    </section>
}