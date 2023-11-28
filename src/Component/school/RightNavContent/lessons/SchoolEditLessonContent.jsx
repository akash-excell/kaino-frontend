import React, { useEffect, useState } from 'react'
import styles from '@/styles/adminLessions.module.css'
import { TextField, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material'
import { countries } from '@/utils/constant'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { dispatch } from '@/redux/store'
import { useRouter } from 'next/router'
import Axios from '@/utils/axios'
import { getSingleLessonRequest, getSingleLessonReset } from '@/redux/slices/admin/getSingleLesson'
import { editSingleLessonsRequest, editSingleLessonsReset } from '@/redux/slices/admin/editSingleLessons'

function SchoolEditLessonContent({ id }) {
    const [errorMessages, setErrorMessages] = useState({})
    const [termSystem, setTermSystem] = useState([])
    const editSingleLessonsState = useSelector(state => state.editSingleLessons)
    const getSingleLessonState = useSelector(state => state.getSingleLesson)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            name: '',
            subject_id: '',
            country: '',
            learning_area: '',
            class_name: '',
            term: '',
            week: ''
        },
        onSubmit: (values) => {
            setErrorMessages({})
            const payload = { ...values, _class: values.class_name }
            dispatch(editSingleLessonsRequest(payload))
        }
    })

    useEffect(() => {
        if (id)
            dispatch(getSingleLessonRequest(id))
        return () => {
            dispatch(getSingleLessonReset())
        }

    }, [id])

    const getTermSytem = async () => {
        try {
            const data = await Axios.get('api/get_term/')
            if (data.data?.data) {
                setTermSystem(data.data?.data)
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getTermSytem()
    }, [])

    useEffect(() => {
        if (editSingleLessonsState.isError && editSingleLessonsState.data?.message) {
            setErrorMessages(editSingleLessonsState.data?.message)
            dispatch(editSingleLessonsReset())
        }
    }, [editSingleLessonsState.isError])

    useEffect(() => {
        if (editSingleLessonsState.isSuccess) {
            dispatch(editSingleLessonsReset())
            formik.resetForm()
            router.push('/dashboard/school/manage-lessons')
        }
    }, [editSingleLessonsState.isSuccess])

    useEffect(() => {
        if (getSingleLessonState.isSuccess) {
            const newValues = getSingleLessonState.data?.data?.results[0]
            formik.setValues(newValues);
        }
    }, [getSingleLessonState.isSuccess])

    return (
        <div>
            <div className={styles.breadcrumbs}>
                <p className={styles.breadcrumbs_left}>Edit Lessons</p>
                <p className={styles.breadcrumbs_right}>Subject /<span>Edit Lesson</span></p>
            </div>
            <div className={styles.editFormContainer} style={{ minHeight: "250px" }}>
                <p className={styles.breadcrumbs_left}>Subject Information</p>

                <form onSubmit={formik.handleSubmit} style={{ marginTop: "2rem" }}>
                    <div className={styles.formGrid}>
                        <div>
                            <TextField
                                sx={{ width: '100%' }}
                                focused
                                required
                                size='small'
                                id="outlined-adornment-subject_id"
                                label="Subject Id"
                                variant="outlined"
                                name='subject_id'
                                onChange={formik.handleChange}
                                value={formik.values.subject_id}
                            />
                            {errorMessages?.subject_id && <p classsubject_id='formErrorText'>{errorMessages?.subject_id[0]}</p>}
                        </div>

                        <div>
                            <TextField
                                sx={{ width: '100%' }}
                                focused
                                required
                                size='small'
                                id="outlined-adornment-name"
                                label="Name"
                                variant="outlined"
                                name='name'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            {errorMessages?.name && <p classname='formErrorText'>{errorMessages?.name[0]}</p>}
                        </div>

                        <FormControl size='small' focused required>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                id="country-select"
                                label="Country"
                                name='country'
                                value={formik.values.country}
                                onChange={formik.handleChange}
                            >
                                {countries.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
                            </Select>
                            {errorMessages?.country && <p className='formErrorText'>{errorMessages?.country[0]}</p>}
                        </FormControl>

                        <FormControl size='small' focused required>
                            <InputLabel id="demo-simple-select-label">Learning Area</InputLabel>
                            <Select
                                id="learning_area-select"
                                label="Learning Area"
                                name='learning_area'
                                value={formik.values.learning_area}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={'LA1'}>LA1</MenuItem>
                                <MenuItem value={'LA2'}>LA2</MenuItem>
                                <MenuItem value={'LA3'}>LA3</MenuItem>
                                <MenuItem value={'LA4'}>LA4</MenuItem>
                                <MenuItem value={'LA5'}>LA5</MenuItem>
                            </Select>
                            {errorMessages?.learning_area && <p className='formErrorText'>{errorMessages?.learning_area[0]}</p>}
                        </FormControl>

                        <FormControl size='small' focused required>
                            <InputLabel id="demo-simple-select-label">Class</InputLabel>
                            <Select
                                id="class-select"
                                label="Class"
                                name='class_name'
                                value={formik.values.class_name}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={'K1'}>K1</MenuItem>
                                <MenuItem value={'K2'}>K2</MenuItem>
                                <MenuItem value={'K3'}>K3</MenuItem>
                            </Select>
                            {errorMessages?.class_name && <p className='formErrorText'>{errorMessages?.class_name[0]}</p>}
                        </FormControl>

                        <FormControl size='small' focused required>
                            <InputLabel id="demo-simple-select-label">Term</InputLabel>
                            <Select
                                id="term-select"
                                label="Term"
                                name='term'
                                value={formik.values.term}
                                onChange={formik.handleChange}
                            >
                                {
                                    termSystem?.map((item, i) => <MenuItem key={i} value={item?.id}>{item?.term_name}</MenuItem>)
                                }
                            </Select>
                            {errorMessages?.term && <p className='formErrorText'>{errorMessages?.term[0]}</p>}
                        </FormControl>

                        <FormControl size='small' focused
                            sx={{ width: '100%' }}
                            required>
                            <InputLabel >Weeks</InputLabel>
                            <Select
                                id="academic-weeks-select"
                                label="Weeks"
                                onChange={formik.handleChange}
                                value={formik.values.week}
                                name='week'
                                required
                            >
                                {
                                    Array.from({ length: 12 }, (_, i) => i + 1).map((item, i) => {
                                        return (
                                            <MenuItem key={i} value={item}>{item} Weeks</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                            {errorMessages?.week && <p className='formErrorText'>{errorMessages?.week[0]}</p>}
                        </FormControl>
                    </div>
                    <Button
                        disabled={editSingleLessonsState.isLoading}
                        type='submit'
                        variant='contained'
                        size='large'
                        sx={{ marginTop: "1rem" }}
                    >
                        {editSingleLessonsState.isLoading ? 'Please wait...' : 'Proceed to edit'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SchoolEditLessonContent