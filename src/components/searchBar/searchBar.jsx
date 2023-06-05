import React, { useState } from 'react';
import './searchBar.scss';

const SearchBar = ({ onSearch }) => {
    const [searchInput, setSearchInput] = useState("");
    return (
        <div className='search-bar'>
            <input
                type="search"
                placeholder="Search here"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSearch(searchInput)
                    }
                }}
                onInput={() => onSearch("")} />
        </div>
    )
}

export default SearchBar;