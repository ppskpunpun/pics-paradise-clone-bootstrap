import { useState, useContext, useRef } from 'react'
import { SearchContext } from '../App'

export default function Search() {
    const [searchFocus, setSearchFoucs] = useState(false);
    const { search, setSearch } = useContext(SearchContext);
    const inputRef = useRef(null);

    function handleSearch(e) {
        e.preventDefault();
        setSearch(inputRef.current.value);
    }

    return (
        <form className="d-flex flex-grow-1 gap-1" role="search">
            <input className={"form-control border-0 rounded-5 bg-primary text-white " + (searchFocus ? "shadow" : "")} 
                onFocus={() => setSearchFoucs(true)} 
                onBlur={() => setSearchFoucs(false)} 
                type="search" placeholder="Search to explore pictures"
                ref={inputRef}
            /> 
            <button className="btn btn-outline-light" type="submit" onClick={handleSearch}>Search</button>
        </form>
    )
}