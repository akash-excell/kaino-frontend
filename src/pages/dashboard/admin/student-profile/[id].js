import React, { useEffect } from 'react';
import StudentProfileContent from '@/Component/admin/RightNavContent/students/StudentProfileContent';
import { useRouter } from 'next/router';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import { dispatch } from '@/redux/store';

const StudentProfile = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        dispatch(setHeader('Student Profile'))
    }, [])

    return (
        <StudentProfileContent id={id} />
    );
};
export default StudentProfile;