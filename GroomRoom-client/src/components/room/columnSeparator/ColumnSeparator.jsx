import React from "react";
import { useSelector } from "react-redux";
import { authState } from "../../store/AuthSlice";
import { columnsState } from "../../store/ColumnsSlice";
import InProgress from "./InProgress/InProgress";
import LeftColumn from "./leftColumn/LeftColumn";
import RightColumn from "./rightColumn/RightColumn";

const ColumnSeparator = ({ provided, snapshot, column, name }) => {
  const { adminId } = useSelector(columnsState);
  const { user } = useSelector(authState);

  return (
    <div>
      {column.name === "In Progress" ? (
        <InProgress
          provided={provided}
          snapshot={snapshot}
          column={column}
          name={name}
        />
      ) : column.name === "To do" ? (
        <LeftColumn
          provided={adminId === user.id ? provided : {}}
          snapshot={snapshot}
          column={column}
          name={name}
        />
      ) : (
        <RightColumn
          provided={adminId === user.id ? provided : {}}
          snapshot={snapshot}
          column={column}
          name={name}
        />
      )}
    </div>
  );
};

export default ColumnSeparator;
