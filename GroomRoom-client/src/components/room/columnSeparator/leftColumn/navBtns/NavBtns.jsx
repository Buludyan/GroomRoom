import React from 'react';
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useDispatch } from 'react-redux';
import { setIsActiveAdd } from '../../../../store/AddEditMWSlice';
import styles from './NavBtns.module.scss'
import { setActive, setData } from '../../../../store/DeleteMWSlice';

const NavBtns = ({ column }) => {

    const dispatch = useDispatch();

    const onDeleteAllItems = () => {
        dispatch(setActive({ isActive: true, isAllDelete: true }));
        dispatch(setData({ column, item: null }));
    }

    return (
        <div className={styles.navBtns}>
            <div>
                <IconButton
                    onClick={() => dispatch(setIsActiveAdd())}
                >
                    <AddCircleOutlineIcon
                        sx={{ fontSize: 33 }}
                    />
                </IconButton>
            </div>
            <IconButton
                onClick={onDeleteAllItems}
            >
                <DeleteSweepIcon
                    sx={{ fontSize: 33 }}
                />
            </IconButton>
        </div>
    )
}

export default NavBtns;