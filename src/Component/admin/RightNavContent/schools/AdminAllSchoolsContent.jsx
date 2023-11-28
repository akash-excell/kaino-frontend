import React from 'react'
import styles from '@/styles/adminSchoolByCountry.module.css'
import SchoolsList from '../../Table/SchoolsList'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { getAllSchoolsRequest, getAllSchoolsReset } from '@/redux/slices/admin/getAllSchools';
import { Button } from 'antd'
import { flagLink } from '@/utils/constant';
import CountryCommonard from '@/Component/Generic/CountryCommonard';

const AdminAllSchoolsContent = () => {

    const getAllSchoolsState = useSelector(state => state.getAllSchools)

    const [response, setResponse] = useState({})
    const [data, setData] = useState([])

    useEffect(() => {
        dispatch(getAllSchoolsRequest())
    }, [])

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

    const getCount = (name) => {
        const count = data?.filter(item => item.country === name).length
        return count
    }

    return (
        <div>
            <div className={styles.countryCardContainer}>
                <CountryCommonard
                    type={'Schools'}
                    color={'#9E4EE0'}
                    link={flagLink.tanzania}
                    count={getCount('Tanzania')}
                    country={'Tanzania'}
                />
                <CountryCommonard
                    type={'Schools'}
                    color={'#9E4EE0'}
                    link={flagLink.s_africa}
                    count={getCount('S. Africa')}
                    country={'S. Africa'}
                />
                <CountryCommonard
                    type={'Schools'}
                    color={'#9E4EE0'}
                    link={flagLink.s_sudan}
                    count={getCount('S. Sudan')}
                    country={'S. Sudan'}
                />
                <CountryCommonard
                    type={'Schools'}
                    color={'#9E4EE0'}
                    link={flagLink.rwanda}
                    count={getCount('Rwanda')}
                    country={'Rwanda'}
                />
                <CountryCommonard
                    type={'Schools'}
                    color={'#9E4EE0'}
                    link={flagLink.kenya}
                    count={getCount('Kenya')}
                    country={'Kenya'}
                />
                <CountryCommonard
                    type={'Schools'}
                    color={'#9E4EE0'}
                    link={flagLink.uganda}
                    count={getCount('Uganda')}
                    country={'Uganda'}
                />
                <CountryCommonard
                    type={'Schools'}
                    color={'#9E4EE0'}
                    link={flagLink.ghana}
                    count={getCount('Ghana')}
                    country={'Ghana'}
                />
                <CountryCommonard
                    type={'Schools'}
                    color={'#9E4EE0'}
                    link={flagLink.nigeria}
                    count={getCount('Nigeria')}
                    country={'Nigeria'}
                />
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

export default AdminAllSchoolsContent
