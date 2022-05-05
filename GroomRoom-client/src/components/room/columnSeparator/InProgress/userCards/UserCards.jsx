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

    const us = [{email: "omoemon97@gmail.com",
    id: "625fedcc8fbbf93192b933ba",
    isActivated: true,
    name: "Арман",
    surname: "Булудян",
    voteState: {value: 0}}, 
    {email: "omoemon97@gmail.com",
    id: "625fedcc8fbbf93192b933ba",
    isActivated: true,
    name: "Арман",
    surname: "Булудян",
    voteState: {value: 0}}, 
    {email: "omoemon97@gmail.com",
    id: "625fedcc8fbbf93192b933ba",
    isActivated: true,
    name: "Арман",
    surname: "Булудян",
    voteState: {value: 0}},
    {email: "omoemon97@gmail.com",
    id: "625fedcc8fbbf93192b933ba",
    isActivated: true,
    name: "Арман",
    surname: "Булудян",
    voteState: {value: 0}}]

    return (
        <div className={styles.userCardsBlock}>
            {isMobile && us.length > 3 ?
                <Swiper
                    slidesPerView={3}
                    spaceBetween={25}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className={styles.mySwiper}
                >
                    {us.map((cardUser, idx) => {
                        return (
                            <SwiperSlide key={idx}>
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