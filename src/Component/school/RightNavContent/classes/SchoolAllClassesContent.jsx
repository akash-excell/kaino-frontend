import React, { useEffect, useState } from 'react'
import styles from '@/styles/classes.module.css'
import ClassesCard from '@/Component/Generic/ClassesCard'
import { dispatch } from '@/redux/store'
import { getClassTeacherRequest, getClassTeacherReset } from '@/redux/slices/school/getClassTeacher'
import { useSelector } from 'react-redux'

const SchoolAllClassesContent = () => {
    const { data: { data } } = useSelector(state => state.getClassTeacher)

    useEffect(() => {
        dispatch(getClassTeacherRequest())
        return () => {
            dispatch(getClassTeacherReset())
        }
    }, [])

    return (
        <div className={styles.classes_card_container}>
            {
                data?.map((item, i) => <ClassesCard key={i} item={item} />)
            }
        </div>
    )
}

export default SchoolAllClassesContent
