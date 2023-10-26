import { Book as BookType } from "../type";
import { TYPE } from "./action";

export interface InitialState {
    books: BookType[],
    copyBooks: BookType[],
    genre: string[],
    listOfLecture: BookType[],
}
export interface Action {
    type: string,
    payload: any,
}

const localStorageBooks: string | null = window.localStorage.getItem('books')
const storageBooks = localStorageBooks ? JSON.parse(localStorageBooks) : null;
const localStorageListLecture: string | null = window.localStorage.getItem('listOfLecture')
const storageListLecture = localStorageListLecture ? JSON.parse(localStorageListLecture) : null;

export const initialState: InitialState = {
    books: storageBooks ? storageBooks : [],
    copyBooks: [],
    genre: [],
    listOfLecture: storageListLecture ? storageListLecture : [],
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case TYPE.GET_ALL_BOOKS: {
            return {
                ...state,
                books: action.payload,
                copyBooks: action.payload
            }
        }
        case TYPE.GET_ALL_GENRE: {
            return {
                ...state,
                genre: action.payload
            }
        }
        case TYPE.FILTER_BY_GENRE: {
            const copyState = state.copyBooks;
            const booksFiltered = copyState.filter((book) =>
                action.payload === 'All' ? book :
                    book.genre === action.payload
            )
            return {
                ...state,
                books: booksFiltered
            }
        }
        case TYPE.ADD_LIST: {
            const books = state.books;
            const listLecture = state.listOfLecture;
            const foundBook = books.find((book) => book.ISBN === action.payload);
            if (foundBook) {
                return {
                    ...state,
                    books: books.filter((book) => book.ISBN !== action.payload),
                    copyBooks: books.filter((book) => book.ISBN !== action.payload),
                    listOfLecture: [...listLecture, foundBook]
                }
            } else {
                return { ...state }
            }
        }
        case TYPE.REMOVE_BOOK: {
            const books = state.books;
            const listLecture = state.listOfLecture;
            const foundBook = listLecture.find((book) => book.ISBN === action.payload);
            if (foundBook) {
                return {
                    ...state,
                    listOfLecture: listLecture.filter((book) => book.ISBN !== action.payload),
                    books: [...books, foundBook],
                    copyBooks: [...books, foundBook],
                }
            } else {
                return { ...state }
            }
        }
        default: return state
    }
}

export default reducer