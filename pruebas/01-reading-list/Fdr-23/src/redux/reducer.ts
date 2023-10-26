//import { TYPE } from "./action"
import { Book as BookType } from "../type";

export interface InitialState {
    books: BookType[],
    copyBooks: BookType[],
    genre: string[],
    listOfLecture: unknown[],
}
export interface Action {
    type: string,
    payload: unknown,
}

const localStorageBooks: string | null = window.localStorage.getItem('books')
const storageBooks = localStorageBooks ? JSON.parse(localStorageBooks) : null;
const localStorageListLecture: string | null = window.localStorage.getItem('listLecture')
const storageListLecture = localStorageListLecture ? JSON.parse(localStorageListLecture) : null;

export const initialState: InitialState = {
    books: storageBooks ? storageBooks : [],
    copyBooks: [],
    genre: [],
    listOfLecture: storageListLecture ? storageListLecture : [],
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        default: return state
    }
}

export default reducer