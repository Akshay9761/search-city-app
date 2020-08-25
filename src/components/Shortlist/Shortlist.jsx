import React, { useMemo } from 'react';
import { TableHeader } from '../DataTable'
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
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
  }, 1000)

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
                    <tbody>
                      {citiesData.map(city => (
                        <tr key={city.id}>
                          <td>{city.State}</td>
                          <td>{city.District}</td>
                          <td>{city.City}</td>
                          <td>
                            <Button
                              onClick={() => handleRemoveShortListedCity(city.id)}
                              className="btn btn-remove" variant="danger"
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
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