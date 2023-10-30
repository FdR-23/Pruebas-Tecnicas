
import React, { useEffect } from 'react';
import Book from '../components/Books/Book';
import NavBar from '../components/Navbar/NavBar';
import { getAllBooks } from '../services/Request'
import useBookContext from '../hooks/useBookContext';
import { TYPE } from '../redux/action';
import { Book as BookType } from '../type';

function App() {
    const { state, dispatch } = useBookContext() as { state: { books: BookType[], genre: [] }, dispatch: React.Dispatch<any> };
    //const [loading, setLoading] = useState(false);
    const localStorageBooks = window.localStorage.getItem('books');
    const storageBooks = localStorageBooks ? JSON.parse(localStorageBooks) : null;

    useEffect(() => {
        getAllBooks()
            .then((data: { library: { book: Record<string, any> }[] }) => {
                const genreArr: string[] = [];
                const books = data?.library.map((element: { book: any }) => element.book)
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

            })
    }, [dispatch])
    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(state.books))
        const upDateStorage = (event: StorageEvent) => {
            if (event.storageArea === localStorage && event.key === 'books' && event.newValue) {
                dispatch({
                    type: TYPE.GET_ALL_BOOKS,
                    payload: JSON.parse(event.newValue)
                });
            }
        }
        window.addEventListener('storage', upDateStorage)
        return () => {
            window.removeEventListener("storage", upDateStorage);
        }
    }, [dispatch, state, state.books, storageBooks])

    return (
        <main>
            <NavBar />
            <section className='grid auto-rows-auto p-8 mt-2 gap-4 
             grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]
             md:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]'>
                {state.books && state.books.length > 0 ? state.books.map((book, index) =>
                    < Book
                        key={index}
                        book={book}

                    />) : <p>No hay Libros</p>}
            </section>

        </main>
    )
}

export default App
