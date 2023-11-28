import React from 'react'
import styles from '@/styles/adminSchoolByCountry.module.css'
import styles_new from '@/styles/adminLessions.module.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { schoolTeacherRequest, schoolTeacherReset } from '@/redux/slices/school/schoolTeacher';
import { Button } from '@mui/material';
import { Input, Select } from 'antd';
import { useFormik } from 'formik';
import { RxCross1 } from 'react-icons/rx'
import { arrayObjectFlat, convertToCSV } from '@/utils/constant';
import TeacherList from '@/Component/admin/Table/TeacherList';

const SchoolAllTeachers = () => {

    const schoolTeacherState = useSelector(state => state.schoolTeacher)
    const [pageSize, setPageSize] = useState(10)
    const [response, setResponse] = useState({})
    const [data, setData] = useState([])

    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            phone: ''
        },
        onSubmit: (values) => {
            if (values.id)
                dispatch(schoolTeacherRequest(`pk=${values.id}`))
            else {
                let payload;
                if (values.phone && values.name)
                    payload = `phone=${values.phone}&name=${values.name}`
                else if (values.phone)
                    payload = `phone=${values.phone}`
                else if (values.name)
                    payload = `name=${values.name}`
                dispatch(schoolTeacherRequest(payload))
            }
        },
    });

    useEffect(() => {
        dispatch(schoolTeacherRequest(`page_size=${pageSize}`))
    }, [pageSize])

    useEffect(() => {
        if (schoolTeacherState.isSuccess) {
            setResponse(schoolTeacherState.data?.data)
            setData(schoolTeacherState.data?.data?.results)
            dispatch(schoolTeacherReset())
        }
    }, [schoolTeacherState.isSuccess])

    const handlePagination = (requestUrl) => {
        dispatch(schoolTeacherRequest(`${requestUrl.split('?')[1]}`))
    }

    return (
        <div>
            <div className={styles_new.breadcrumbs}>
                <p className={styles_new.breadcrumbs_left}>Teachers</p>
                <p className={styles_new.breadcrumbs_right}>Dashboard /<span> Teachers</span></p>
            </div>
            <form className={styles_new.form} onSubmit={formik.handleSubmit}>
                <Input
                    type="text"
                    name="id"
                    className={styles_new.form_input}
                    placeholder="Search by ID..."
                    value={formik.values.id}
                    onChange={formik.handleChange}
                />
                <Input
                    type="text"
                    name="name"
                    className={styles_new.form_input}
                    disabled={formik.values.id}
                    placeholder="Search by Name..."
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <Input
                    type="text"
                    name="phone"
                    disabled={formik.values.id}
                    className={styles_new.form_input}
                    placeholder="Search by Mobile..."
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                />
                <Button type="submit" variant="contained" size="large" disabled={!formik.dirty}>
                    Search
                </Button>
            </form>
            <Button variant="contained" size="large" disabled={!formik.dirty} sx={{ background: "red", marginTop: '1rem' }}
                onClick={() => {
                    formik.resetForm()
                    dispatch(schoolTeacherRequest(`page_size=${pageSize}`))
                }}
            >
                <RxCross1 />
            </Button>
            <div className={styles.tableContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className={styles.topSchools_text}>Teachers</p>
                    <Button variant='contained' size='large' onClick={() => convertToCSV(arrayObjectFlat(data))}>Download</Button>
                </div>
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
                    <TeacherList data={data} />
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

export default SchoolAllTeachers
