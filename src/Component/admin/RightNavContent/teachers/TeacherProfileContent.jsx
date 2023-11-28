import { getAllTeachersRequest, getAllTeachersReset } from '@/redux/slices/admin/getAllTeachers'
import { dispatch } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styles_new from '@/styles/adminLessions.module.css'
import styles from '@/styles/parentProfile.module.css'
import { flagLink } from '@/utils/constant'
import { GiGraduateCap } from 'react-icons/gi'
import { BsCalendarDate, BsGenderAmbiguous, BsTelephone } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { AiOutlineMail } from 'react-icons/ai'

function TeacherProfileContent({ id }) {
    const [data, setData] = useState({})

    const router = useRouter()

    const getAllTeachersState = useSelector(state => state.getAllTeachers)

    useEffect(() => {
        if (id) {
            dispatch(getAllTeachersRequest(`${id}/`))
        }
    }, [id])

    useEffect(() => {
        if (getAllTeachersState.isSuccess) {
            setData(getAllTeachersState.data?.data?.results[0])
            dispatch(getAllTeachersReset())
        }
    }, [getAllTeachersState.isSuccess])

    useEffect(() => {
        if (getAllTeachersState.isError) {
            router.push('/dashboard/admin')
            dispatch(getAllTeachersReset())
        }
    }, [getAllTeachersState.isError])

    return (
        <div>
            <div className={styles_new.breadcrumbs}>
                <p className={styles_new.breadcrumbs_left}>Teacher Details</p>
                <p className={styles_new.breadcrumbs_right}>Teacher /<span> Teacher Details</span></p>
            </div>
            <div className={styles.card}>
                <div className={styles.card_inner}>
                    <img src={data.user?.profile_img || flagLink.ghana} alt="image" height="120px" width="150px" />
                    <div>
                        <p style={{ fontWeight: '700', fontSize: '1.4rem' }}>{data.user?.first_name} {data.user?.last_name}</p>
                        <p style={{ marginTop: "4px", opacity: '0.4', fontWeight: '500' }}>St. Patrick Kindergaten</p>
                        <div className={styles.card_right}>
                            <div>
                                <p style={{ fontWeight: '500', opacity: '0.5' }}>Main Class</p>
                                <p className={styles.details}>{data?.main_class}</p>
                            </div>
                            <div>
                                <p style={{ fontWeight: '500', opacity: '0.5' }}>ID Number</p>
                                <p className={styles.details}>{data?.teacher_id}</p>
                            </div>
                            <div>
                                <p style={{ fontWeight: '500', opacity: '0.5' }}>Total Lessons</p>
                                <p className={styles.details}>285</p>
                            </div>
                            <div>
                                <p style={{ fontWeight: '500', opacity: '0.5' }}>Joined in</p>
                                <p className={styles.details}>{new Date(data?.joining_date).getFullYear()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <p style={{ fontWeight: '600', fontSize: '1.2rem' }}>Teachers Details:</p>
                    <div className={styles.bottomGrid}>
                        <div>
                            <p className={styles.parent_details_title}><GiGraduateCap /> Role</p>
                            <p className={styles.parent_details}>{data?.role || 'Class Teacher'}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><BsGenderAmbiguous /> Gender</p>
                            <p className={styles.parent_details}>{data?.user?.gender == 1 ? 'Male' : 'Female'}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><BsCalendarDate /> Date Of Joining</p>
                            <p className={styles.parent_details}>{data?.joining_date}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><GiGraduateCap />Qualification</p>
                            <p className={styles.parent_details}>{data?.qualification || 'Unknown'}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><BsTelephone /> Telephone</p>
                            <p className={styles.parent_details}>{data?.user?.mobile_no}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><BsCalendarDate /> Date Of Birth</p>
                            <p className={styles.parent_details}>{data?.user?.dob || 'Unknown'}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><CiLocationOn /> Address</p>
                            <p className={styles.parent_details}>{data?.address}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><AiOutlineMail /> Email</p>
                            <p className={styles.parent_details}>{data?.user?.email}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><BsCalendarDate />Year of Experiance</p>
                            <p className={styles.parent_details}>{data?.year_of_experience}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherProfileContent