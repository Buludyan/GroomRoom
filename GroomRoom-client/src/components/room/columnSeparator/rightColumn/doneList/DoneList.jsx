import React from 'react';
import styles from './DoneList.module.scss'
import { Draggable } from "react-beautiful-dnd";
import DragCard from '../../../../cards/dragCard/DragCard';

const DoneList = ({ provided, column }) => {

    return (
        <div
            className={styles.column}
            {...provided.droppableProps}
            ref={provided.innerRef}
        >
            {column.items.map((item, index) => {
                return (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                    >
                        {(provided, snapshot) => {
                            return (
                                <DragCard
                                    provided={provided}
                                    snapshot={snapshot}
                                    column={column}
                                    item={item}
                                />
                            );
                        }}
                    </Draggable>
                );
            })}
            {provided.placeholder}
        </div>
    )
}

export default DoneList;