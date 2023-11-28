import React, { useEffect } from 'react';
import SchoolStudentsByGender from '@/Component/school/RightNavContent/students/SchoolStudentsByGender';
import { useRouter } from 'next/router';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const StudentByGender = () => {
    const router = useRouter()
    const { Class } = router.query

    useEffect(() => {
        dispatch(setHeader("Students"))
    }, [])

    return (
        <SchoolStudentsByGender Class={Class} />
    );
};
export default StudentByGender;