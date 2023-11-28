import { getAllStudentsRequest, getAllStudentsReset } from '@/redux/slices/admin/getAllStudents'
import { dispatch } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styles_new from '@/styles/adminLessions.module.css'
import styles from '@/styles/parentProfile.module.css'
import { flagLink } from '@/utils/constant'
import { FaRegBuilding } from 'react-icons/fa'

function StudentProfileContent({ id }) {
    const [data, setData] = useState({})

    const router = useRouter()

    const getAllStudentsState = useSelector(state => state.getAllStudents)

    useEffect(() => {
        if (id) {
            dispatch(getAllStudentsRequest(`${id}/`))
        }
    }, [id])

    useEffect(() => {
        if (getAllStudentsState.isSuccess) {
            setData(getAllStudentsState.data?.data?.results[0])
            dispatch(getAllStudentsReset())
        }
    }, [getAllStudentsState.isSuccess])

    useEffect(() => {
        if (getAllStudentsState.isError) {
            router.push('/dashboard/admin')
            dispatch(getAllStudentsReset())
        }
    }, [getAllStudentsState.isError])

    return (
        <div>
            <div className={styles_new.breadcrumbs}>
                <p className={styles_new.breadcrumbs_left}>Student Details</p>
                <p className={styles_new.breadcrumbs_right}>Student /<span> Student Details</span></p>
            </div>
            <div className={styles.card}>
                <div className={styles.card_inner}>
                    <img src={data.user?.profile_img || flagLink.ghana} alt="image" height="120px" width="150px" />
                    <div>
                        <p style={{ fontWeight: '700', fontSize: '1.4rem' }}>{data.user?.first_name} {data.user?.last_name}</p>
                        <p style={{ marginTop: "4px", opacity: '0.4', fontWeight: '500' }}>St. Patrick Kindergaten</p>
                        <div className={styles.card_right}>
                            <div>
                                <p style={{ fontWeight: '500', opacity: '0.5' }}>Class</p>
                                <p className={styles.details}>{data?._class}</p>
                            </div>
                            <div>
                                <p style={{ fontWeight: '500', opacity: '0.5' }}>ID Number</p>
                                <p className={styles.details}>{data?.id_no}</p>
                            </div>
                            <div>
                                <p style={{ fontWeight: '500', opacity: '0.5' }}>Total Lessons</p>
                                <p className={styles.details}>280</p>
                            </div>
                            <div>
                                <p style={{ fontWeight: '500', opacity: '0.5' }}>Registered in</p>
                                <p className={styles.details}>Not Available</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <p style={{ fontWeight: '600', fontSize: '1.2rem' }}>Students Details:</p>
                    <div className={styles.bottomGrid}>
                        <div>
                            <p className={styles.parent_details_title}><FaRegBuilding /> Role</p>
                            <p className={styles.parent_details}>{data?.role || 'Unknown'}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><FaRegBuilding /> Gender</p>
                            <p className={styles.parent_details}>{data?.user?.gender == 1 ? 'Male' : 'Female'}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><FaRegBuilding /> Date Of Birth</p>
                            <p className={styles.parent_details}>{data?.user?.dob || 'Not Available'}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><FaRegBuilding /> Future Aspiration</p>
                            <p className={styles.parent_details}>Engineer</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><FaRegBuilding />Address</p>
                            <p className={styles.parent_details}>{data?.address}</p>
                        </div>

                        <div>
                            <p className={styles.parent_details_title}><FaRegBuilding /> Parent's / Guardian's Name</p>
                            <p className={styles.parent_details}>{data?.parent}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><FaRegBuilding /> Telephone</p>
                            <p className={styles.parent_details}>{data?.user?.mobile_no}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><FaRegBuilding /> Email</p>
                            <p className={styles.parent_details}>{data?.user?.email}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><FaRegBuilding /> Occupation</p>
                            <p className={styles.parent_details}>Unknown</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentProfileContent