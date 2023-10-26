import React, { useState } from 'react'
import useBookContext from '../hooks/useBookContext'
import { TYPE } from '../redux/action'
import SideList from './SideList'

const Navbar = () => {
    const { state, dispatch } = useBookContext() as { state: { genre: any[], listOfLecture: any[] }, dispatch: React.Dispatch<any> };
    const [toggle, setToggles] = useState(false);

    const handleFilterByGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
        dispatch({
            type: TYPE.FILTER_BY_GENRE,
            payload: value
        })
    }

    return (
        <header className='h-40 bg-red-500'>
            <h1>Dreams Library</h1>

            <button className='text-white ' onClick={() => setToggles((prev) => prev ? false : true)}>
                AbrirCart <span>{state.listOfLecture.length}</span>
            </button>
            <SideList
                toggle={toggle}
                setToggles={setToggles}
            />


            <div>
                <p>filtros</p>
                <label htmlFor="genere">Categories: </label>
                <select id="genere" onChange={handleFilterByGenre}>
                    <option data-name='All' value='All'>All</option>
                    {state?.genre && state?.genre.map((genre, index) =>
                        <option key={index} data-name={genre} value={genre}>{genre}</option>
                    )}
                </select>
            </div>



        </header >
    )
}

export default Navbar