import React, { useState } from 'react'
import useBookContext from '../../hooks/useBookContext'
import { TYPE } from '../../redux/action'
import SideList from '../SideListBook/SideList'
import SideFilter from './SideFilter';
import { Book as BookType } from '../../type';
import { ALL_FILTER } from '../cosnt/const';
import { PiBooksBold } from "react-icons/pi";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
    const { state, dispatch } = useBookContext() as { state: { genre: any[], listOfLecture: any[], books: BookType[], copyBooks: BookType[] }, dispatch: React.Dispatch<any> };
    const [toggle, setToggles] = useState<boolean>(false);
    const [toggleFilter, setToggleFilter] = useState<boolean>(false);
    const [page, setPage] = useState<string>();

    const handleFilterByGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
        dispatch({
            type: TYPE.FILTER_BY_GENRE,
            payload: value
        })
    }

    const rangePages = state.copyBooks.reduce((acc, value) => {
        return {
            min: Math.min(acc.min, value.pages),
            max: Math.max(acc.max, value.pages)
        }

    }, { min: +Infinity, max: -Infinity })

    const handleRangePage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPage(value);
        dispatch({
            type: TYPE.FILTER_BY_PAGE,
            payload: value
        })
    }

    return (
        <header className='h-40  flex  flex-col p-2 relative rounded-b-sm border-b shadow-sm bg-neutral-300'>

            <div className='flex-grow items-center justify-center flex'>
                <h1 className='text-center  text-2xl md:text-5xl font-permanent_marker tracking-wider skew-x-12 skew-y-2'>Dreams Library</h1>
            </div>

            <button
                className='absolute flex  justify-center items-center right-4'
                onClick={() => setToggles((prev) => prev ? false : true)}>
                <span className='text-base md:text-xl'>{state.listOfLecture?.length}</span>
                <PiBooksBold className='w-6 h-6 md:w-10 md:h-10' />
            </button>

            <SideList
                toggle={toggle}
                setToggles={setToggles}
            />


            <section className='flex space-x-10 items-center font-permanent_marker relative'>
                <section>
                    <p className='font-permanent_marker text:base text-center md:text-xl tracking-wider -skew-x-12 '>
                        Books Available:
                        <span className='pl-2 '>{state.books.length}</span>
                    </p>
                </section>


                <button className='sm:hidden absolute bottom-0 right-0 ' onClick={() => setToggleFilter(true)}>
                    <FiMenu className={`transition-all duration-150 hover:scale-110 w-7 h-7`} />
                </button>
                <SideFilter
                    toggleFilter={toggleFilter}
                    setToggleFilter={setToggleFilter}
                />


                <section className='hidden sm:block'>
                    <label htmlFor="genere">Categories: </label>
                    <select id="genere" onChange={handleFilterByGenre}>
                        <option data-name={ALL_FILTER} value='All'>All</option>
                        {state?.genre && state?.genre.map((genre, index) =>
                            <option key={index} data-name={genre} value={genre}>{genre}</option>
                        )}
                    </select>
                </section>

                <section className='hidden sm:block'>
                    <label htmlFor="pages">Pages: <span>({page}) </span></label>
                    <input
                        id="pages"
                        type="range"
                        value={page}
                        min={rangePages.min}
                        max={rangePages.max}
                        onChange={handleRangePage} />
                </section>
            </section>



        </header >
    )
}

export default Navbar