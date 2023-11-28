import React from 'react'
import styles from '@/styles/adminSchoolByCountry.module.css'
import { FaRegBuilding } from 'react-icons/fa'
import { SlGraduation } from 'react-icons/sl'
import { AiOutlineHeart } from 'react-icons/ai'
import SchoolsList from '../../Table/SchoolsList'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { getAllSchoolsRequest, getAllSchoolsReset } from '@/redux/slices/admin/getAllSchools';
import { Button } from 'antd'
import Link from 'next/link'

const AdminSchoolByCountryContent = ({ country }) => {

    const getAllSchoolsState = useSelector(state => state.getAllSchools)

    const [response, setResponse] = useState({})
    const [data, setData] = useState([])

    useEffect(() => {
        if (country) {
            const payload = `?country=${country.toString()}`
            dispatch(getAllSchoolsRequest(payload))
        }
    }, [country])

    useEffect(() => {
        if (getAllSchoolsState.isSuccess) {
            setResponse(getAllSchoolsState.data?.data)
            setData(getAllSchoolsState.data?.data?.results)
            dispatch(getAllSchoolsReset())
        }
    }, [getAllSchoolsState.isSuccess])

    const handlePagination = (requestUrl) => {
        dispatch(getAllSchoolsRequest(`?${requestUrl.split('?')[1]}`))
    }

    return (
        <div>
            <div className={styles.cardContainer}>
                <Link href={`/dashboard/admin/school-by-country-plans?country=${country}&plans=KAINO_PLUS`} className={styles.card}>
                    <div className={styles.iconContainer}>
                        <FaRegBuilding size={'2.5rem'} color='#9E4EE0' />
                    </div>
                    <div>
                        <p style={{ fontWeight: '500', fontSize: "1.2rem" }}>KAINO PLUS</p>
                        <p style={{ fontWeight: '700', fontSize: "2.2rem" }}>
                            {
                                data.filter(item => item.subscriptions === 'KAINO_PLUS').length
                            }
                        </p>
                    </div>
                </Link>
                <Link href={`/dashboard/admin/school-by-country-plans?country=${country}&plans=KAINO_BASIC`} className={styles.card}>
                    <div className={styles.iconContainer}>
                        <SlGraduation size={'2.5rem'} color='#9E4EE0' />
                    </div>
                    <div>
                        <p style={{ fontWeight: '500', fontSize: "1.2rem" }}>KAINO BASIC</p>
                        <p style={{ fontWeight: '700', fontSize: "2.2rem" }}>
                            {
                                data.filter(item => item.subscriptions === 'KAINO_BASIC').length
                            }
                        </p>
                    </div>
                </Link>
                <Link href={`/dashboard/admin/school-by-country-plans?country=${country}&plans=KAINO_SOCIAL`} className={styles.card}>
                    <div className={styles.iconContainer}>
                        <AiOutlineHeart size={'2.5rem'} color='#9E4EE0' />
                    </div>
                    <div>
                        <p style={{ fontWeight: '500', fontSize: "1.2rem" }}>KAINO SOCIAL</p>
                        <p style={{ fontWeight: '700', fontSize: "2.2rem" }}>
                            {
                                data.filter(item => item.subscriptions === 'KAINO_SOCIAL').length
                            }
                        </p>
                    </div>
                </Link>
            </div>
            <div className={styles.tableContainer}>
                <p className={styles.topSchools_text}>Top Schools</p>
                <div style={{ marginTop: "1.5rem" }}>
                    <SchoolsList data={data} />
                    <div className={styles.flexButton}>
                        <Button type="primary" disabled={!response?.previous} onClick={() => handlePagination(response.previous)}>Prev</Button>
                        <Button type="primary" disabled={!response?.next} onClick={() => handlePagination(response.next)}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSchoolByCountryContent
