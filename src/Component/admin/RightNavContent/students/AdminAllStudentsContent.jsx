import React from 'react'
import styles from '@/styles/adminSchoolByCountry.module.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { getAllStudentsRequest, getAllStudentsReset } from '@/redux/slices/admin/getAllStudents';
import { Button } from 'antd'
import { flagLink } from '@/utils/constant';
import CountryCommonard from '@/Component/Generic/CountryCommonard';
import StudentsList from '../../Table/StudentsList';

const AdminAllStudentsContent = () => {

    const getAllStudentsState = useSelector(state => state.getAllStudents)

    const [response, setResponse] = useState({})
    const [data, setData] = useState([])

    useEffect(() => {
        dispatch(getAllStudentsRequest())
    }, [])

    useEffect(() => {
        if (getAllStudentsState.isSuccess) {
            setResponse(getAllStudentsState.data?.data)
            setData(getAllStudentsState.data?.data?.results)
            dispatch(getAllStudentsReset())
        }
    }, [getAllStudentsState.isSuccess])

    const handlePagination = (requestUrl) => {
        dispatch(getAllStudentsRequest(`?${requestUrl.split('?')[1]}`))
    }

    const getCount = (name) => {
        const count = data?.filter(item => item.country === name).length
        return count
    }

    return (
        <div>
            <div className={styles.countryCardContainer}>
                <CountryCommonard
                    type={'Students'}
                    color={'#C6164F'}
                    link={flagLink.tanzania}
                    count={getCount('Tanzania')}
                    country={'Tanzania'}
                />
                <CountryCommonard
                    type={'Students'}
                    color={'#C6164F'}
                    link={flagLink.s_africa}
                    count={getCount('S. Africa')}
                    country={'S. Africa'}
                />
                <CountryCommonard
                    type={'Students'}
                    color={'#C6164F'}
                    link={flagLink.s_sudan}
                    count={getCount('S. Sudan')}
                    country={'S. Sudan'}
                />
                <CountryCommonard
                    type={'Students'}
                    color={'#C6164F'}
                    link={flagLink.rwanda}
                    count={getCount('Rwanda')}
                    country={'Rwanda'}
                />
                <CountryCommonard
                    type={'Students'}
                    color={'#C6164F'}
                    link={flagLink.kenya}
                    count={getCount('Kenya')}
                    country={'Kenya'}
                />
                <CountryCommonard
                    type={'Students'}
                    color={'#C6164F'}
                    link={flagLink.uganda}
                    count={getCount('Uganda')}
                    country={'Uganda'}
                />
                <CountryCommonard
                    type={'Students'}
                    color={'#C6164F'}
                    link={flagLink.ghana}
                    count={getCount('Ghana')}
                    country={'Ghana'}
                />
                <CountryCommonard
                    type={'Schools'}
                    color={'#C6164F'}
                    link={flagLink.nigeria}
                    count={getCount('Nigeria')}
                    country={'Nigeria'}
                />
            </div>
            <div className={styles.tableContainer}>
                <p className={styles.topSchools_text}>Top Students</p>
                <div style={{ marginTop: "1.5rem" }}>
                    <StudentsList data={data} />
                    <div className={styles.flexButton}>
                        <Button type="primary" disabled={!response?.previous} onClick={() => handlePagination(response.previous)}>Prev</Button>
                        <Button type="primary" disabled={!response?.next} onClick={() => handlePagination(response.next)}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAllStudentsContent
