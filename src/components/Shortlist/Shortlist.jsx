import React, { useMemo } from 'react';
import { TableHeader, TableBody } from '../DataTable'
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { headers } from '../../common/Js/constant';
import debounce from '../../common/Js/debounce';
import { removeShortListCity } from '../../redux/actions/citiesActions';

function Shortlist({
  removeShortListCity,
  shortlistedCities,
  loading
}) {

  const handleRemoveShortListedCity = debounce((cityId) => {
    removeShortListCity(cityId);
  }, 500)

  const citiesData = useMemo(() => shortlistedCities, [shortlistedCities]);

  return (
    <>
      {
        loading ?
          <Spinner className="loader" animation="border" variant="info" />
          : citiesData && citiesData.length ? 
            <div className="container-fluid">
              <div className="row mt-3">
                <div className="col mb-3">
                  <Table bordered responsive="sm" hover variant="dark">
                    <TableHeader headers={headers} />
                    <TableBody 
                      citiesData={citiesData} 
                      removeActionVisible={true} 
                      shortListActionVisible={false}
                      handleRemoveCity={handleRemoveShortListedCity}
                    />
                  </Table>
                </div>
              </div>
            </div>
          : <div className="center">
              <h4>
                No Shortlist Cities Available
              </h4>
            </div>
      }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.apiCallsInProgress > 0,
    shortlistedCities: state.allCities.shortlistedCities
  };
}

const mapDispatchToProps = {
  removeShortListCity
};

export default connect(mapStateToProps, mapDispatchToProps)(Shortlist);