import React from 'react';
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useDispatch } from 'react-redux';
import { setIsActiveAdd } from '../../../../store/AddEditMWSlice';
import styles from './NavBtns.module.scss'

const NavBtns = () => {

    const dispatch = useDispatch();

    return (
        <div className={styles.navBtns}>
            <IconButton
                onClick={() => dispatch(setIsActiveAdd())}
            >
                <AddCircleOutlineIcon
                    sx={{ fontSize: 33 }}
                />
            </IconButton>
            <IconButton>
                <InsertDriveFileIcon
                    sx={{ fontSize: 33 }}
                />
            </IconButton>
            <IconButton>
                <DoubleArrowIcon
                    sx={{ fontSize: 33 }}
                />
            </IconButton>
        </div>
    )
}

export default NavBtns;