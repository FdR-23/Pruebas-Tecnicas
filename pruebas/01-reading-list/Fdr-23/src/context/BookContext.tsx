import React, { createContext } from "react";
import { Action } from "../redux/reducer";

export type GlobalContent = {
    state: unknown,
    dispatch: React.Dispatch<Action>
}

const BookContext = createContext<GlobalContent | undefined>(undefined);



export default BookContext