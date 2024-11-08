export function SudokuActions() {
    return <section className="sudoku-actions">
        <div>
            <button><i className="fa-solid fa-rotate-left"></i></button>
            <p>Undo</p>
        </div>
        <div>
            <button><i className="fa-solid fa-eraser"></i></button>
            <p>Erase</p>
        </div>
        <div>
            <button><i className="fa-solid fa-pencil"></i></button>
            <p>Notes</p>
        </div>
        <div>
            <button><i className="fa-regular fa-lightbulb"></i></button>
            <p>Hint</p>
        </div>
    </section>
}