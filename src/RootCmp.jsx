import React from 'react'
import { Routes, Route } from 'react-router'
import { SudokuIndex } from './pages/SudokuIndex'



export function RootCmp() {
    return (
        <div className="main-container">

            <main>
                <SudokuIndex />
                {/* <Routes>
                    <Route path="" element={<HomePage />} />
                   
                </Routes> */}
            </main>
        </div>
    )
}


