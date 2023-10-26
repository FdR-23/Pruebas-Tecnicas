import { PropsWithChildren, useReducer } from "react"
import reducer, { Action, initialState, InitialState } from "../redux/reducer"
import BookContext from "../context/BookContext"

const BooksProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer<React.Reducer<InitialState, Action>>(reducer, initialState);
    return (
        <BookContext.Provider value={{
            state: state,
            dispatch: dispatch
        }}>
            {children}
        </BookContext.Provider >
    )
}

export default BooksProvider