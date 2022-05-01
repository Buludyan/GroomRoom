import React from 'react';
import styles from './DescriptionMW.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { descriptionModalState, setDescMWActive } from '../../store/DescriptionMWSlice';

const DescriptionMW = () => {

    const dispatch = useDispatch();
    const { isDescMWActive, description } = useSelector(descriptionModalState);

    return (
        <div
            className={isDescMWActive
                ? styles.modalActive
                : styles.modal}
            onClick={() => dispatch(setDescMWActive(false))}
        >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.description}>
                    {description}
                </div>
            </div>
        </div>
    )
}

export default DescriptionMW