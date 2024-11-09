import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

export function SudokuInfo() {
    const [seconds, setSeconds] = useState(0)
    const intervalRef = useRef(null)
    const mistakesAmount = useSelector(state => state.sudokuModule.mistakesAmount)

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1)
        }, 1000);


        return () => clearInterval(intervalRef.current)
    }, [])

    const pauseTimer = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    const resetTimer = () => {
        pauseTimer()
        setSeconds(0)
    }

    const formatTime = () => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function onToggleClock() {
        if (!intervalRef.current) {
            resetTimer()
        }
        else {
            pauseTimer()
        }

    }

    return <section className="sudoku-info">
        <p>Mistakes <span>{`${mistakesAmount}/3`}</span></p>
        <p>Score: <span>{ }</span></p>
        <p>{formatTime()}</p>
        <button onClick={onToggleClock}>
            {intervalRef.current === null ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}
        </button>

    </section>
}