import { useEffect, useState } from "react";
import { SudokuActions } from "../cmps/SudokuActions";
import { SudokuHeader } from "../cmps/SudokuHeader";
import { SudokuModal } from "../cmps/SudokuModal";
import { SudokuNums } from "../cmps/SudokuNums";
import { SudokuTable } from "../cmps/SudokuTable";
import { useSelector } from "react-redux";

export function SudokuIndex() {
    const [isModalShown, setIsModalShown] = useState(false)
    const [modalType, setModalType] = useState('')
    const difficulty = useSelector(state => state.sudokuModule.difficulty)

    useEffect(() => {
        setModalType('diff-chosen')
        setIsModalShown(true)
    }, [difficulty])

    function startNewGame(){
        setModalType('new-game')
        setIsModalShown(true)
    }

    return <section className="sudoku-index">
        <div> <h1>Sudoku</h1></div>
        <SudokuHeader />
        <main>
            <SudokuTable />
            <div>
                <SudokuActions />
                <SudokuNums />
                <button className="new-game-btn" onClick={startNewGame}>New Game</button>
            </div>
        </main>

        {isModalShown && <div>
            <div className="overlay" onClick={() => setIsModalShown(false)}></div>
            <SudokuModal close={() => setIsModalShown(false)} type={modalType} />
        </div>}
    </section>
}