import { useContext } from "react";
import BookContext from "../context/BookContext";

const useBookContext = () => {
    return useContext(BookContext);
}
export default useBookContext