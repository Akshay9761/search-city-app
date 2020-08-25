import React from 'react';

const DataTableHeader = ({ headers }) => {
  return (
    <thead>
      <tr>
        {
          headers && headers.length && headers.map(header => {
            return (
              <th key={header.name}>{header.field}</th>
            )
          })
        }
      </tr>
    </thead>
  );
}

export default DataTableHeader;