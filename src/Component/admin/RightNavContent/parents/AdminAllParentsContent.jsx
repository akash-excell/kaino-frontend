import React from 'react'
import styles from '@/styles/adminSchoolByCountry.module.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { getAllParentsRequest, getAllParentsReset } from '@/redux/slices/admin/getAllParents';
import { Button } from 'antd'
import { flagLink } from '@/utils/constant';
import CountryCommonard from '@/Component/Generic/CountryCommonard';
import ParentsList from '../../Table/ParentsList';

const AdminAllParentsContent = () => {

    const getAllParentsState = useSelector(state => state.getAllParents)

    const [response, setResponse] = useState({})
    const [data, setData] = useState([])

    useEffect(() => {
        dispatch(getAllParentsRequest())
    }, [])

    useEffect(() => {
        if (getAllParentsState.isSuccess) {
            setResponse(getAllParentsState.data?.data)
            setData(getAllParentsState.data?.data?.results)
            dispatch(getAllParentsReset())
        }
    }, [getAllParentsState.isSuccess])

    const handlePagination = (requestUrl) => {
        dispatch(getAllParentsRequest(`?${requestUrl.split('?')[1]}`))
    }

    const getCount = (name) => {
        const count = data?.filter(item => item.country === name).length
        return count
    }

    return (
        <div>
            <div className={styles.countryCardContainer}>
                <CountryCommonard
                    type={'Parents'}
                    color={'#4EAF96'}
                    link={flagLink.tanzania}
                    count={getCount('Tanzania')}
                    country={'Tanzania'}
                />
                <CountryCommonard
                    type={'Parents'}
                    color={'#4EAF96'}
                    link={flagLink.s_africa}
                    count={getCount('S. Africa')}
                    country={'S. Africa'}
                />
                <CountryCommonard
                    type={'Parents'}
                    color={'#4EAF96'}
                    link={flagLink.s_sudan}
                    count={getCount('S. Sudan')}
                    country={'S. Sudan'}
                />
                <CountryCommonard
                    type={'Parents'}
                    color={'#4EAF96'}
                    link={flagLink.rwanda}
                    count={getCount('Rwanda')}
                    country={'Rwanda'}
                />
                <CountryCommonard
                    type={'Parents'}
                    color={'#4EAF96'}
                    link={flagLink.kenya}
                    count={getCount('Kenya')}
                    country={'Kenya'}
                />
                <CountryCommonard
                    type={'Parents'}
                    color={'#4EAF96'}
                    link={flagLink.uganda}
                    count={getCount('Uganda')}
                    country={'Uganda'}
                />
                <CountryCommonard
                    type={'Parents'}
                    color={'#4EAF96'}
                    link={flagLink.ghana}
                    count={getCount('Ghana')}
                    country={'Ghana'}
                />
                <CountryCommonard
                    type={'Schools'}
                    color={'#4EAF96'}
                    link={flagLink.nigeria}
                    count={getCount('Nigeria')}
                    country={'Nigeria'}
                />
            </div>
            <div className={styles.tableContainer}>
                <p className={styles.topSchools_text}>Top Parents</p>
                <div style={{ marginTop: "1.5rem" }}>
                    <ParentsList data={data} />
                    <div className={styles.flexButton}>
                        <Button type="primary" disabled={!response?.previous} onClick={() => handlePagination(response.previous)}>Prev</Button>
                        <Button type="primary" disabled={!response?.next} onClick={() => handlePagination(response.next)}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAllParentsContent
