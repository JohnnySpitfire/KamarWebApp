import React from 'react';

const SearchBar = () => {

     const [inHover, setHover] = React.useState(false);
     const toggleHover = () => {
         setTimeout(() => {
         setHover(!inHover)}, 100);
    }; 
    return(
        <div className='search-area'
             onMouseEnter={toggleHover}
             onMouseLeave={toggleHover}>
            <button type="submit" className={inHover ? 'subject-search-button' : 'subject-search-button'}></button>
            <input type="text" className={inHover ? 'subject-search' : 'subject-search'} placeholder="Search"/>
        </div>
    );
}

export default SearchBar