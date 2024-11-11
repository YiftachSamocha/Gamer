import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_DIFFICULTY } from "../store/reducers/sudoku.reducer"

export function SudokuDifficulty() {
    const difficulty = useSelector(state => state.sudokuModule.difficulty)
    const [currDifficulty, setCurrDifficulty] = useState('easy')
    const [isNarrow, setIsNarrow] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        function handleResize() {
            setIsNarrow(window.innerWidth < 920)
        }

        window.addEventListener("resize", handleResize)


        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        setCurrDifficulty(difficulty)
        if (isModalOpen) setIsModalOpen(false)
    }, [difficulty])

    function onSetDifficulty(difficulty) {
        dispatch({ type: SET_DIFFICULTY, difficulty })
    }

    function openModal() {
        if (isNarrow) setIsModalOpen(prev => !prev)
    }



    return <section className="sudoku-diff">
        <h3 onClick={openModal}>Difficulty<span>{!isNarrow ? ':' : ' ˅'}</span></h3>
        {(!isNarrow || (isNarrow && isModalOpen)) && <div>
            <button className={currDifficulty === 'easy' ? 'chosen' : ''}
                onClick={() => onSetDifficulty('easy')}>Easy</button>
            <button className={currDifficulty === 'medium' ? 'chosen' : ''}
                onClick={() => onSetDifficulty('medium')}>Medium</button>
            <button className={currDifficulty === 'hard' ? 'chosen' : ''}
                onClick={() => onSetDifficulty('hard')}>Hard</button>
            <button className={currDifficulty === 'expert' ? 'chosen' : ''}
                onClick={() => onSetDifficulty('expert')}>Expert</button>
        </div>}
        {isNarrow && <p>{currDifficulty}</p>}
    </section>
}