import { useDispatch, useSelector } from "react-redux"
import { restartGame, setNewGame } from "../store/actions/sudoku.actions"
import boardImg from "../assets/imgs/board.jpeg"
import { SET_MISTAKES_AMOUNT } from "../store/reducers/sudoku.reducer"
import { useState } from "react"

export function SudokuModal({ close, givenType }) {
    const [type, setType] = useState(givenType)
    const difficulty = useSelector(state => state.sudokuModule.difficulty)
    const table = useSelector(table => table.sudokuModule.cells)
    const dispatch = useDispatch()

    async function restartGameChosenType() {
        await setNewGame(difficulty)
        close()
    }

    async function startGame(diff) {
        await setNewGame(diff)
        close()
    }

    async function onRestartGame() {
        await restartGame(table)
        close()
    }

    function giveSecondChance() {
        dispatch({ type: SET_MISTAKES_AMOUNT, mistakesAmount: 2 })
        close()
    }

    function closeFromX() {
        if (givenType === 'failure') {
            setType('failure')
        }
        else {
            close()
        }
    }

    return <section className="sudoku-modal">
        {type === 'diff-chosen' && <div className="diff-chosen">
            <div className="titles">
                <h2>Start new game</h2>
                <h3>Current game process will be lost</h3>
            </div>

            <div>
                <button onClick={restartGameChosenType}>OK</button>
                <button onClick={close}>Cancel</button>
            </div>
        </div>}

        {type === 'new-game' && <div className="new-game">
            <div className="titles">
                <h2>Select game mode</h2>
                <h3>Current game process will be lost</h3>
            </div>
            <div className="diffs-container">
                <div onClick={() => startGame('easy')}>
                    <img src={boardImg} />
                    <p>Easy</p>
                </div >
                <div onClick={() => startGame('medium')}>
                    <img src={boardImg} />
                    <p>Medium</p>
                </div >
                <div onClick={() => startGame('hard')}>
                    <img src={boardImg} />
                    <p>Hard</p>
                </div>
                <div onClick={() => startGame('expert')}>
                    <img src={boardImg} />
                    <p>Expert</p>
                </div>
                <div onClick={onRestartGame} >
                    <i className="fa-solid fa-rotate-left"></i>
                    <p>Restart</p>
                </div>
            </div>

        </div>}
        {type === 'failure' && <div className="failure">
            <div className="titles">
                <h2>Game over</h2>
                <h3>You have made 3 mistakes and lost this game</h3>
            </div>
            <div className="btns">
                <button onClick={giveSecondChance} >Second Chance</button>
                <button onClick={() => setType('new-game')}>New game</button>
            </div>

        </div>}
        {type === 'victory' && <div></div>}
        {type === 'new-game' && <button className="close-btn" onClick={closeFromX}>x</button>}

    </section>
}