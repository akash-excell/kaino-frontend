import React from 'react'
import styles from '@/styles/adminDashboardContent.module.css'
import Link from 'next/link'
import { TiTickOutline } from 'react-icons/ti'
import { Box } from '@mui/material'

const ClassesCard = ({ item }) => {
    return (
        <Link href={`/dashboard/school/all-students?Class=${item?._class}`} className={styles.card} style={{ background: "#9E4EE0" }}>
            <div className={styles.icon_Container}>
                <TiTickOutline size={'2.6rem'} color='#9E4EE0' />
            </div>
            <Box className={styles.totalTextContainer} sx={{ gap: '4px!important' }}>
                <p className={styles.totalText}>Class</p>
                <p className={styles.totalNumber}>{item?._class}</p>
                <p className={styles.totalText}>Class Teacher: {item?.class_teacher}</p>
            </Box>
        </Link>
    )
}

export default ClassesCard
