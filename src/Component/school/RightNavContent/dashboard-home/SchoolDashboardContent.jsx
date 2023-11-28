import React, { useState } from 'react'
import styles from '@/styles/adminDashboardContent.module.css'
import CounterCard from '../../../Generic/CounterCard'
import { BsBook, BsTerminal, BsWallet2 } from 'react-icons/bs'
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IoIosPeople } from 'react-icons/io'
import { BiBookOpen } from 'react-icons/bi'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { GiCircleCage } from 'react-icons/gi'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { getSchoolDashboardRequest, getSchoolDashboardReset } from '@/redux/slices/school/getSchoolDashboard';

const FaRegBuildingIcon = <BsBook size={'2.6rem'} color='#9E4EE0' />
const BsTerminalIcon = <BsTerminal size={'2.6rem'} color='#EA8858' />
const AiOutlineUserAddIcon = <AiOutlineUserAdd size={'2.6rem'} color='#C6164F' />
const IoIosPeopleIcon = <IoIosPeople size={'2.6rem'} color='#4EAF96' />


function SchoolDashboardContent() {
    const getSchoolDashboardState = useSelector(state => state.getSchoolDashboard)
    const [countData, setCountData] = useState({})

    useEffect(() => {
        dispatch(getSchoolDashboardRequest())
    }, [])

    useEffect(() => {
        if (getSchoolDashboardState.isSuccess) {
            setCountData(getSchoolDashboardState.data?.data)
            dispatch(getSchoolDashboardReset())
        }
    }, [getSchoolDashboardState.isSuccess])

    const getWidth = (data) => {
        const width = Math.ceil((data?.covered / data?.Total) * 100)
        const remainingWidth = 100 - width
        return {
            width: width,
            remainingWidth: remainingWidth
        }
    }

    return (
        <div>
            <div className={styles.card_container}>
                <div className={styles.card_innerContainer}>
                    <Link href={'/dashboard/school/all-classes'} className={styles.card} style={{ background: '#9E4EE0' }}>
                        <div className={styles.icon_Container}>
                            {FaRegBuildingIcon}
                        </div>
                        <Box className={styles.totalTextContainer} sx={{ width: "70%" }}>
                            <p className={styles.totalText}>Classes</p>
                            <Box sx={{ height: '25px', background: '#4D4D4D', borderRadius: '12px', display: 'flex', alignItems: "center" }}>
                                <Typography variant='body1'
                                    sx={{
                                        height: '25px',
                                        borderRadius: '12px',
                                        width: '50%',
                                        textAlign: 'center',
                                        background: '#fff',
                                        color: '#943266',
                                        fontWeight: '800'
                                    }}
                                >
                                    30
                                </Typography>

                                <Typography variant='body1'
                                    sx={{
                                        height: '25px',
                                        width: '50%',
                                        textAlign: 'center',
                                        color: '#fff',
                                        fontWeight: '800'
                                    }}
                                >
                                    100
                                </Typography>
                            </Box>
                        </Box>
                    </Link>

                    <Link href={'/dashboard/school/all-coverage'} className={styles.card} style={{ background: '#2896A0', padding: '1.2rem' }}>
                        <div className={styles.icon_Container}>
                            <GiCircleCage size={'2.6rem'} color='#4D4D4D' />
                        </div>
                        <Box className={styles.totalTextContainer} sx={{ width: "70%" }}>
                            <p className={styles.totalText}>Coverage</p>
                            <Box sx={{ height: '25px', background: '#4D4D4D', borderRadius: '12px', display: 'flex', alignItems: "center", overflow: 'hidden' }}>
                                <Typography variant='body1'
                                    sx={{
                                        height: '25px',
                                        borderRadius: '12px',
                                        width: `${getWidth(countData?.coverage).width || 20}%`,
                                        textAlign: 'center',
                                        background: '#fff',
                                        color: '#943266',
                                        fontWeight: '800'
                                    }}
                                >
                                    {countData?.coverage?.covered}
                                </Typography>

                                <Typography variant='body1'
                                    sx={{
                                        height: '25px',
                                        width: `${getWidth(countData?.coverage).remainingWidth || 80}%`,
                                        textAlign: 'center',
                                        color: '#fff',
                                        fontWeight: '800'
                                    }}
                                >
                                    {countData?.coverage?.Total}
                                </Typography>
                            </Box>
                            <Typography sx={{ color: '#fff' }}>
                                Status: Normal
                            </Typography>
                        </Box>
                    </Link>
                    <Link href={'/#'} className={styles.card_left} style={{ background: '#6759D1' }}>
                        <div style={{ zIndex: 3 }}>
                            <p>Roll Call Summary</p>
                            <p className={styles.cardLeft_textSize} style={{ fontSize: "2rem", fontWeight: '800' }}>{countData?.summery_percentage || 0}/{100}</p>
                        </div>
                        <div style={{ zIndex: 3 }}>
                            <p>Students Present</p>
                            <p className={styles.cardLeft_textSize} style={{ fontSize: "2rem", fontWeight: '800' }}>{countData?.present || 0}</p>
                        </div>
                        <div style={{ zIndex: 3 }}>
                            <p>Students Absent</p>
                            <p className={styles.cardLeft_textSize} style={{ fontSize: "2rem", fontWeight: '800' }}>{countData?.absent || 0}</p>
                        </div>
                        <div className={styles.circleDiv}>
                        </div>
                    </Link>

                </div>
                <div className={styles.card_innerContainer}>
                    <CounterCard
                        to='/dashboard/school/all-teachers'
                        color={'#EA8858'}
                        icon={BsTerminalIcon}
                        totalText={'Teachers'}
                        totalNo={countData?.total_teachers || 0}
                    />
                    <CounterCard
                        to='/dashboard/school/parents-card'
                        color={'#4EAF96'}
                        icon={IoIosPeopleIcon}
                        totalText={'Parents'}
                        totalNo={countData?.total_parents || 0}
                    />
                    <Box sx={{ minHeight: '300px', marginTop: '1rem', display: 'flex', flexDirection: "column", justifyContent: 'space-between' }}>
                        <CounterCard
                            to='/dashboard/school/students-card'
                            color={'#C6164F'}
                            icon={AiOutlineUserAddIcon}
                            totalText={'Students'}
                            totalNo={countData?.total_students || 0}
                        />

                        <Link href={'#'} className={styles.card} style={{ background: '#07B007' }}>
                            <div className={styles.icon_Container}>
                                <BsWallet2 size={'2.6rem'} color='#07B007' />
                            </div>
                            <Box className={styles.totalTextContainer} sx={{ width: "70%" }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: "wrap" }}>
                                    <Typography className={styles.totalText}>Subscription</Typography>
                                    <Box sx=
                                        {{
                                            background: "#FFFFFF",
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: "center",
                                            padding: '4px 18px'
                                        }}>
                                        <Typography sx={{ color: '#F4C4AC' }}>{countData?.subscription}</Typography>
                                    </Box>
                                </Box>
                                <Typography sx={{ color: "#fff", fontSize: '1.4rem', fontWeight: '800' }}>{countData?.status}</Typography>
                                <Typography sx={{ color: "#fff" }}>Due Date: {countData?.due_date}</Typography>
                            </Box>
                        </Link>

                    </Box>
                </div>
                <div className={styles.right_flnCard}>
                    <p className={styles.flnText}>FLN IMPACT</p>
                    <div className={styles.fln_Icon}>
                        <BiBookOpen color='#3D5EE1' size={'3rem'} />
                        <p className={styles.fln_Icon_Number}>{countData?.fln_over_all}</p>
                    </div>
                    <p className={styles.performance_text}>Overall Performance Foundational
                        Learning and Numeracy Impact</p>
                    <table style={{ margin: 'auto', marginTop: "1rem", color: '#cccaca', borderSpacing: '0 0.8rem', textAlign: 'left', padding: "0 1rem" }}>
                        <tbody>
                            <tr style={{ color: '#a24b79' }}>
                                <th>Accessment Area</th>
                                <th>Numbers</th>
                            </tr>
                            {
                                countData?.fln_impact?.map((item, i) => <tr >
                                    <td style={{ fontWeight: '500' }}>{item?.accessment_area}:</td>
                                    <td style={{ fontWeight: '500', textAlign: 'center' }}>{item?.numbers}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div >
            <div className={styles.copyright}>
                <p>COPYRIGHT &copy; 2023 KAINO.</p>
            </div>
        </div >
    )
}

export default SchoolDashboardContent
