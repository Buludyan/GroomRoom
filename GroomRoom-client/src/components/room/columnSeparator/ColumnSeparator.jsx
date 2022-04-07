import React from 'react';
import InProgress from './InProgress/InProgress';
import LeftColumn from './leftColumn/LeftColumn';
import RightColumn from './rightColumn/RightColumn';


const ColumnSeparator = ({ provided, snapshot, column, name }) => {

  return (
    <div>
      {column.name === 'In Progress' ?
        <InProgress
          provided={provided}
          snapshot={snapshot}
          column={column}
          name={name}
        />
        : column.name === 'To do' ?
          <LeftColumn
            provided={provided}
            snapshot={snapshot}
            column={column}
            name={name}
          />
          :
          <RightColumn
            provided={provided}
            snapshot={snapshot}
            column={column}
            name={name}
          />
      }
    </div>
  )
}

export default ColumnSeparator;