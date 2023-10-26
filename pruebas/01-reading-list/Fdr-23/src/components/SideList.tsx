import React, { useEffect, useRef } from 'react'
import useBookContext from '../hooks/useBookContext';
import { Book as BookType } from '../type';
import { TYPE } from '../redux/action';

type SideListProp = {
    toggle: boolean,
    setToggles: any;
}

const SideList: React.FC<SideListProp> = ({ toggle, setToggles }) => {
    const { state, dispatch } = useBookContext() as { state: { listOfLecture: BookType[] }, dispatch: React.Dispatch<any> };
    const sideRef = useRef<HTMLElement | null>(null)

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
            <div className={`${toggle ? 'fixed inset-0 bg-black/80 ' : 'hiddens'}`}></div>
            <section
                ref={sideRef}
                className={`${toggle ? `w-full sm:w-[50%] md:w-[45%]` : `w-0`}
                bg-indigo-950 top-0 right-0 h-full min-h-screen fixed transition-all duration-300 z-20 overflow-hidden `}>
                <button
                    className='absolute right-4 top-2'
                    onClick={() => setToggles(false)}>
                    ce
                </button>

                <section
                    className='grid gap-8 auto-rows-auto grid-cols-[repeat(auto-fill,minmax(6rem,1fr))]'>
                    {state.listOfLecture && state.listOfLecture.length > 0 && toggle ?
                        state.listOfLecture.map((book) =>
                            <article
                                className='bg-red-500 p-1'
                                key={book.ISBN}>
                                <img
                                    className=' h-40 '
                                    src={book.cover} alt="Imagen tapa de libro" />
                                <button
                                    onClick={() => handleRemoveItem(book.ISBN)}
                                > Quitar</button>
                            </article>) :
                        <>No hay nadas</>}
                </section>
            </section>
        </aside>
    )
}

export default SideList