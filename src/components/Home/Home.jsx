import React from 'react';
import SearchPagination from '../Cities/SearchPagination';
import Cities from '../Cities/Cities';


import './Home.css';

function CitiesModule() {
  return (
    <React.Fragment>
      <SearchPagination />
      <Cities />
    </React.Fragment>
  );
}

export default CitiesModule;
