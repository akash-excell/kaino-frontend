import React from 'react'
import styles from '@/styles/adminSchoolByCountry.module.css'
import styles_new from '@/styles/adminLessions.module.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { rollCallStudentRequest, rollCallStudentReset } from '@/redux/slices/school/rollCallStudent';
import { Box, Button, FormControl, MenuItem, Select as SelectMui, Typography } from '@mui/material';
import { Input, Select } from 'antd';
import { useFormik } from 'formik';
import { RxCross1 } from 'react-icons/rx'
import { arrayObjectFlat, convertToCSV } from '@/utils/constant';
import styles_chart from '@/styles/adminFinance.module.css';
import styles_dashboard from '@/styles/adminDashboardContent.module.css'
import styles_classes from '@/styles/classes.module.css';
import AttendenceChart from '../../chart/AttendenceChart';
import AttendancePieChart from '../../chart/AttendancePieChart';
import { getAttendanceRequest, getAttendanceReset } from '@/redux/slices/school/getAttendance';
import RollCallStudentsTable from '../../table/RollCallStudentsTable';
import { FaUserTie } from 'react-icons/fa';
import { BiBulb } from 'react-icons/bi';
import { HiLightBulb } from 'react-icons/hi';
import { getPieChartRequest, getPieChartReset } from '@/redux/slices/school/getPieChart';

const SchoolRollCallContent = () => {
    const getPieChartState = useSelector(state => state.getPieChart)
    const rollCallStudentState = useSelector(state => state.rollCallStudent)
    const getAttendanceState = useSelector(state => state.getAttendance)
    const [pageSize, setPageSize] = useState(10)
    const [response, setResponse] = useState({})
    const [data, setData] = useState([])
    const [chartData, setChartData] = useState([])
    const [pieData, setPieData] = useState({})
    const [selectedPeriod, setSelectedPeriod] = useState(2)
    const [selectPie, setSelectPie] = useState(2)

    const formik = useFormik({
        initialValues: {
            date: '',
            year: '',
            _class: ''
        },
        onSubmit: (values) => {
            if (values.date)
                dispatch(rollCallStudentRequest(`date=${values.date}`))
            else if (values._class)
                dispatch(rollCallStudentRequest(`class=${values._class}`))
            else
                dispatch(rollCallStudentRequest(`year=${values.year}`))

        },
    });

    useEffect(() => {
        dispatch(rollCallStudentRequest(`page_size=${pageSize}`))
    }, [pageSize])

    useEffect(() => {
        dispatch(getAttendanceRequest())
        dispatch(getPieChartRequest())
    }, [])

    useEffect(() => {
        if (getAttendanceState.isSuccess) {
            setChartData(getAttendanceState.data?.data)
            dispatch(getAttendanceReset())
        }
    }, [getAttendanceState.isSuccess])

    useEffect(() => {
        if (getPieChartState.isSuccess) {
            setPieData(getPieChartState.data?.data)
            dispatch(getPieChartReset())
        }
    }, [getPieChartState.isSuccess])

    useEffect(() => {
        if (rollCallStudentState.isSuccess) {
            setResponse(rollCallStudentState.data?.data)
            setData(rollCallStudentState.data?.data?.results)
            dispatch(rollCallStudentReset())
        }
    }, [rollCallStudentState.isSuccess])

    const handlePagination = (requestUrl) => {
        dispatch(rollCallStudentRequest(`${requestUrl.split('?')[1]}`))
    }

    const handleGraphChange = (values) => {
        const number = parseInt(values)
        setSelectedPeriod(number)
        if (number === 1)
            dispatch(getAttendanceRequest('month=1'))
        else if (number === 3)
            dispatch(getAttendanceRequest('day=1'))
        else
            dispatch(getAttendanceRequest())
    }

    const handlePieChange = (values) => {
        const number = parseInt(values)
        setSelectPie(number)
        if (number === 1)
            dispatch(getPieChartRequest('month'))
        else if (number === 3)
            dispatch(getPieChartRequest('day'))
        else
            dispatch(getPieChartRequest())
    }

    return (
        <div>

            <div className={styles_new.breadcrumbs}>
                <p className={styles_new.breadcrumbs_left}>Roll Call Summary</p>
                <p className={styles_new.breadcrumbs_right}>Dashboard /<span> Roll-Call</span></p>
            </div>

            <form className={styles_new.form} onSubmit={formik.handleSubmit}>
                <Input
                    type="date"
                    name="date"
                    className={styles_new.form_input}
                    placeholder="Search by Date..."
                    value={formik.values.date}
                    onChange={formik.handleChange}
                />
                <Input
                    type="number"
                    name="year"
                    className={styles_new.form_input}
                    placeholder="Search by Year..."
                    value={formik.values.year}
                    onChange={formik.handleChange}
                />
                <FormControl sx={{ background: '#fff!important' }} size='small'>
                    <SelectMui
                        id="select-class"
                        value={formik.values._class}
                        label="Search By Class ..."
                        onChange={formik.handleChange}
                        name='_class'
                    >
                        <MenuItem value={1}>K1</MenuItem>
                        <MenuItem value={2}>K2</MenuItem>
                        <MenuItem value={3}>K3</MenuItem>
                    </SelectMui>
                </FormControl>
                <Button type="submit" variant="contained" size="large">
                    Search
                </Button>
            </form>

            <Button variant="contained" size="large" sx={{ background: "red", marginTop: '1rem' }}
                onClick={() => {
                    formik.resetForm()
                    dispatch(rollCallStudentRequest(`page_size=${pageSize}`))
                }}
            >
                <RxCross1 />
            </Button>

            <Box className={styles_classes.classes_card_container} sx={{ marginTop: 3 }}>

                <div className={styles_dashboard.card} style={{ background: "#C6164F" }}>
                    <div className={styles_dashboard.icon_Container}>
                        <p style={{ fontSize: '2rem', color: "#C6164F" }}><FaUserTie /> </p>
                    </div>
                    <Box className={styles_dashboard.totalTextContainer} sx={{ gap: '4px!important' }}>
                        <p className={styles_dashboard.totalNumber}>{response?.total_students || 0}</p>
                        <p className={styles_dashboard.totalText}>Total Students</p>
                    </Box>
                </div>

                <div className={styles_dashboard.card} style={{ background: "#9E4EE0" }}>
                    <div className={styles_dashboard.icon_Container}>
                        <p style={{ fontSize: '2rem', color: "#9E4EE0" }}><HiLightBulb /> </p>
                    </div>
                    <Box className={styles_dashboard.totalTextContainer} sx={{ gap: '4px!important' }}>
                        <p className={styles_dashboard.totalNumber}>{response?.total_attendance || 0}</p>
                        <p className={styles_dashboard.totalText}>Total Attendance</p>
                    </Box>
                </div>

                <div className={styles_dashboard.card} style={{ background: "#EA8858" }}>
                    <div className={styles_dashboard.icon_Container}>
                        <p style={{ fontSize: '2rem', color: "#EA8858" }}><BiBulb /> </p>
                    </div>
                    <Box className={styles_dashboard.totalTextContainer} sx={{ gap: '4px!important' }}>
                        <p className={styles_dashboard.totalNumber}>{response?.total_absent || 0}</p>
                        <p className={styles_dashboard.totalText}>Total Absentee</p>
                    </Box>
                </div>

            </Box>

            <Box sx={{ marginTop: 4, display: 'grid', gridTemplateColumns: '65% 32%', columnGap: '1rem' }}>

                <Box sx={{ padding: '1rem', background: '#fff', borderRadius: '10px' }}>
                    <Box className={styles_chart.chartCircleContainer} sx={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', paddingBottom: 6, alignItems: 'center' }}>
                        <p style={{ fontSize: '1rem', fontWeight: '600', color: '#898F95' }}>Attendance </p>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', borderColor: '#C92358' }}><span className={styles_chart.chartCircle} /><p>Present</p></Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span className={styles_chart.chartCircle} style={{ borderColor: '#6759D1' }} /><p>Absent</p></Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span className={styles_chart.chartCircle} style={{ borderColor: '#EA8858' }} /><p>Excuse</p></Box>

                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <SelectMui
                                    id="select-period"
                                    value={selectedPeriod}
                                    label="Time"
                                    onChange={(e) => handleGraphChange(e.target.value)}
                                >
                                    <MenuItem value={1}>This Month</MenuItem>
                                    <MenuItem value={2}>This Week</MenuItem>
                                    <MenuItem value={3}>This Day</MenuItem>
                                </SelectMui>
                            </FormControl>
                        </Box>
                    </Box>
                    <AttendenceChart chartData={chartData} />
                </Box>

                <Box sx={{ padding: '1rem', background: '#fff', borderRadius: '10px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Typography variant='h5' sx={{ fontWeight: '800' }}>
                                {pieData?.most_absentees || 0}
                            </Typography>
                            <Box>
                                <Typography variant='body1' sx={{ fontWeight: '600' }}>
                                    Most Absenteeism
                                </Typography>
                                <Typography>
                                    This Month
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <SelectMui
                                    id="select-period"
                                    value={selectPie}
                                    label="Time"
                                    onChange={(e) => handlePieChange(e.target.value)}
                                >
                                    <MenuItem value={1}>This Month</MenuItem>
                                    <MenuItem value={2}>This Week</MenuItem>
                                    <MenuItem value={3}>This Day</MenuItem>
                                </SelectMui>
                            </FormControl>
                        </Box>
                    </Box>
                    <AttendancePieChart chartData={pieData?.list_data || []} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        {
                            pieData?.list_data?.map((item, i) => <Box key={indexedDB} sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <Box sx={{ borderRadius: '6px', height: '25px', width: '25px', background: i === 0 ? '#BB9138' : i === 1 ? '#4CBC9A' : '#D35DDB' }} />
                                <Typography>
                                    {item[0]}: <span style={{ fontWeight: '800' }}>{item[1]}</span>
                                </Typography>
                            </Box>)
                        }
                    </Box>
                </Box>
            </Box>

            <div className={styles.tableContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className={styles.topSchools_text}>Students</p>
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
                    <RollCallStudentsTable data={data} />
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

export default SchoolRollCallContent
