import React, { useEffect, useRef, useState } from 'react'
import useBookContext from '../../hooks/useBookContext';
import { Book as BookType } from '../../type';
import { FiXCircle } from "react-icons/fi";
import { TYPE } from '../../redux/action';
import { ALL_FILTER } from '../cosnt/const';

type SideListProp = {
    toggleFilter: boolean,
    setToggleFilter: any;
}

const SideFilter: React.FC<SideListProp> = ({ toggleFilter, setToggleFilter }) => {
    const { state, dispatch } = useBookContext() as { state: { genre: any[], listOfLecture: any[], books: BookType[], copyBooks: BookType[] }, dispatch: React.Dispatch<any> };
    const [page, setPage] = useState<string>();
    const sideRef = useRef<HTMLElement | null>(null)

    const rangePages = state.copyBooks.reduce((acc, value) => {
        return {
            min: Math.min(acc.min, value.pages),
            max: Math.max(acc.max, value.pages)
        }

    }, { min: +Infinity, max: -Infinity })

    const handleFilterByGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
        dispatch({
            type: TYPE.FILTER_BY_GENRE,
            payload: value
        })
    }
    const handleRangePage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPage(value);
        dispatch({
            type: TYPE.FILTER_BY_PAGE,
            payload: value
        })
    }




    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (sideRef.current && !sideRef.current.contains(event.target)) {
                setToggleFilter((prev: boolean) => prev ? false : true)
            }
        };
        if (toggleFilter) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [setToggleFilter, toggleFilter])


    return (
        <aside id='journal-scroll' >
            <div className={`${toggleFilter ? 'fixed inset-0 bg-black/80  backdrop-blur-sm z-10' : 'hiddens'}`}></div>
            <section
                ref={sideRef}
                className={`${toggleFilter ? `w-full sm:w-[50%] md:w-[45%] p-2 flex flex-col ` : `w-0`}
                bg-gray-100 top-0 right-0 h-full min-h-screen fixed transition-all duration-300 z-20 overflow-hidden
                flex lfex-col`}>
                <button
                    className='absolute right-4 top-2 z-10'
                    onClick={() => setToggleFilter(false)}>
                    <FiXCircle className='w-6 h-6 ' />
                </button>

                <h3 className='text-3xl font-permanent_marker p-2 -skew-x-12'>Filters</h3>


                <section className='flex flex-col space-y-4 p-2  mt-4'>
                    <article className=''>
                        <label htmlFor="genere">Categories: </label>
                        <select id="genere" onChange={handleFilterByGenre}>
                            <option data-name={ALL_FILTER} value='All'>All</option>
                            {state?.genre && state?.genre.map((genre, index) =>
                                <option key={index} data-name={genre} value={genre}>{genre}</option>
                            )}
                        </select>
                    </article>

                    <article className=''>
                        <label htmlFor="pages">Pages: </label>
                        <input
                            id="pages"
                            type="range"
                            value={page}
                            min={rangePages.min}
                            max={rangePages.max}
                            onChange={handleRangePage} />
                        {page ? <span> Page: {page}</span> : null}
                    </article>
                </section>

            </section>
        </aside>
    )
}

export default SideFilter