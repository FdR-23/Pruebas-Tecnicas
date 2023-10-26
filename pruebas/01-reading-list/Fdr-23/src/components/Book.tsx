import React, { useEffect, useRef, useState } from 'react'
import useBookContext from '../hooks/useBookContext';
import { TYPE } from '../redux/action';
import { Book as Booktype } from '../type';
import { FiXCircle } from "react-icons/fi";

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



                // {/* Skeleton Img */}
                // <div className={`${!images ? `flex justify-center items-center relative rounded-sm 
                //     w-full h-[calc(100vh-100px)] sm:h-[calc(100vh-150px)] bg-gray-300  animate-pulse` : `hidden`}`}>
                //     <svg className="w-20 h-20 object-fill" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                // </div>


    return (
        <article>
            <img
                onClick={() => setToggles((prev) => prev ? false : true)}
                className=' h-full w-full cursor-pointer'
                src={cover} alt="Imagen tapa de libro" />

            <section className={`${toggle ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden'} `}>
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm "></div>

                <article ref={modalRef} className="relative bg-gray-200 w-6/12 mx-auto rounded shadow-lg z-50 ">
                    <div className="flex p-2">
                        <div className='pr-2 basis-96 font-permanent_marker flex flex-col justify-center'>
                            <header className='text-center'>
                                <h2 className='text-3xl skew-x-12'>{title}</h2>
                                <h3 className='text-xl whitespace-pre-wrap'>{author?.name}</h3>
                            </header>
                            <main className='p-4 space-y-1'>
                                <h4 className='text-xl tracking-wider whitespace-pre-wrap -skew-x-6'>Description</h4>
                                <p>
                                    <span className='font-thin  text-base pr-2 '>
                                        Pages:
                                    </span>
                                    {pages}
                                </p>
                                <p>
                                    <span className='font-thin text-base pr-2'>
                                        Genre:
                                    </span>
                                    {genre}
                                </p>
                                <p>
                                    <span className='font-thin text-base pr-2'>
                                        Year:
                                    </span>
                                    {year}
                                </p>
                                <div>
                                    <h4 className='text-xl tracking-wider whitespace-pre-wrap -skew-x-6'>Synopsis</h4>
                                    <p className='text-sm pl-2  leading-4  tracking-wide lowercase skew-x-12'>
                                        {synopsis}
                                    </p>
                                </div>
                                {author.otherBooks.length > 0 && <>
                                    <h4 className='text-xl tracking-wider whitespace-pre-wrap -skew-x-6'>Others Books</h4>
                                    {author && author.otherBooks.map((book, index) =>
                                        <ul key={index} className='flex list-disc ml-8'>
                                            <li>
                                                <h4 className='text-base'>{book}</h4>
                                            </li>
                                        </ul>)}</>
                                }
                            </main>

                            <button
                                onClick={() => setToggles((prev) => prev ? false : true)}
                                className='absolute right-2 top-2'>
                                <FiXCircle className='w-6 h-6' />
                            </button>

                        </div>
                        <div className='flex-1 flex flex-col items-center'>

                            <img className='w-52 h-80 m-2 rounded-md  shadow-sm  shadow-black object-cover'
                                src={cover} alt="Imagen tapa de libro" />

                            <div className='w-full h-20 flex items-center justify-center'>
                                <button
                                    className='bg-gray-600 text-white py-1 px-4 rounded-md font-permanent_marker 
                                    shadow-sm shadow-black hover:shadow-md hover:shadow-black
                                    transition-all duration-500'
                                    onClick={() => {
                                        handleAddList(ISBN)
                                        setToggles((prev) => prev ? false : true)
                                    }}>
                                    Add to List
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