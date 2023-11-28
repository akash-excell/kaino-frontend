import React from 'react'
import styles from '@/styles/adminSchoolByCountry.module.css'
import styles_new from '@/styles/adminLessions.module.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { schoolStudentRequest, schoolStudentReset } from '@/redux/slices/school/schoolStudent';
import { Button } from '@mui/material';
import { Select } from 'antd';
import StudentsList from '@/Component/admin/Table/StudentsList';
import { FaFemale, FaMale } from 'react-icons/fa';
import Link from 'next/link';
import { MdFireplace } from 'react-icons/md';

const SchoolStudentsByGender = ({ Class }) => {

    const schoolStudentState = useSelector(state => state.schoolStudent)
    const [pageSize, setPageSize] = useState(10)
    const [response, setResponse] = useState({})
    const [data, setData] = useState([])

    useEffect(() => {
        if (Class)
            dispatch(schoolStudentRequest(`class=${Class}&page_size=${pageSize}`))
    }, [pageSize, Class])

    useEffect(() => {
        if (schoolStudentState.isSuccess) {
            setResponse(schoolStudentState.data?.data)
            setData(schoolStudentState.data?.data?.results)
            dispatch(schoolStudentReset())
        }
    }, [schoolStudentState.isSuccess])

    const handlePagination = (requestUrl) => {
        dispatch(schoolStudentRequest(`${requestUrl.split('?')[1]}`))
    }


    return (
        <div>
            <div className={styles.cardContainer}>
                <Link style={{ background: "#C6164F" }} href={`/dashboard/school/all-students?Class=${Class}`} className={styles.card}>
                    <div className={styles.iconContainer}>
                        <MdFireplace size={'2.5rem'} color='#C6164F' />
                    </div>
                    <div>
                        <p style={{ fontWeight: '500', fontSize: "1.2rem" }}>Total</p>
                        <p style={{ fontWeight: '700', fontSize: "2.2rem" }}>
                            {data.length}
                        </p>
                    </div>
                </Link>

                <Link style={{ background: "#C6164F" }} href={`/dashboard/school/all-students?Class=${Class}&Gender=${1}`} className={styles.card}>
                    <div className={styles.iconContainer}>
                        <FaMale size={'2.5rem'} color='#C6164F' />
                    </div>
                    <div>
                        <p style={{ fontWeight: '500', fontSize: "1.2rem" }}>Male</p>
                        <p style={{ fontWeight: '700', fontSize: "2.2rem" }}>
                            {
                                data.filter(item => item?.user?.gender === 1).length
                            }
                        </p>
                    </div>
                </Link>

                <Link style={{ background: "#C6164F" }} href={`/dashboard/school/all-students?Class=${Class}&Gender=${2}`} className={styles.card}>
                    <div className={styles.iconContainer}>
                        <FaFemale size={'2.5rem'} color='#C6164F' />
                    </div>
                    <div>
                        <p style={{ fontWeight: '500', fontSize: "1.2rem" }}>Female</p>
                        <p style={{ fontWeight: '700', fontSize: "2.2rem" }}>

                            {
                                data.filter(item => item?.user?.gender === 2).length
                            }

                        </p>
                    </div>
                </Link>

            </div>

            <div className={styles.tableContainer}>
                <p className={styles.topSchools_text}>Top Students</p>
                <div className={styles_new.pagination}>
                    <span>Show</span>
                    <Select
                        defaultValue={pageSize}
                        style={{ width: 80 }}
                        options={[
                            { value: 10, label: '10' },
                            { value: 25, label: '20' },
                            { value: 50, label: '50' },
                        ]}
                        onChange={(values => setPageSize(values))}
                    />
                    <span>entries</span>
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                    <StudentsList data={data} />
                </div>
                <div className={styles_new.bottom_Pagination}>
                    <p>Showing {response ? 1 : 0} to {response?.count || 0} of {response?.count || 0} entries</p>
                    <div>
                        <Button disabled={!response.previous} variant="outlined" size="medium" onClick={() => handlePagination(response.previous)}>Previous</Button>
                        <Button variant="contained" size="medium">1</Button>
                        <Button disabled={!response.next} variant="outlined" size="medium" onClick={() => handlePagination(response.next)}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SchoolStudentsByGender
