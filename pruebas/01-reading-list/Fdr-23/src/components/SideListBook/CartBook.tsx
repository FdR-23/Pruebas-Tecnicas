import React, { useState } from 'react'
import useBookContext from '../../hooks/useBookContext';
import { Book as BookType } from '../../type';
import { TYPE } from '../../redux/action';

type CartBookProp = {
    book: BookType,
}

const CartBook: React.FC<CartBookProp> = ({ book }) => {
    const { dispatch } = useBookContext() as { state: { listOfLecture: BookType[] }, dispatch: React.Dispatch<any> };
    const [inCart, setInCart] = useState(false);
    const handleRemoveItem = (id: string) => {
        dispatch({
            type: TYPE.REMOVE_BOOK,
            payload: id
        })
    };

    return (
        <article
            onMouseEnter={() => setInCart(true)}
            onMouseLeave={() => setInCart(false)}
            className='relative h-40 w-fit cursor-pointer rounded-md overflow-hidden 
        shadow-sm shadow-black hover:shadow-lg hover:shadow-black transition-all duration-300'
            key={book.ISBN}>

            <img
                className='h-full'
                src={book.cover} alt="Imagen tapa de libro" />

            <button
                className={`${inCart && book.ISBN ? `visible` : `invisible`}
            bg-gray-600/40 hover hover:bg-gray-600 text-white  text-xs py-1 px-2 rounded-md font-permanent_marker 
            bottom-0  absolute`}
                onClick={() => handleRemoveItem(book.ISBN)}>
                Remove
            </button>
        </article>
    )
}

export default CartBook