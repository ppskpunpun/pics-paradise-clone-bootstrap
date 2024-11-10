import { useContext } from 'react'
import Search from "./Search"
import { SearchContext }from "../App"

function SuggestSearch({suggest_search}) {
    const { search, setSearch } = useContext(SearchContext);

    function handleClick(e) {
        setSearch(suggest_search);
    }

    return (
        <button className="btn btn-secondary bg-gradient mx-1 px-3 py-1 shadow" onClick={handleClick}>
            {suggest_search}
        </button>
    )
}

export default function Hero() {
    return (
        <section className="container-fluid px-0 text-white hero-bg-pic d-flex align-items-center justify-content-center">
            <div className="container-sm bg-dark bg-opacity-50 py-0 py-sm-5 rounded-3 d-flex flex-column justify-content-center align-items-center">
                <h1 className="display-5 fw-bold">Discover the power of visual storytelling with our image gallery.</h1>
                <div className="d-none d-md-flex btn-group justify-content-center mt-3 w-100">
                    <SuggestSearch suggest_search="space"/>
                    <SuggestSearch suggest_search="nature"/>
                    <SuggestSearch suggest_search="paradise"/>
                    <SuggestSearch suggest_search="anime"/>
                    <SuggestSearch suggest_search="cat"/>
                    <SuggestSearch suggest_search="ocean"/>
                </div>
            </div>
        </section>
    )
}