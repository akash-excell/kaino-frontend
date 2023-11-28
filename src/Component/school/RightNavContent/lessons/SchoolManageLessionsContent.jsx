import React, { useEffect, useState } from 'react'
import styles from '@/styles/adminLessions.module.css'
import { Input, Select } from 'antd'
import { Button } from '@mui/material'
import { useFormik } from 'formik';
import SelectTableSort from '../../../admin/Table/SelectTableSort';
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { getLessonsRequest, getLessonsReset } from '@/redux/slices/admin/getLessons';
import { RxCross1 } from 'react-icons/rx'

function SchoolManageLessionsContent() {
    const router = useRouter()
    const getLessonsState = useSelector(state => state.getLessons)
    const [pageSize, setPageSize] = useState(10)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Subject Id',
            dataIndex: 'subject_id',
            sorter: (a, b) => a.subject_id.localeCompare(b.subject_id),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Class',
            dataIndex: 'class_name',
            sorter: (a, b) => a.class_name - b.class_name,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Learning Area',
            dataIndex: 'learning_area',
            sorter: (a, b) => a.learning_area.localeCompare(b.learning_area),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Action',
            render: ({ id }) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className={styles.actionBtn} onClick={() => router.push(`/dashboard/school/edit-lesson?id=${id}`)}><AiOutlineEdit /></button>
                    <button disabled className={styles.actionBtn} style={{ color: 'red' }}><AiOutlineEye /></button>
                </div>
            )
        },
    ];

    const [data, setData] = useState([])
    const [response, setResponse] = useState({})

    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            class: ''
        },
        onSubmit: (values) => {
            if (values.id)
                dispatch(getLessonsRequest(`${values.id}/`))
            else {
                let payload;
                if (values.class && values.name)
                    payload = `?class=${values.class}&name=${values.name}&page_size=${pageSize}`
                else if (values.class)
                    payload = `?class=${values.class}&page_size=${pageSize}`
                else if (values.name)
                    payload = `?name=${values.name} &page_size=${pageSize}`
                dispatch(getLessonsRequest(payload))
            }
        },
    });

    useEffect(() => {
        dispatch(getLessonsRequest(`?page_size=${pageSize}`))
    }, [pageSize])

    useEffect(() => {
        if (getLessonsState.isSuccess) {
            setResponse(getLessonsState.data?.data)
            setData(getLessonsState.data?.data?.results)
            dispatch(getLessonsReset())
        }
    }, [getLessonsState.isSuccess])

    const handlePagination = (requestUrl) => {
        dispatch(getLessonsRequest(`?${requestUrl.split('?')[1]}`))
    }

    return (
        <div>
            <div className={styles.breadcrumbs}>
                <p className={styles.breadcrumbs_left}>Lessons</p>
                <p className={styles.breadcrumbs_right}>Dashboard /<span> Lessons</span></p>
            </div>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <Input
                    type="text"
                    name="id"
                    className={styles.form_input}
                    placeholder="Search by ID..."
                    value={formik.values.id}
                    onChange={formik.handleChange}
                />
                <Input
                    type="text"
                    name="name"
                    className={styles.form_input}
                    disabled={formik.values.id}
                    placeholder="Search by Name..."
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <Input
                    type="text"
                    name="class"
                    disabled={formik.values.id}
                    className={styles.form_input}
                    placeholder="Search by Class..."
                    value={formik.values.class}
                    onChange={formik.handleChange}
                />
                <Button type="submit" variant="contained" size="large" disabled={!formik.dirty}>
                    Search
                </Button>
            </form>
            <Button variant="contained" size="large" disabled={!formik.dirty} sx={{ background: "red", marginTop: '1rem' }}
                onClick={() => {
                    formik.resetForm()
                    dispatch(getLessonsRequest())
                }}
            >
                <RxCross1 />
            </Button>
            <div className={styles.tableContainer}>
                <div className={styles.header}>
                    <p className={styles.breadcrumbs_left}>Lessons</p>
                    <Button variant="contained" size="large" onClick={() => router.push('/dashboard/school/add-lesson')}>
                        Create
                    </Button>
                </div>
                <div className={styles.pagination}>
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
                <div style={{ marginTop: '1rem' }}>
                    <SelectTableSort data={data} columns={columns} />
                </div>
                <div className={styles.bottom_Pagination}>
                    <p>Showing {response ? 1 : 0} to {response?.count || 0} of {response?.count || 0} entries</p>
                    <div>
                        <Button disabled={!response.previous} variant="outlined" onClick={() => handlePagination(response.previous)} size="medium">Previous</Button>
                        <Button variant="contained" size="medium">1</Button>
                        <Button disabled={!response.next} variant="outlined" onClick={() => handlePagination(response.next)} size="medium">Next</Button>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>COPYRIGHT &copy; 2023 KAINO.</p>
            </div>
        </div>
    )
}

export default SchoolManageLessionsContent