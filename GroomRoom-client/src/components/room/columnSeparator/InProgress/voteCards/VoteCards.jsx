import React from 'react';
import { useSelector } from 'react-redux';
import { columnsState } from '../../../../store/ColumnsSlice';
import VoteCard from './voteCard/VoteCard';
import styles from './VoteCards.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const VoteCards = ({ onVote }) => {

    const { voteValues, isMobile } = useSelector(columnsState);

    return (
        <div className={styles.voteCardsBlock}>
            {isMobile ?
                <Swiper
                    slidesPerView={3}
                    spaceBetween={5}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className={styles.mySwiper}

                >
                    {voteValues.map((value, idx) => {
                        return (
                            <SwiperSlide key={idx}>
                                <VoteCard
                                    onVote={onVote}
                                    value={value}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                :
                <div className={styles.voteCards}>
                    {voteValues.map((value, idx) => {
                        return (
                            <VoteCard
                                onVote={onVote}
                                value={value}
                                key={idx}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default VoteCards;