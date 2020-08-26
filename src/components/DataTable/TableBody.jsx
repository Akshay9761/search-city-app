import React from 'react';
import Button from 'react-bootstrap/Button'

function TableBody({ citiesData, 
  removeActionVisible, 
  shortListActionVisible,
  handleRemoveCity,
  handleShortListCity=undefined
}) {

  function actions (id, shortlist) {
    return (
      <>
        {
          shortListActionVisible &&
          <Button
            className="btn btn-shortlist"
            variant="info"
            disabled={shortlist}
            style={shortlist ? { cursor: 'not-allowed' } : null}
            onClick={() => handleShortListCity(id)}
          >
            Shortlist
          </Button>
        }
        {
          removeActionVisible &&
          <Button
            onClick={() => handleRemoveCity(id)}
            className="btn btn-remove" variant="danger"
          >
            {
              handleShortListCity ?
              'Delete' : 'Remove'
            }
          </Button>
        }
      </>
    )
  };

  return (
    <tbody>
      {citiesData.map(city => (
        <tr key={city.id}>
          <td>{city.State}</td>
          <td>{city.District}</td>
          <td>{city.City}</td>
          <td>
            {actions(city.id, city.shortlist)}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;