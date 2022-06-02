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

    const us = [{
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "1",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "2",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "3",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "4",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "5",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "6",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "7",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "8",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "9",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "10",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "11",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "12",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "13",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "14",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "15",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "16",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "17",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "18",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "19",
        surname: "Булудян",
        voteState: { value: 0 }
    },
    {
        email: "omoemon97@gmail.com",
        id: "625fedcc8fbbf93192b933ba",
        isActivated: true,
        name: "20",
        surname: "Булудян",
        voteState: { value: 0 }
    }]

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
                <div className={styles.rows}>
                    <div className={styles.firstRow}>
                        {[...us.slice(0, 10)].map(((cardUser, idx) => {
                            return (
                                <UserCard
                                    key={idx}
                                    cardUser={cardUser}
                                />)
                        }))}
                    </div>
                    <div className={styles.secondRow}>
                        {us.length > 10 && [...us.splice(10)].map(((cardUser, idx) => {
                            return (
                                <UserCard
                                    key={idx}
                                    cardUser={cardUser}
                                />)
                        }))}
                    </div>
                </div>
            }
        </div>
    )
}

export default UserCards