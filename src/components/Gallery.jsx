import { useContext, useState, useEffect, useRef } from 'react'
import { SearchContext } from "../App"

function PicsColumn({imgs}) {
    return (
        <div className="d-flex flex-column flex-grow-1 gap-3">{
            imgs.map((img) => <img key={img.id} className="w-100" src={img.urls.small} />)
        }</div>
    )
}

export default function Gallery() {
    const { search, setSearch } = useContext(SearchContext);
    const prevSearch = useRef(''); // for clearing previous images on new search
    const [isShowingImgs, setIsShowingImgs] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // while fetching data
    const [imagesCols, setImagesCols] = useState([[], [], []]); // images for each column
    const [colsHeight, setColsHeight] = useState([0, 0, 0]); // total height of each column and each indices sync with imagesCol (height is actually height / width)
    const imagesId = useRef(new Set());
    const [page, setPage] = useState(1); // current page for fetching data
    const [error, setError] = useState(null); // error from fetching data

    // emptysearch consider as random images
    const url = search == '' 
        ? `https://api.unsplash.com/photos/random/?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&count=30`
        : `https://api.unsplash.com/search/photos/?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&query=${search}&page=${page}&per_page=30`;

      
    function sortImagesToEachCol(datas) {
        let newImagesCols = [...imagesCols];
        let newColsHeight = [...colsHeight];

        if (prevSearch.current != search) {
            prevSearch.current = search;
            newImagesCols = [[], [], []];
            newColsHeight = [0, 0, 0];
        }

        datas.forEach(data => {
            // add each image to the smallest total height column
            let minHeightColIdx = newColsHeight.indexOf(Math.min(...newColsHeight));
            let heightRatio = data.height / data.width;

            if (imagesId.current.has(data.id) == false) {
                newImagesCols[minHeightColIdx].push(data);
                newColsHeight[minHeightColIdx] += heightRatio;
                imagesId.current.add(data.id);
            }
        });

        setImagesCols(newImagesCols);
        setColsHeight(newColsHeight);
        setIsShowingImgs(true);
    }
    
    const testURL = "src/components/temp.json";

    // fetch images from unsplash api
    useEffect(() => {
        setIsLoading(true);
        // why setTimeout()???? 
        // Because, I just want to have a time to see loading animation :)
        if (prevSearch.current != search) setIsShowingImgs(false);
        setTimeout(() => {
            fetch(testURL)
            .then((res) => res.json())
            .then((jsonData) => search == '' ? sortImagesToEachCol(jsonData) : sortImagesToEachCol(jsonData.results))
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false));
        }, 1000)
    }, [url, page])

    if (error) {
        console.log(error);
        return (
            <div className="container-md">
                <h1 className="mt-3 text-center text-danger">Something went wrong !!!</h1>
                <p className="text-center text-danger">Try to refresh the page</p>
            </div>
        )
    }

    return (
        <div className="container-md text-white text-center mb-5">
            {
                isShowingImgs &&
                <>
                <h1 className="text-white">{search}</h1>
                <div className="d-flex flex-column flex-md-row gap-3 mb-5">
                    <PicsColumn imgs={imagesCols[0]} />
                    <PicsColumn imgs={imagesCols[1]} />
                    <PicsColumn imgs={imagesCols[2]} />
                </div>
                </>
            }
            {
                !isLoading &&
                <div className="d-flex justify-content-center">
                    <button 
                        className="btn btn-primary"
                        onClick={() => { setPage(page + 1) }}
                    >Load more</button>
                </div>
            }
            {
                isLoading && 
                <div className="d-flex gap-2 justify-content-center py-4">
                    <div className="spinner-grow"></div> 
                    <div className="spinner-grow bg-primary"></div> 
                    <div className="spinner-grow bg-secondary"></div> 
                </div>
            }
        </div>
    )
}