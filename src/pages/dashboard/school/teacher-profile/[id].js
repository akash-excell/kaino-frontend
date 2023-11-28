import React, { useEffect } from 'react';
import TeacherProfileContent from '@/Component/admin/RightNavContent/teachers/TeacherProfileContent';
import { useRouter } from 'next/router';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const TeacherProfile = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        dispatch(setHeader("Teacher Profile"))
    }, [])

    return (
        <TeacherProfileContent id={id} />
    );
};
export default TeacherProfile;