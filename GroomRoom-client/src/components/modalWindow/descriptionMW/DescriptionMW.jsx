import React from "react";
import styles from "./DescriptionMW.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  descriptionModalState,
  setDescMWActive,
} from "../../store/DescriptionMWSlice";
import { IconButton, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

const DescriptionMW = () => {
  const dispatch = useDispatch();
  const { isDescMWActive, description, name, link } = useSelector(
    descriptionModalState
  );

  return (
    <div
      className={isDescMWActive ? styles.modalActive : styles.modal}
      onClick={() => dispatch(setDescMWActive(false))}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.name}>
          <Typography variant="h5">{name}</Typography>
        </div>
        <div className={styles.description}>{description}</div>
        {link && (
          <IconButton
            className={styles.link}
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            <LinkIcon fontSize="large" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default DescriptionMW;
