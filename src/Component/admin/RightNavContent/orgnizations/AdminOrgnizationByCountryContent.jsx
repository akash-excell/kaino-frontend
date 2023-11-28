import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { getAllOrgnizationsRequest, getAllOrgnizationsReset } from '@/redux/slices/admin/getAllOrgnizations';
import styles from '@/styles/adminOrgnizations.module.css'
import Link from 'next/link';

const AdminOrgnizationByCountryContent = ({ country }) => {

    const getAllOrgnizationsState = useSelector(state => state.getAllOrgnizations)
    const [data, setData] = useState([])

    useEffect(() => {
        if (country) {
            const payload = `?country=${country.toString()}`
            dispatch(getAllOrgnizationsRequest(payload))
        }

    }, [country])

    useEffect(() => {
        if (getAllOrgnizationsState.isSuccess) {
            setData(getAllOrgnizationsState.data?.data?.results)
            dispatch(getAllOrgnizationsReset())
        }
    }, [getAllOrgnizationsState.isSuccess])

    return (
        <div className={styles.card_Grid}>
            {
                data.map((item, i) => <Link href={`/dashboard/admin/schools-by-orgnization/${item.name}`} key={i} className={styles.card}>
                    <div>
                        <img src={item.logo || 'https://placehold.co/120x80'} alt="logo" />
                        <p className={styles.schoolTitle}>Total Schools: <span>{item.school}</span></p>
                    </div>
                </Link>)
            }
        </div>
    )
}

export default AdminOrgnizationByCountryContent
