import './App.css'
import React, { useEffect, useState } from 'react';
import Book from '../components/Book';
import NavBar from '../components/NavBar';
import { getAllBooks } from '../services/Request'
import useBookContext from '../hooks/useBookContext';
import { TYPE } from '../redux/action';
import { Book as BookType } from '../type';

function App() {
    const { state, dispatch } = useBookContext() as { state: { books: BookType[] }, dispatch: React.Dispatch<unknown> };
    const [loading, setLoading] = useState(true);
    const localStorageBooks = window.localStorage.getItem('books')
    const storageBooks = localStorageBooks ? JSON.parse(localStorageBooks) : null;

    useEffect(() => {
        if (!storageBooks) {
            getAllBooks()
                .then((data: { library: { book: Record<string, unknown> }[] }) => {
                    const genreArr: string[] = [];
                    const books = data?.library.map((element: { book: unknown; }) => element.book)
                    dispatch({
                        type: TYPE.GET_ALL_BOOKS,
                        payload: books
                    });
                    books.forEach((book) => {
                        const { genre } = book as { genre: string };
                        if (!genreArr.includes(genre)) {
                            genreArr.push(genre)
                        }
                    });
                    dispatch({
                        type: TYPE.GET_ALL_GENRE,
                        payload: genreArr
                    });
                }).finally(() => {
                    setLoading(false)
                })
        }
    }, [dispatch, storageBooks])

    useEffect(() => {
        window.localStorage.setItem('books', JSON.stringify(state.books))
    }, [state.books])

    return (
        <main>
            <NavBar />
            <section className='grid auto-rows-auto p-8
             gap-4 grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]'>
                {state.books && state.books.length > 0 ? state.books.map((book, index) =>
                    < Book
                        key={index}
                        book={book}
                        loading={loading}
                    />) : <p>No hay Libros</p>}
            </section>

        </main>
    )
}

export default App
