import { useState, useContext, createContext } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'

/*
  Search Component: set search
  Gallery Component: use search for fetching data
*/
export const SearchContext = createContext({
  search: '',
  setSearch: () => {}
});

export default function App() {
  const [search, setSearch] = useState('');
  const val = { search, setSearch };

  return (
    <SearchContext.Provider value={val}>
      <Navbar />
      {search == '' && <Hero />}
      <Gallery />
    </SearchContext.Provider>
  )
}