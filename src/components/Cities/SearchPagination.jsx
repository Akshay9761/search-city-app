import React from 'react';
import { connect } from 'react-redux';
import { Pagination, Search } from '../DataTable';
import { searchCity, setCurrentPage } from '../../redux/actions/citiesActions';

function SearchPagination({
  totalItems,
  ITEMS_PER_PAGE,
  setCurrentPage,
  currentPage,
  searchCity,
  search
}) {

  return (
    <div className="container-fluid pagination-search mt-3">
      <div className="row mt-3">
        <div className="col-md-6 align-items-center">
          <Pagination
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
        <div className="col-md-6 d-flex flex-row-reverse search-field">
          <Search
            onSearch={value => {
              searchCity(value);
            }}
            searchTxt={search}
          />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    totalItems: state.allCities.totalItems,
    currentPage: state.allCities.currentPage,
    ITEMS_PER_PAGE: state.allCities.ITEMS_PER_PAGE,
    search: state.allCities.search
  }
}

const mapDispatchToProps = {
  searchCity,
  setCurrentPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPagination);
