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
    const mistakesAmount = useSelector(state => state.sudokuModule.mistakesAmount)

    useEffect(() => {
        if (mistakesAmount > 2) {
            setModalType('failure')
            setIsModalShown(true)
        }

    }, [mistakesAmount])

    useEffect(() => {
        if (modalType !== '') {
            setModalType('diff-chosen')
            setIsModalShown(true)
        }

    }, [difficulty])



    function startNewGame() {
        setModalType('new-game')
        setIsModalShown(true)
    }

    function outsideClick() {
        if (modalType === 'failure') return
        setIsModalShown(false)
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
            <div className="overlay" onClick={outsideClick}></div>
            <SudokuModal close={() => setIsModalShown(false)} givenType={modalType} />
        </div>}
    </section>
}