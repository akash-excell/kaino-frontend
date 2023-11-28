import { getAllParentsRequest, getAllParentsReset } from '@/redux/slices/admin/getAllParents'
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

function ParentProfileContent({ id }) {
    const [data, setData] = useState({})

    const router = useRouter()

    const getAllParentsState = useSelector(state => state.getAllParents)

    useEffect(() => {
        if (id) {
            dispatch(getAllParentsRequest(`${id}/`))
        }
    }, [id])

    useEffect(() => {
        if (getAllParentsState.isSuccess) {
            setData(getAllParentsState.data?.data?.results[0])
            dispatch(getAllParentsReset())
        }
    }, [getAllParentsState.isSuccess])

    useEffect(() => {
        if (getAllParentsState.isError) {
            router.push('/dashboard/admin')
            dispatch(getAllParentsReset())
        }
    }, [getAllParentsState.isError])

    return (
        <div>
            <div className={styles_new.breadcrumbs}>
                <p className={styles_new.breadcrumbs_left}>Parent Details</p>
                <p className={styles_new.breadcrumbs_right}>Parent /<span> Parent Details</span></p>
            </div>
            <div className={styles.card}>
                <div className={styles.card_inner}>
                    <img src={data.user?.profile_img || flagLink.ghana} alt="image" height="120px" width="150px" />
                    <div>
                        <p style={{ fontWeight: '700', fontSize: '1.4rem' }}>{data.user?.first_name} {data.user?.last_name}</p>
                        <p style={{ marginTop: "4px", opacity: '0.4', fontWeight: '500' }}>St. Patrick Kindergaten</p>
                        <div className={styles.card_right}>
                            <div>
                                <p style={{ fontWeight: '500', opacity: '0.5' }}>Children</p>
                                <p className={styles.details}>3</p>
                            </div>
                            <div>
                                <p style={{ fontWeight: '500', opacity: '0.5' }}>ID Number</p>
                                <p className={styles.details}>CMHJK43NMQ32</p>
                            </div>
                            <div>
                                <p style={{ fontWeight: '500', opacity: '0.5' }}>Joined in</p>
                                <p className={styles.details}>2021</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <p style={{ fontWeight: '600', fontSize: '1.2rem' }}>Parents Details:</p>
                    <div className={styles.bottomGrid}>
                        <div>
                            <p className={styles.parent_details_title}><GiGraduateCap /> Occupation</p>
                            <p className={styles.parent_details}>{data?.occupation}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><BsGenderAmbiguous /> Gender</p>
                            <p className={styles.parent_details}>{data?.user?.gender == 1 ? 'Male' : 'Female'}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><BsCalendarDate /> Date Of Joining</p>
                            <p className={styles.parent_details}>Not available</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><BsTelephone /> Telephone</p>
                            <p className={styles.parent_details}>{data?.user?.mobile_no}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><BsCalendarDate /> Date Of Birth</p>
                            <p className={styles.parent_details}>{data?.user?.dob}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><CiLocationOn /> Address</p>
                            <p className={styles.parent_details}>{data?.address}</p>
                        </div>
                        <div>
                            <p className={styles.parent_details_title}><AiOutlineMail /> Email</p>
                            <p className={styles.parent_details}>{data?.user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParentProfileContent