import React from 'react';
import styles from './PlaceholderCard.module.scss';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack'

const PlaceholderCard = ({ snapshot }) => {
    return (
        <div className={styles.placeholderCard}>
            {
                snapshot.isDraggingOver
                &&
                <Stack spacing={1} className={styles.placeholderCard__skeleton}>
                    <Skeleton variant="rectangular" width='45vw' height='6vh' />
                    <Skeleton
                        variant="rectangular"
                        width='40vw'
                        height='27vh'
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}
                        className={styles.placeholderCard__desc}
                    >
                        Drop card here
                    </Skeleton>
                    <Skeleton
                        variant="circular"
                        width={40} height={40}
                        sx={{ position: 'relative', right: '-48%' }}
                    />
                </Stack>
            }
        </div>
    )
}

export default PlaceholderCard