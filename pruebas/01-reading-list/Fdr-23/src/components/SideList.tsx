import React, { useEffect, useRef, useState } from 'react'
import useBookContext from '../hooks/useBookContext';
import { Book as BookType } from '../type';
import { TYPE } from '../redux/action';
import { FiXCircle } from "react-icons/fi";

type SideListProp = {
    toggle: boolean,
    setToggles: any;
}

const SideList: React.FC<SideListProp> = ({ toggle, setToggles }) => {
    const { state, dispatch } = useBookContext() as { state: { listOfLecture: BookType[] }, dispatch: React.Dispatch<any> };
    const sideRef = useRef<HTMLElement | null>(null)
    const [inCart, setInCart] = useState(false);


    useEffect(() => {
        window.localStorage.setItem('listOfLecture', JSON.stringify(state.listOfLecture))
    }, [state.listOfLecture])

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (sideRef.current && !sideRef.current.contains(event.target)) {
                setToggles((prev: boolean) => prev ? false : true)
            }
        };
        if (toggle) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [setToggles, toggle])

    const handleRemoveItem = (id: string) => {
        dispatch({
            type: TYPE.REMOVE_BOOK,
            payload: id
        })
    };

    return (
        <aside >
            <div className={`${toggle ? 'fixed inset-0 bg-black/80  backdrop-blur-sm z-10' : 'hiddens'}`}></div>
            <section
                ref={sideRef}
                className={`${toggle ? `w-full sm:w-[50%] md:w-[45%] p-2 flex flex-col ` : `w-0`}
                bg-gray-100 top-0 right-0 h-full min-h-screen fixed transition-all duration-300 z-20 overflow-hidden `}>
                <button
                    className='absolute right-4 top-2 z-10'
                    onClick={() => setToggles(false)}>
                    <FiXCircle className='w-6 h-6 ' />
                </button>


                <h2 className='text-3xl font-permanent_marker p-2 -skew-x-12'>List of Lecture</h2>

                <section
                    className='grid gap-8 auto-rows-auto grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] p-8' >
                    {state.listOfLecture && state.listOfLecture.length > 0 && toggle ?
                        state.listOfLecture.map((book) =>
                            <article
                                onMouseEnter={() => setInCart(true)}
                                onMouseLeave={() => setInCart(false)}
                                className='bg-red-500  relative h-52'
                                key={book.ISBN}>
                                <img
                                    className='h-full'
                                    src={book.cover} alt="Imagen tapa de libro" />
                                <button
                                    className={`${inCart ? `visible` : `invisible`}
                                    bg-gray-600/40 hover hover:bg-gray-600 text-white  text-xs py-1 px-2 rounded-md font-permanent_marker 
                                    bottom-0  absolute`}
                                    onClick={() => handleRemoveItem(book.ISBN)}>
                                    Remove
                                </button>
                            </article>) :
                        <p className='absolute left-[50%] -translate-x-[50%] font-permanent_marker text-2xl text-center'>
                            There are no Books in the List
                        </p>}
                </section>
            </section>
        </aside>
    )
}

export default SideList