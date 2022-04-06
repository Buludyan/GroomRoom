import React from 'react';
import styles from './TodoList.module.scss'
import { Draggable } from "react-beautiful-dnd";
import Card from '../../../../card/Card';

const TodoList = ({ provided, column }) => {

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
                                <Card
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

export default TodoList;