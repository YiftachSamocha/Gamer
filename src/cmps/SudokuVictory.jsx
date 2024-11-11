import timeImg from '../assets/imgs/time.png';
import difficultyImg from '../assets/imgs/difficulty.png';
import { useSelector } from 'react-redux';


export function SudokuVictory({ startGame }) {
    const time = useSelector(state => state.sudokuModule.time)
    const difficulty = useSelector(state => state.sudokuModule.difficulty)

    return <section className='sudoku-victory'>
        <h1>Excellent!</h1>
        <div >
            <div className="content">
                <div className='item'>
                    <img src={difficultyImg} />
                    <div>
                        <p>Difficulty</p>
                        <p>{difficulty}</p>
                    </div>

                </div>
                <div className='item'>
                    <img src={timeImg} />
                    <div>
                        <p>Time</p>
                        <p>{time}</p>
                    </div>

                </div>
            </div>
            <button onClick={startGame}>New Game</button>
        </div>
    </section>
}