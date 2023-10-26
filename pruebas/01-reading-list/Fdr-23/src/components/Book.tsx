import React, { useEffect, useRef, useState } from 'react'
import useBookContext from '../hooks/useBookContext';
import { TYPE } from '../redux/action';
import { Book as Booktype } from '../type';

type BookProps = {
    book: Booktype,
    loading: boolean;
}

const Book: React.FC<BookProps> = ({ book, loading }) => {
    console.log(loading)
    const { dispatch } = useBookContext() as { dispatch: React.Dispatch<any> };
    const modalRef = useRef<HTMLElement | null>(null);
    const [toggle, setToggles] = useState(false)
    const { title, pages, genre, cover, synopsis, year, ISBN, author } = book;

    const handleAddList = (id: string) => {
        return dispatch({
            type: TYPE.ADD_LIST,
            payload: id,
        })
    }
    useEffect(() => {

        const handleClickOutside = (event: { target: any; }) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setToggles((prev) => prev ? false : true)
            }
        };
        if (toggle) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggle]);


    return (
        <article>
            <img
                onClick={() => setToggles((prev) => prev ? false : true)}
                className=' h-full w-full '
                src={cover} alt="Imagen tapa de libro" />

            <section className={`${toggle ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden'} `}>
                <div className="fixed inset-0 bg-black/80 "></div>

                <article ref={modalRef} className="relative bg-white w-5/12 mx-auto rounded shadow-lg z-50 ">
                    <div className="flex p-2 mt-8">
                        <button
                            onClick={() => setToggles((prev) => prev ? false : true)}
                            className='absolute right-2 top-2'>X</button>
                        <div className='bg-red-500 p-4 basis-96'>
                            <header >
                                <span className='text-lg font-semibold'>Titulo:</span>
                                <h2 className='text-xl font-bold pl-4'>{title}</h2>
                                <span className='text-lg font-semibold'>Autor: </span>
                                <h3 className='text-xl font-bold pl-4 whitespace-pre-wrap'>{author?.name}</h3>
                            </header>
                            <main className='py-2'>
                                <h4 className='text-lg font-semibold'>Description:</h4>
                                <span className='font-semibold text-base'>Pages: </span>
                                <p className='font-bold'>{pages}</p>
                                <span className='font-semibold text-base'>Genre: </span>
                                <p className='font-bold'>{genre}</p>
                                <span className='font-semibold text-base'>Year: </span>
                                <p className='font-bold'>{year}</p>
                                <span className='font-semibold text-base'>Synopsis: </span>
                                <p className='font-bold text-sm'>{synopsis}</p>
                                {author.otherBooks.length > 0 && <>
                                    <h4 className='text-lg font-semibold'>Others Books:</h4>
                                    {author && author.otherBooks.map((book, index) =>
                                        <ul key={index} className='flex list-disc ml-8'>
                                            <li>
                                                <h4 className='text-base'>{book}</h4>
                                            </li>
                                        </ul>)}</>
                                }
                            </main>
                        </div>
                        <div className='flex-1 flex flex-col bg-blue-500 items-center'>
                            <div className='w-60 h-96  bg-red-900'>
                                <img className='object-cover'
                                    src={cover} alt="Imagen tapa de libro" />
                            </div>
                            <div className=' flex items-center justify-center'>
                                <button
                                    onClick={() => {
                                        handleAddList(ISBN)
                                        setToggles((prev) => prev ? false : true)
                                    }}>
                                    Agregar a la Lista
                                </button>
                            </div>
                        </div>

                    </div>
                </article>
            </section>
        </article>
    )
}

export default Book