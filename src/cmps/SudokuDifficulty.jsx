import { useState } from "react"
import { setNewGame } from "../store/actions/sudoku.actions"

export function SudokuDifficulty() {
    const [difficulty, setDifficulty] = useState('easy')

    async function onSetDifficulty(diff) {
        await setNewGame(diff)
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