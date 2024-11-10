import { useContext } from 'react'
import { SearchContext } from "../App"

function PicsColumn({imageSrcs}) {
    console.log(typeof imageSrcs)
    return (
        <div className="d-flex flex-column">{
            imageSrcs.map((s) => <img className="w-100" key={s} src={s}/>)
        }</div>
    )
}

export default function Gallery() {
    const { search, setSearch } = useContext(SearchContext);
    const imgs = ["https://images.unsplash.com/photo-1439853949127-fa647821eba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MzA3MzZ8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNzMxMTQxMDgxfDA&ixlib=rb-4.0.3&q=80&w=1080"];
    return (
        <div className="container-md text-white text-center">
            <h1 className="text-white">{search}</h1>
            <div className="d-flex flex-column flex-md-row gap-3">
                <PicsColumn imageSrcs={imgs}/>   
                <PicsColumn imageSrcs={imgs}/>   
                <PicsColumn imageSrcs={imgs}/>    
            </div>
        </div>
    )
}