import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { schoolStudentRequest, schoolStudentReset } from '@/redux/slices/school/schoolStudent';
import Link from 'next/link';
import styles from '@/styles/adminDashboardContent.module.css'
import styles_new from '@/styles/classes.module.css'
import { Box } from '@mui/material';

const SchoolStudentCardContent = () => {

    const schoolStudentState = useSelector(state => state.schoolStudent)
    const [data, setData] = useState({})

    useEffect(() => {
        dispatch(schoolStudentRequest())
    }, [])

    useEffect(() => {
        if (schoolStudentState.isSuccess) {
            const flag = schoolStudentState.data?.data?.results
            const countData = {}

            flag?.map(item => {
                if (!countData[item?._class])
                    countData[item?._class] = 0
                countData[item?._class] = countData[item?._class] + 1
            })

            setData(countData)
            dispatch(schoolStudentReset())
        }
    }, [schoolStudentState.isSuccess])

    return (
        <div className={styles_new.classes_card_container}>
            {
                Object.keys(data).map((item, i) => <Link key={i} href={`/dashboard/school/students-by-gender?Class=${item}`} className={styles.card} style={{ background: "#C6164F" }}>
                    <div className={styles.icon_Container}>
                        <p style={{ fontSize: '2rem', color: "#C6164F" }}>{item}</p>
                    </div>
                    <Box className={styles.totalTextContainer} sx={{ gap: '4px!important' }}>
                        <p className={styles.totalText}>Total Students</p>
                        <p className={styles.totalNumber}>{data[item]}</p>
                    </Box>
                </Link>)
            }
        </div>
    )
}

export default SchoolStudentCardContent
