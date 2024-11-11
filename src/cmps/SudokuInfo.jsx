import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_IS_VICTORY, SET_TIME } from "../store/reducers/sudoku.reducer"

export function SudokuInfo() {
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(true)
    const intervalRef = useRef(null)
    const mistakesAmount = useSelector(state => state.sudokuModule.mistakesAmount)
    const time = useSelector(state => state.sudokuModule.time)
    const dispatch = useDispatch()


    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1)
            dispatch({ type: SET_TIME, time: formatTime()})
        }, 1000)

        return () => clearInterval(intervalRef.current)
    }, [])

    useEffect(() => {
        if (time === 'resume') {
            startTimer()
        }

    }, [time])

    function pauseTimer() {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
            setIsRunning(false)
            dispatch({ type: SET_TIME, time: 'pause' })
        }
    }

    function startTimer() {
        if (!intervalRef.current) {
            dispatch({ type: SET_TIME, time: formatTime() })
            intervalRef.current = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1)
                dispatch({ type: SET_TIME, time: formatTime()})
            }, 1000)
            setIsRunning(true)
        }
    }


    function formatTime() {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    function onToggleClock() {
        if (isRunning) {
            pauseTimer()
        } else {
            startTimer()
        }
    }

    return (
        <section className="sudoku-info">
            <p>Mistakes:  <span>{`${mistakesAmount}/3`}</span></p>
            <div>
                <p>{formatTime()}</p>
                <button onClick={onToggleClock}>
                    {isRunning ? (
                        <i className="fa-solid fa-pause"></i>
                    ) : (
                        <i className="fa-solid fa-play"></i>
                    )}
                </button>
            </div>
        </section>
    )
}
