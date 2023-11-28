import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { getParentCountRequest, getParentCountReset } from '@/redux/slices/school/getParentCount';
import Link from 'next/link';
import styles from '@/styles/adminDashboardContent.module.css'
import styles_new from '@/styles/classes.module.css'
import { Box } from '@mui/material';

const SchoolParentCard = () => {

    const getParentCountState = useSelector(state => state.getParentCount)
    const [data, setData] = useState({})

    useEffect(() => {
        dispatch(getParentCountRequest())
    }, [])

    useEffect(() => {
        if (getParentCountState.isSuccess) {
            setData(getParentCountState.data?.data)
            dispatch(getParentCountReset())
        }
    }, [getParentCountState.isSuccess])

    return (
        <div className={styles_new.classes_card_container}>
            {
                Object.keys(data).map((item, i) => <Link key={i} href={`/dashboard/school/all-parents?Class=${item}`} className={styles.card} style={{ background: "#4EAF96" }}>
                    <div className={styles.icon_Container}>
                        <p style={{ fontSize: '2rem', color: "#4EAF96" }}>{item}</p>
                    </div>
                    <Box className={styles.totalTextContainer} sx={{ gap: '4px!important' }}>
                        <p className={styles.totalText}>Total Parents</p>
                        <p className={styles.totalNumber}>{data[item]}</p>
                    </Box>
                </Link>)
            }
        </div>
    )
}

export default SchoolParentCard
