import React from 'react';
import DoneColumn from '../../columnType/doneColumn/DoneColumn';
import InProgressColumn from '../../columnType/inProgressColumn/InProgressColumn';
import LeftColumn from '../../leftColumn/LeftColumn';


const Column = ({ provided,
  snapshot,
  column,
  name
}) => {

  return (
    <div>
      {column.name === 'In Progress' ?
        <InProgressColumn
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
          <DoneColumn
            provided={provided}
            snapshot={snapshot}
            column={column}
            name={name}
          />
      }
    </div>
  )
}

export default Column;