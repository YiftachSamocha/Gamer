import { useEffect, useState } from "react"
import { setNewGame } from "../store/actions/sudoku.actions"
import { useDispatch, useSelector } from "react-redux"
import { SET_DIFFICULTY } from "../store/reducers/sudoku.reducer"

export function SudokuDifficulty() {
    const difficulty = useSelector(state => state.sudokuModule.difficulty)
    const [currDifficulty, setCurrDifficulty] = useState('easy')
    const dispatch = useDispatch()

    useEffect(() => {
        setCurrDifficulty(difficulty)
    }, [difficulty])

    function onSetDifficulty(difficulty) {
        dispatch({ type: SET_DIFFICULTY, difficulty })
    }

    return <section className="sudoku-diff">
        <h3>Difficulty:</h3>
        <button className={currDifficulty === 'easy' ? 'chosen' : ''}
            onClick={() => onSetDifficulty('easy')}>Easy</button>
        <button className={currDifficulty === 'medium' ? 'chosen' : ''}
            onClick={() => onSetDifficulty('medium')}>Medium</button>
        <button className={currDifficulty === 'hard' ? 'chosen' : ''}
            onClick={() => onSetDifficulty('hard')}>Hard</button>
        <button className={currDifficulty === 'expert' ? 'chosen' : ''}
            onClick={() => onSetDifficulty('expert')}>Expert</button>
    </section>
}