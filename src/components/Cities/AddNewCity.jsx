import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { toggleModal, addNewCity } from '../../redux/actions/citiesActions';
import create_UUID from '../../common/Js/uuid';

function AddNewCity({
  stateDistrict,
  toggleModal,
  addNewCity,
  totalItems
}) {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [districtArr, setDistrictArr] = useState([]);
  const [error, setError] = useState({});

  const validateFields = () => {
    let errorKeys = {};
    errorKeys.city = city ? '' : 'Please Enter City';
    errorKeys.state = state ? '' : 'Please Select State';
    errorKeys.district = district ? '' : 'Please Select District';
    let errorExist = Object.values(errorKeys).every(err => {
      return !err
    })
    if (!errorExist) setError(errorKeys)
    return errorExist;
  }

  const handleAddSubmit = () => {
    if (validateFields()) {
      toggleModal(false);
      let newCity = {
        id: create_UUID() + totalItems,
        City: city,
        State: state,
        District: district
      }
      addNewCity(newCity);
    }
  }
  
  const handleInputChangeState = (state) => {
    setState(state);
    setDistrictArr(stateDistrict[state]);
    Object.keys(error).length && setError({...error, state: ''})
  }

  const handleInputChangeDistrict = (district) => {
    setDistrict(district);
    Object.keys(error).length && setError({...error, district: ''})
  }

  const handleInputCity = (value) => {
    let cityVal = value.trim()
    if (cityVal) {
      setCity(value)
      Object.keys(error).length && setError({...error, city: ''})
    }
  }

  return (
    <div className="container-fluid mt-3">
      <div className="row mt-3">
        <div className="col align-items-center">
          <input
            type="text"
            value={city}
            onChange={(e) => handleInputCity(e.target.value)}
            className="form-control"
            placeholder={"Enter City"}
          />
          {
            error.city && <div style={error.city ? {display: 'block'} : ''} className="invalid-feedback">{error.city}</div>
          }
        </div>
      </div>
      <div className="row mt-3">
        <div className="col align-items-center">
          <select className="form-control" name="state" onChange={(e) => handleInputChangeState(e.target.value)}>
            <option selected disabled>Select State</option>
            {
              Object.keys(stateDistrict).map(state => {
                return <option key={state} value={state}>{state}</option>
              })
            }
          </select>
          {
            error.state && <div style={error.state ? {display: 'block'} : ''} className="invalid-feedback">{error.state}</div>
          }
        </div>
      </div>
      <div className="row mt-3">
        <div className="col align-items-center">
          <select className="form-control" name="district" onChange={(e) => handleInputChangeDistrict(e.target.value)}>
            <option selected>Select District</option>
            {
              districtArr && districtArr.length && districtArr.map(district => {
                return <option key={district} value={district}>{district}</option>
              })
            }
          </select>
          {
            error.district && <div style={error.district ? {display: 'block'} : ''} className="invalid-feedback">{error.district}</div>
          }
        </div>
      </div>
      <div className="row mt-3 mb-3">
        <div className="col text-center">
          <Button 
            variant="info"
            onClick={handleAddSubmit}
          >
            Add City
          </Button>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    stateDistrict: state.allCities.stateDistrict,
    totalItems: state.allCities.totalItems,
  }
}

const mapDispatchToProps = {
  toggleModal,
  addNewCity
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCity);