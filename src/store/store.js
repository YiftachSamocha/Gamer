import { legacy_createStore as createStore, combineReducers } from 'redux'

import { carReducer } from './reducers/car.reducer'
import { sudokuReducer } from './reducers/sudoku.reducer'


const rootReducer = combineReducers({
    carModule: carReducer,
    sudokuModule: sudokuReducer,
    
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })