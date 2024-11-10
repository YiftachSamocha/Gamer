import timeImg from '../assets/imgs/time.png';
import difficultyImg from '../assets/imgs/difficulty.png';
import scoreImg from '../assets/imgs/score.png';

export function SudokuVictory({ score, difficulty, time, startGame }) {
    return <section className='sudoku-victory'>
        <h1>Excellent!</h1>
        <div >
            <div className="content">
                <div className='item'>
                    <img src={scoreImg} />
                    <div>
                        <p>Score</p>
                        <p>{score}</p>
                    </div>

                </div>
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