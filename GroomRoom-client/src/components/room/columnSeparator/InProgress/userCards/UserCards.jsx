import React from 'react';
import { useSelector } from 'react-redux';
import styles from './UserCards.module.scss';
import UserCard from "./userCard/UserCard";
import { columnsState } from "../../../../store/ColumnsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const UserCards = () => {

    const { users, isMobile } = useSelector(columnsState);

    return (
        <div className={styles.userCardsBlock}>
            {isMobile ?
                <Swiper
                    slidesPerView={1}
                    spaceBetween={5}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className={styles.mySwiper}
                >
                    {users.map((cardUser, idx) => {
                        return (
                            <SwiperSlide key={idx} className='slide'>
                                <UserCard
                                    cardUser={cardUser}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                :
                <div className={styles.firstRow}>
                    {users.map(((cardUser, idx) => {
                        return (
                            <UserCard
                                key={idx}
                                cardUser={cardUser}
                            />)
                    }))}
                </div>
            }
        </div>
    )
}

export default UserCards