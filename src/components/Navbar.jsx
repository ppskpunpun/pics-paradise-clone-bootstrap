import { useContext } from 'react'
import Search from './Search'
import { SearchContext } from '../App'

export default function Navbar() {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <nav className="navbar bg-dark sticky-top shadow-sm px-0 px-md-5">
      <div className="container-fluid d-flex align-items-center gap-2" style={{flexWrap: 'nowrap'}}>
        <a className="navbar-brand text-white d-flex align-items-center gap-2 m-0" href="#" onClick={() => setSearch('') }>
          <img className="img-thumbnail p-0" width="50" src="logo.png"/> 
          <span className="h3 hide-at-small m-0" style={{color: "#C7DEF9"}}>Pics Paradise</span> 
        </a>  
        <Search />
        <a className="link-info navbar-text hide-at-small flex-shrink-0" href="#">view source</a>
      </div>
    </nav>
  )
}