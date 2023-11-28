import React from 'react'
import styles from '@/styles/adminDashboardContent.module.css'
import Link from 'next/link'

function CounterCard({ to, color, icon, totalText, totalNo }) {
    return (
        <Link href={to} className={styles.card} style={{ background: `${color}` }}>
            <div className={styles.icon_Container}>
                {icon}
            </div>
            <div className={styles.totalTextContainer}>
                <p className={styles.totalText}>Total {totalText}</p>
                <p className={styles.totalNumber}>{totalNo}</p>
            </div>
        </Link>
    )
}

export default CounterCard