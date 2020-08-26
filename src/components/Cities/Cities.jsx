import React, { useEffect, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { headers } from '../../common/Js/constant';
import debounce from '../../common/Js/debounce';
import { TableHeader, TableBody } from '../DataTable'
import AddNewCity from './AddNewCity';
import { loadAllCities, removeCity, 
  shortListCity, toggleModal } from '../../redux/actions/citiesActions';

function Cities({
  loadAllCities,
  allCities,
  loading,
  currentPage,
  totalCities,
  search,
  removeCity,
  shortListCity,
  showModal,
  toggleModal
}) {

  useEffect(() => {
    if (allCities && allCities.length === 0) {
      loadAllCities();
    }
  }, [])

  const handleShortListCity = debounce((cityId) => {
    shortListCity(cityId)
  }, 500)

  const handleRemoveCity = debounce((cityId) => {
    removeCity(cityId)
  }, 500);

  const citiesData = useMemo(() => totalCities,
    [totalCities, currentPage, search]);

  return (
    <>
      {
        loading ?
          <Spinner className="loader" animation="border" variant="info" />
          : <div className="container-fluid">
            <div className="row">
              <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                onHide={() => toggleModal(false)}
              >
                <AddNewCity />
              </Modal>
            </div>
            <div className="row new-city-btn">
              <div className="col">
                <Button variant="info" onClick={() => toggleModal(true)}>New City</Button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col mb-3">
                <Table bordered responsive="sm" hover variant="dark">
                  <TableHeader headers={headers} />
                  <TableBody 
                    citiesData={citiesData} 
                    removeActionVisible={true} 
                    shortListActionVisible={true}
                    handleRemoveCity={handleRemoveCity}
                    handleShortListCity={handleShortListCity}
                  />
                </Table>
              </div>
            </div>
          </div>
      }
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    allCities: state.allCities.allCities,
    loading: state.apiCallsInProgress > 0,
    totalCities: state.allCities.totalCities,
    currentPage: state.allCities.currentPage,
    search: state.allCities.search,
    showModal: state.allCities.showModal
  }
}

const mapDispatchToProps = {
  loadAllCities,
  removeCity,
  shortListCity,
  toggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);