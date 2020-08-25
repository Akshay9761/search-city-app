import React, { useRef, useEffect } from 'react';
import debounce from '../../common/Js/debounce';

function Search({ onSearch, searchTxt }) {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.value = searchTxt
    if (searchTxt) {
      onSearch(searchTxt);
    }
  }, [searchTxt])

  const setSearchTerm = debounce(() => {
    if (searchRef.current) {
      onSearch(searchRef.current.value);
    }
  }, 1000);

  return (
    <input
      type="text"
      ref={searchRef}
      onChange={setSearchTerm}
      className="form-control"
      style={{ width: '265px' }}
      placeholder={"Search"}
    />
  );
}

export default Search;