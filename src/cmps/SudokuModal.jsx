import { useSelector } from "react-redux"
import { restartGame, setNewGame } from "../store/actions/sudoku.actions"
import boardImg from "../assets/imgs/board.jpeg"

export function SudokuModal({ close, type }) {
    const difficulty = useSelector(state => state.sudokuModule.difficulty)
    const table= useSelector(table=> table.sudokuModule.cells)

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
                <div onClick={() => startGame('easy')}>
                    <img src={boardImg} />
                    <p>Medium</p>
                </div >
                <div onClick={() => startGame('easy')}>
                    <img src={boardImg} />
                    <p>Hard</p>
                </div>
                <div onClick={() => startGame('easy')}>
                    <img src={boardImg} />
                    <p>Expert</p>
                </div>
                <div onClick={onRestartGame} >
                    <i className="fa-solid fa-rotate-left"></i>
                    <p>Restart</p>
                </div>
            </div>

        </div>}
        {type === 'failure' && <div>

        </div>}
        {type === 'victory' && <div></div>}
        {type === 'new-game' && <button className="close-btn" onClick={close}>x</button>}

    </section>
}