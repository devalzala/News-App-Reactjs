import React from 'react';
import { useGlobalContext } from './context';


const Search = () => {

  const {query, searchPost} = useGlobalContext();


  return (
    <>
      <div>
        <h1>Tech News Website</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder='Search for the latest news' value={query} onChange={(e) => searchPost(e.target.value)}/>
        </form>
      </div>
    </>
  )
}

export default Search;