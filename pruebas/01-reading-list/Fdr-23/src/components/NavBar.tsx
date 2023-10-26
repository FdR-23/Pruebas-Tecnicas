import React, { useState } from 'react'
import useBookContext from '../hooks/useBookContext'
import { TYPE } from '../redux/action'
import SideList from './SideList'
import { Book as BookType } from '../type';
import { PiBooksBold } from "react-icons/pi";

const Navbar = () => {
    const { state, dispatch } = useBookContext() as { state: { genre: any[], listOfLecture: any[], books: BookType[] }, dispatch: React.Dispatch<any> };
    const [toggle, setToggles] = useState(false);

    const handleFilterByGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
        dispatch({
            type: TYPE.FILTER_BY_GENRE,
            payload: value
        })
    }

    return (
        <header className='h-40  flex  flex-col p-2 relative rounded-b-sm'>
            <div className='flex-grow items-center justify-center flex'>
                <h1 className='text-center text-5xl font-permanent_marker tracking-wider skew-x-12 skew-y-2'>Dreams Library</h1>
            </div>

            <button
                className='absolute flex  justify-center items-center right-4'
                onClick={() => setToggles((prev) => prev ? false : true)}>
                <span className='font-bold'>{state.listOfLecture.length}</span>
                <PiBooksBold className='w-10 h-10' />
            </button>

            <SideList
                toggle={toggle}
                setToggles={setToggles}
            />


            <section className='flex space-x-10 items-center font-permanent_marker'>
                <section>
                    <p className='font-permanent_marker text-xl tracking-wider -skew-x-12 '> Available:
                        <span className='pl-2 '>{state.books.length}</span>
                    </p>
                </section>

                <section>
                    <label htmlFor="genere">Categories: </label>
                    <select id="genere" onChange={handleFilterByGenre}>
                        <option data-name='All' value='All'>All</option>
                        {state?.genre && state?.genre.map((genre, index) =>
                            <option key={index} data-name={genre} value={genre}>{genre}</option>
                        )}
                    </select>
                </section>

            </section>



        </header >
    )
}

export default Navbar