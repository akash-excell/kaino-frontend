import React from 'react'
import styles from '@/styles/adminSchoolByCountry.module.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { getAllTeachersRequest, getAllTeachersReset } from '@/redux/slices/admin/getAllTeachers';
import { Button } from 'antd'
import { flagLink } from '@/utils/constant';
import CountryCommonard from '@/Component/Generic/CountryCommonard';
import TeacherList from '../../Table/TeacherList';

const AdminAllTeachersContent = () => {

    const getAllTeachersState = useSelector(state => state.getAllTeachers)

    const [response, setResponse] = useState({})
    const [data, setData] = useState([])

    useEffect(() => {
        dispatch(getAllTeachersRequest())
    }, [])

    useEffect(() => {
        if (getAllTeachersState.isSuccess) {
            setResponse(getAllTeachersState.data?.data)
            setData(getAllTeachersState.data?.data?.results)
            dispatch(getAllTeachersReset())
        }
    }, [getAllTeachersState.isSuccess])

    const handlePagination = (requestUrl) => {
        dispatch(getAllTeachersRequest(`?${requestUrl.split('?')[1]}`))
    }

    const getCount = (name) => {
        const count = data?.filter(item => item.country === name).length
        return count
    }

    return (
        <div>
            <div className={styles.countryCardContainer}>
                <CountryCommonard
                    type={'Teachers'}
                    color={'#EA8858'}
                    link={flagLink.tanzania}
                    count={getCount('Tanzania')}
                    country={'Tanzania'}
                />
                <CountryCommonard
                    type={'Teachers'}
                    color={'#EA8858'}
                    link={flagLink.s_africa}
                    count={getCount('S. Africa')}
                    country={'S. Africa'}
                />
                <CountryCommonard
                    type={'Teachers'}
                    color={'#EA8858'}
                    link={flagLink.s_sudan}
                    count={getCount('S. Sudan')}
                    country={'S. Sudan'}
                />
                <CountryCommonard
                    type={'Teachers'}
                    color={'#EA8858'}
                    link={flagLink.rwanda}
                    count={getCount('Rwanda')}
                    country={'Rwanda'}
                />
                <CountryCommonard
                    type={'Teachers'}
                    color={'#EA8858'}
                    link={flagLink.kenya}
                    count={getCount('Kenya')}
                    country={'Kenya'}
                />
                <CountryCommonard
                    type={'Teachers'}
                    color={'#EA8858'}
                    link={flagLink.uganda}
                    count={getCount('Uganda')}
                    country={'Uganda'}
                />
                <CountryCommonard
                    type={'Teachers'}
                    color={'#EA8858'}
                    link={flagLink.ghana}
                    count={getCount('Ghana')}
                    country={'Ghana'}
                />
                <CountryCommonard
                    type={'Teachers'}
                    color={'#EA8858'}
                    link={flagLink.nigeria}
                    count={getCount('Nigeria')}
                    country={'Nigeria'}
                />
            </div>
            <div className={styles.tableContainer}>
                <p className={styles.topSchools_text}>Top Teachers</p>
                <div style={{ marginTop: "1.5rem" }}>
                    <TeacherList data={data} />
                    <div className={styles.flexButton}>
                        <Button type="primary" disabled={!response?.previous} onClick={() => handlePagination(response.previous)}>Prev</Button>
                        <Button type="primary" disabled={!response?.next} onClick={() => handlePagination(response.next)}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAllTeachersContent
