import React from 'react'
import styles from '@/styles/adminSchoolByCountry.module.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { getAllOrgnizationsRequest, getAllOrgnizationsReset } from '@/redux/slices/admin/getAllOrgnizations';
import { Button } from 'antd'
import { flagLink } from '@/utils/constant';
import CountryCommonard from '@/Component/Generic/CountryCommonard';
import OrganizationList from '../../Table/OrganizationList';

const AdminAllOrganizationsContent = () => {

    const getAllOrgnizationsState = useSelector(state => state.getAllOrgnizations)

    const [response, setResponse] = useState({})
    const [data, setData] = useState([])

    useEffect(() => {
        dispatch(getAllOrgnizationsRequest())
    }, [])

    useEffect(() => {
        if (getAllOrgnizationsState.isSuccess) {
            setResponse(getAllOrgnizationsState.data?.data)
            setData(getAllOrgnizationsState.data?.data?.results)
            dispatch(getAllOrgnizationsReset())
        }
    }, [getAllOrgnizationsState.isSuccess])

    const handlePagination = (requestUrl) => {
        dispatch(getAllOrgnizationsRequest(`?${requestUrl.split('?')[1]}`))
    }

    const getCount = (name) => {
        const count = data?.filter(item => item.country === name).length
        return count
    }

    return (
        <div>
            <div className={styles.countryCardContainer}>
                <CountryCommonard
                    type={'Organizations'}
                    color={'#2896A0'}
                    link={flagLink.tanzania}
                    count={getCount('Tanzania')}
                    country={'Tanzania'}
                />
                <CountryCommonard
                    type={'Organizations'}
                    color={'#2896A0'}
                    link={flagLink.s_africa}
                    count={getCount('S. Africa')}
                    country={'S. Africa'}
                />
                <CountryCommonard
                    type={'Organizations'}
                    color={'#2896A0'}
                    link={flagLink.s_sudan}
                    count={getCount('S. Sudan')}
                    country={'S. Sudan'}
                />
                <CountryCommonard
                    type={'Organizations'}
                    color={'#2896A0'}
                    link={flagLink.rwanda}
                    count={getCount('Rwanda')}
                    country={'Rwanda'}
                />
                <CountryCommonard
                    type={'Organizations'}
                    color={'#2896A0'}
                    link={flagLink.kenya}
                    count={getCount('Kenya')}
                    country={'Kenya'}
                />
                <CountryCommonard
                    type={'Organizations'}
                    color={'#2896A0'}
                    link={flagLink.uganda}
                    count={getCount('Uganda')}
                    country={'Uganda'}
                />
                <CountryCommonard
                    type={'Organizations'}
                    color={'#2896A0'}
                    link={flagLink.ghana}
                    count={getCount('Ghana')}
                    country={'Ghana'}
                />
                <CountryCommonard
                    type={'Organizations'}
                    color={'#2896A0'}
                    link={flagLink.nigeria}
                    count={getCount('Nigeria')}
                    country={'Nigeria'}
                />
            </div>
            <div className={styles.tableContainer}>
                <p className={styles.topSchools_text}>Top Organizations</p>
                <div style={{ marginTop: "1.5rem" }}>
                    <OrganizationList data={data} />
                    <div className={styles.flexButton}>
                        <Button type="primary" disabled={!response?.previous} onClick={() => handlePagination(response.previous)}>Prev</Button>
                        <Button type="primary" disabled={!response?.next} onClick={() => handlePagination(response.next)}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAllOrganizationsContent
