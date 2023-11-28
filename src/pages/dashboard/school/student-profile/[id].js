import React, { useEffect } from 'react';
import StudentProfileContent from '@/Component/admin/RightNavContent/students/StudentProfileContent';
import { useRouter } from 'next/router';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const StudentProfile = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        dispatch(setHeader("Student"))
    }, [])

    return (
        <StudentProfileContent id={id} />
    );
};
export default StudentProfile;