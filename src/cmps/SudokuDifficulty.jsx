import { changeDifficulty } from "../store/actions/Sudoku.actions"
import { useState } from "react"

export function SudokuDifficulty() {
    const [difficulty, setDifficulty] = useState('easy')

    async function onSetDifficulty(diff) {
        await changeDifficulty(diff)
        setDifficulty(diff)
    }

    return <section className="sudoku-diff">
        <h3>Difficulty:</h3>
        <button className={difficulty === 'easy' ? 'chosen' : ''}
            onClick={() => onSetDifficulty('easy')}>Easy</button>
        <button className={difficulty === 'medium' ? 'chosen' : ''}
            onClick={() => onSetDifficulty('medium')}>Medium</button>
        <button className={difficulty === 'hard' ? 'chosen' : ''}
            onClick={() => onSetDifficulty('hard')}>Hard</button>
        <button className={difficulty === 'expert' ? 'chosen' : ''}
            onClick={() => onSetDifficulty('expert')}>Expert</button>
    </section>
}